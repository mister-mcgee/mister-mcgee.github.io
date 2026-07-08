/**
 * HTMLCSSExercise.tsx
 *
 * Requires (in addition to what JavaScriptExercise.tsx already uses):
 *   npm install html2canvas pixelmatch
 *   npm install -D @types/pixelmatch
 *   npm install @codemirror/lang-html @codemirror/lang-css   (if not already installed)
 *
 * How grading works:
 *   1. The student's (html, css) and the target (html, css) are each rendered into a
 *      hidden, fixed-size, same-origin, script-disabled iframe.
 *   2. Each iframe is rasterized to a canvas with html2canvas.
 *   3. Score is a CONTENT-AWARE pixel match: pixels that are plain background
 *      (white) in BOTH renders are ignored, and the score is the % agreement over
 *      the remaining "content" pixels only. This matters because a naive
 *      whole-canvas percentage is dominated by shared blank margins — e.g. a small
 *      80x30 badge on a 400x150 canvas can look 95%+ "matching" against something
 *      totally different just because most of the canvas is white in both. A
 *      separate antialiasing-aware pixelmatch diff is still used to generate the
 *      visual diff overlay image.
 *   4. score >= passingScore passes.
 *
 * UX: a live preview panel renders the target once and re-renders the student's
 * code on a short debounce as they type, so both are visible side-by-side while
 * editing — "Run Comparison" is only needed to get a graded score + diff overlay.
 *
 * Caveats:
 *   - External images must be served with CORS headers or embedded as data URLs,
 *     otherwise the canvas will be "tainted" and unreadable.
 *   - <script> tags in student/target code do NOT run (iframe sandbox has no
 *     allow-scripts) — this is a CSS/HTML layout test, not a JS test.
 *   - Fonts: if your target design depends on a webfont, make sure it's loaded
 *     globally (e.g. in the site's <head>) so both iframes render it consistently.
 */

import { useEffect, useRef, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { html as htmlLang } from "@codemirror/lang-html"
import { css as cssLang } from "@codemirror/lang-css"
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google"
import { Check, Lock, Code2, Palette } from "lucide-react"
import html2canvas from "html2canvas"
import pixelmatch from "pixelmatch"


type Editable = "html" | "css" | "both"

type RunStatus = "idle" | "running" | "done" | "error"

type CompareResult = {
  score: number
  studentImage: string
  diffImage: string
}

const Submission = {
  PENDING: "pending",
  COMPLETE: "complete",
  INCOMPLETE: "incomplete",
} as const

type Submission = typeof Submission[keyof typeof Submission]

type HTMLCSSExerciseProps = {
  title: string
  instructions: string
  /** Starter HTML the student edits (or the fixed HTML, if editable="css"). */
  starterHtml?: string
  /** Starter CSS the student edits (or the fixed CSS, if editable="html"). */
  starterCss?: string
  /** HTML used for the target render. Defaults to starterHtml. */
  targetHtml?: string
  /** CSS used for the target render — the "answer". */
  targetCss: string
  /** Which editor(s) the student can type in. Default "both". */
  editable?: Editable
  /** Render viewport in CSS pixels. Default 800x500. Keep this close to the
   *  actual size of the content you're testing — a much larger canvas than the
   *  content dilutes even the content-aware score less, but still helps to keep
   *  it tight. */
  width?: number
  height?: number
  /** Minimum % match required to pass. Default 95. */
  passingScore?: number
  /** Pixel block size used when scoring (averages color over each block
   *  before comparing). Larger values are more forgiving of sub-pixel jitter
   *  and soft effects like box-shadow/blur, but less sensitive to small
   *  misalignment. Default 6. */
  comparisonBlockSize?: number
  /** How close to pure white (0-255 per channel) counts as "background" and
   *  gets excluded from scoring when it's background in both renders.
   *  Default 10. */
  backgroundTolerance?: number
  /** Max RGB distance between two blocks before they're scored as a
   *  mismatch. Raise this if visually-identical renders (e.g. with heavy
   *  blur/shadow) are still scoring lower than expected. Default 40. */
  colorTolerance?: number
  groupId?: string
  taskId?: string
  doSubmit?: boolean
  googleClientId?: string
  submitUrl?: string
}


function buildDocument(html: string, css: string) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; overflow: hidden; }
  ${css}
</style>
</head>
<body>
${html}
</body>
</html>`
}


// html2canvas is not reliably safe to invoke concurrently — it clones the
// source element into its own internal proxy iframe and relies on shared
// browser-global machinery (fonts, image decoding, its render cache). This
// component can trigger renders from several places at once (the live
// target/student preview panel, plus an explicit "Run Comparison" click), so
// every render is funneled through this lock to guarantee only one
// html2canvas call is ever in flight at a time, across all instances of this
// component on the page.
let renderChain: Promise<unknown> = Promise.resolve()

function withRenderLock<T>(task: () => Promise<T>): Promise<T> {
  const run = renderChain.then(task, task)
  renderChain = run.then(() => undefined, () => undefined)
  return run
}


async function renderToCanvas(
  html: string,
  css: string,
  width: number,
  height: number
): Promise<HTMLCanvasElement> {
  return withRenderLock(() => renderToCanvasInner(html, css, width, height))
}


async function renderToCanvasInner(
  html: string,
  css: string,
  width: number,
  height: number
): Promise<HTMLCanvasElement> {
  const iframe = document.createElement("iframe")

  iframe.sandbox.add("allow-same-origin")
  iframe.style.position = "fixed"
  iframe.style.left = "-99999px"
  iframe.style.top = "0"
  iframe.style.width = `${width}px`
  iframe.style.height = `${height}px`
  iframe.style.border = "none"

  document.body.appendChild(iframe)

  try {
    await new Promise<void>((resolve, reject) => {
      iframe.onload = () => resolve()
      iframe.onerror = () => reject(new Error("Failed to load preview frame."))
      iframe.srcdoc = buildDocument(html, css)
    })

    const doc = iframe.contentDocument

    if (!doc || !doc.body) {
      throw new Error("Could not access the preview document.")
    }

    return await html2canvas(doc.body, {
      width,
      height,
      windowWidth: width,
      windowHeight: height,
      backgroundColor: "#ffffff",
      scale: 1,
      useCORS: true,
      logging: false,
    })

  } finally {
    document.body.removeChild(iframe)
  }
}


function getImageData(canvas: HTMLCanvasElement, width: number, height: number): Uint8ClampedArray {
  const ctx = canvas.getContext("2d")

  if (!ctx) {
    throw new Error("Could not read the rendered canvas.")
  }

  try {
    return ctx.getImageData(0, 0, width, height).data
  } catch {
    throw new Error(
      "Could not read pixel data — this usually happens when the page includes " +
      "images from another website. Use local or data-URL images instead."
    )
  }
}


function averageBlockColor(
  data: Uint8ClampedArray,
  width: number,
  x0: number,
  y0: number,
  blockWidth: number,
  blockHeight: number
): [number, number, number] {
  let r = 0
  let g = 0
  let b = 0
  let count = 0

  for (let y = y0; y < y0 + blockHeight; y++) {
    for (let x = x0; x < x0 + blockWidth; x++) {
      const i = (y * width + x) * 4
      r += data[i]
      g += data[i + 1]
      b += data[i + 2]
      count++
    }
  }

  return [r / count, g / count, b / count]
}


function isBackgroundColor(r: number, g: number, b: number, tol: number): boolean {
  return 255 - r <= tol && 255 - g <= tol && 255 - b <= tol
}


async function compare(
  studentHtml: string,
  studentCss: string,
  targetHtml: string,
  targetCss: string,
  width: number,
  height: number,
  blockSize: number,
  backgroundTolerance: number,
  colorTolerance: number
): Promise<CompareResult> {
  // Rendered sequentially, not with Promise.all: html2canvas clones the source
  // element into its own internal proxy iframe and does its work through
  // shared browser-global machinery (fonts, image decoding, its render cache).
  // Running two overlapping html2canvas calls at once is not reliably safe —
  // it can produce a mistimed or corrupted capture for one side, which shows
  // up as a wrong score even when the underlying CSS is correct.
  const targetCanvas = await renderToCanvas(targetHtml, targetCss, width, height)
  const studentCanvas = await renderToCanvas(studentHtml, studentCss, width, height)

  const targetData = getImageData(targetCanvas, width, height)
  const studentData = getImageData(studentCanvas, width, height)

  // Visual diff overlay (full-canvas, antialiasing-aware) — for display only.
  const diff = new Uint8ClampedArray(width * height * 4)
  pixelmatch(targetData, studentData, diff, width, height, {
    threshold: 0.1,
    includeAA: false,
  })

  const diffCanvas = document.createElement("canvas")
  diffCanvas.width = width
  diffCanvas.height = height
  diffCanvas.getContext("2d")!.putImageData(new ImageData(diff, width, height), 0, 0)

  // Content-aware, block-averaged score. Two things this deliberately avoids:
  //
  // 1. Diluting the score with shared blank margins — a block only counts
  //    toward the score if it's non-background in either render.
  // 2. Over-penalizing soft effects like box-shadow/blur — a gradient has no
  //    flat interior, so an exact pixel-for-pixel comparison makes even a
  //    sub-pixel shift (which browsers can round differently between two
  //    separate renders) look like a huge mismatch across the whole gradient,
  //    even though it's visually identical. Averaging small blocks absorbs
  //    that jitter while staying sensitive to real differences — wrong
  //    colors, missing elements, or misalignment bigger than a block.
  let relevant = 0
  let mismatched = 0

  for (let y = 0; y < height; y += blockSize) {
    const blockHeight = Math.min(blockSize, height - y)

    for (let x = 0; x < width; x += blockSize) {
      const blockWidth = Math.min(blockSize, width - x)

      const [tr, tg, tb] = averageBlockColor(targetData, width, x, y, blockWidth, blockHeight)
      const [sr, sg, sb] = averageBlockColor(studentData, width, x, y, blockWidth, blockHeight)

      const targetIsBg = isBackgroundColor(tr, tg, tb, backgroundTolerance)
      const studentIsBg = isBackgroundColor(sr, sg, sb, backgroundTolerance)

      if (targetIsBg && studentIsBg) continue

      relevant++

      const dr = tr - sr
      const dg = tg - sg
      const db = tb - sb
      const distance = Math.sqrt(dr * dr + dg * dg + db * db)

      if (distance > colorTolerance) mismatched++
    }
  }

  const score = relevant === 0
    ? 100
    : Math.max(0, Math.round((1 - mismatched / relevant) * 1000) / 10)

  return {
    score,
    studentImage: studentCanvas.toDataURL("image/png"),
    diffImage: diffCanvas.toDataURL("image/png"),
  }
}


function Submit({
  payload,
  score,
  groupId,
  taskId,
  submission,
  setSubmission,
  googleClientId,
  submitUrl,
}: {
  payload: { html: string; css: string }
  score: number
  groupId?: string
  taskId?: string
  submission: Submission
  setSubmission: (a: Submission) => void
  googleClientId: string
  submitUrl: string
}) {
  const [accessToken, setAccessToken] = useState<string>()

  const login = useGoogleLogin({
    onSuccess: async ({ access_token }) => {
      setAccessToken(access_token)
    },
    onError: async ({ error }) => {
      console.log(error)
    },
  })


  function onSubmit() {
    setSubmission(Submission.PENDING)

    const data = new URLSearchParams()

    // No pass/fail threshold baked in here — just the raw score. Work can be
    // submitted at any score; grading against a minimum, if wanted, happens
    // downstream rather than being enforced by this component.
    data.append("data", JSON.stringify({
      accessToken,
      groupId: groupId ?? "[group]",
      taskId: taskId ?? "[task]",
      score,
      code: JSON.stringify(payload),
    }))

    fetch(submitUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: data.toString()
    })
    .then(res => res.json())
    .then(res => {
      if (res.ok) {
        setSubmission(Submission.COMPLETE)
      } else {
        setSubmission(Submission.INCOMPLETE)
      }
    })
  }


  return <>
    {submission === Submission.INCOMPLETE && !accessToken && (
      <button
        className="btn btn-primary grow"
        onClick={() => login()}
      >
        Sign in to Submit
      </button>
    )}

    {submission === Submission.INCOMPLETE && !!accessToken && (
      <button
        className="btn btn-primary grow"
        onClick={() => onSubmit()}
      >
        Submit ({score}%)
      </button>
    )}

    {submission === Submission.PENDING && (
      <button className="btn btn-primary grow" disabled>
        <span className="loading loading-dots"></span>
      </button>
    )}

    {submission === Submission.COMPLETE && (
      <button className="btn btn-primary grow" disabled>
        <Check />
      </button>
    )}
  </>
}


export default function HTMLCSSExercise({
  title,
  instructions,
  starterHtml = "",
  starterCss = "",
  targetHtml,
  targetCss,
  editable = "both",
  width = 800,
  height = 500,
  passingScore = 95,
  comparisonBlockSize = 6,
  backgroundTolerance = 10,
  colorTolerance = 40,
  groupId,
  taskId,
  doSubmit,
  googleClientId = "749413588250-nthuvm5m8u7n07b9qd1eegmmdg4nd8g0.apps.googleusercontent.com",
  submitUrl = "https://script.google.com/macros/s/AKfycbwyeVWA2u7NOHQSyUaf_-BeNkvUjRQNTQI3C1OpxbHRs6gXqACtHcnygY6PzJjtOaA/exec",
}: HTMLCSSExerciseProps) {

  const resolvedTargetHtml = targetHtml ?? starterHtml

  const [html, setHtml] = useState(starterHtml)
  const [css, setCss] = useState(starterCss)
  const [tab, setTab] = useState<"html" | "css">(editable === "css" ? "css" : "html")
  const [previewTab, setPreviewTab] = useState<"target" | "yours" | "diff">("target")

  // Live, ungraded previews shown while editing.
  const [targetPreview, setTargetPreview] = useState<string | null>(null)
  const [studentPreview, setStudentPreview] = useState<string | null>(null)
  const [previewBusy, setPreviewBusy] = useState(false)

  // Graded comparison, produced by "Run Comparison".
  const [status, setStatus] = useState<RunStatus>("idle")
  const [result, setResult] = useState<CompareResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const [submission, setSubmission] = useState<Submission>(
    Submission.INCOMPLETE
  )

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null as any)


  // Render the target once (it's static for the exercise).
  useEffect(() => {
    let cancelled = false

    renderToCanvas(resolvedTargetHtml, targetCss, width, height)
      .then(canvas => {
        if (!cancelled) setTargetPreview(canvas.toDataURL("image/png"))
      })
      .catch(() => {
        // Surfaced properly when they hit "Run Comparison"; keep the live
        // preview panel silent about target-side errors.
      })

    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedTargetHtml, targetCss, width, height])


  // Re-render the student's live preview on a short debounce as they type.
  useEffect(() => {
    setPreviewBusy(true)
    clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(() => {
      renderToCanvas(html, css, width, height)
        .then(canvas => setStudentPreview(canvas.toDataURL("image/png")))
        .catch(() => {
          // Leave the last good preview up; errors surface on Run Comparison.
        })
        .finally(() => setPreviewBusy(false))
    }, 500)

    return () => clearTimeout(debounceRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [html, css, width, height])


  async function runComparison() {
    setStatus("running")
    setError(null)
    setResult(null)

    try {
      const compared = await compare(
        html,
        css,
        resolvedTargetHtml,
        targetCss,
        width,
        height,
        comparisonBlockSize,
        backgroundTolerance,
        colorTolerance
      )

      setResult(compared)
      setStatus("done")
      setPreviewTab("diff")

    } catch (err: any) {
      setError(err?.message ?? "Something went wrong while rendering the preview.")
      setStatus("error")
    }
  }


  function resetCode() {
    setHtml(starterHtml)
    setCss(starterCss)
    setResult(null)
    setStatus("idle")
    setError(null)
    setPreviewTab("target")
    setSubmission(Submission.INCOMPLETE)
  }


  return (
    <GoogleOAuthProvider clientId={googleClientId}>

      <div className="not-prose my-6 rounded-box border border-base-300 bg-base-200 shadow">

        <div className="border-b border-base-300 p-4">
          <h2 className="text-xl font-bold">{title}</h2>

          <p className="mt-2 whitespace-pre-wrap text-sm text-base-content/80">
            {instructions}
          </p>
        </div>


        <div className="border-b border-base-300">

          <div role="tablist" className="tabs tabs-lift px-4 pt-3">

            <a
              role="tab"
              className={`tab gap-2 ${tab === "html" ? "tab-active" : ""}`}
              onClick={() => setTab("html")}
            >
              <Code2 className="w-4 h-4" /> HTML
              {editable === "css" && <Lock className="w-3.5 h-3.5 text-base-content/40" />}
            </a>

            <a
              role="tab"
              className={`tab gap-2 ${tab === "css" ? "tab-active" : ""}`}
              onClick={() => setTab("css")}
            >
              <Palette className="w-4 h-4" /> CSS
              {editable === "html" && <Lock className="w-3.5 h-3.5 text-base-content/40" />}
            </a>

          </div>

          {tab === "html" ? (
            <CodeMirror
              value={html}
              height="320px"
              extensions={[htmlLang()]}
              onChange={value => setHtml(value)}
              editable={editable !== "css"}
              theme="dark"
              basicSetup={{
                lineNumbers: true,
                foldGutter: false,
              }}
            />
          ) : (
            <CodeMirror
              value={css}
              height="320px"
              extensions={[cssLang()]}
              onChange={value => setCss(value)}
              editable={editable !== "html"}
              theme="dark"
              basicSetup={{
                lineNumbers: true,
                foldGutter: false,
              }}
            />
          )}

          {((tab === "html" && editable === "css") || (tab === "css" && editable === "html")) && (
            <div className="px-4 py-2 text-xs text-base-content/50 flex items-center gap-1.5 border-t border-base-300">
              <Lock className="w-3 h-3" /> Read-only — this part is fixed for the exercise.
            </div>
          )}

        </div>


        <div className="border-b border-base-300">

          <div role="tablist" className="tabs tabs-lift px-4 pt-3">

            <a
              role="tab"
              className={`tab gap-2 ${previewTab === "target" ? "tab-active" : ""}`}
              onClick={() => setPreviewTab("target")}
            >
              Target
            </a>

            <a
              role="tab"
              className={`tab gap-2 ${previewTab === "yours" ? "tab-active" : ""}`}
              onClick={() => setPreviewTab("yours")}
            >
              Yours
              {previewBusy && <span className="loading loading-dots loading-xs"></span>}
            </a>

            {result && (
              <a
                role="tab"
                className={`tab gap-2 ${previewTab === "diff" ? "tab-active" : ""}`}
                onClick={() => setPreviewTab("diff")}
              >
                Diff
              </a>
            )}

          </div>

          <div className="p-4">
            <div
              className={`mx-auto rounded border border-base-300 bg-white overflow-hidden w-full transition-opacity ${
                previewTab === "yours" && previewBusy ? "opacity-60" : ""
              }`}
              style={{ aspectRatio: `${width} / ${height}`, maxWidth: `${width}px` }}
            >
              {previewTab === "target" && (
                targetPreview
                  ? <img src={targetPreview} alt="Target rendering" className="w-full h-full object-contain" />
                  : <div className="w-full h-full flex items-center justify-center text-xs text-base-content/40">Rendering…</div>
              )}

              {previewTab === "yours" && (
                studentPreview
                  ? <img src={studentPreview} alt="Your rendering" className="w-full h-full object-contain" />
                  : <div className="w-full h-full flex items-center justify-center text-xs text-base-content/40">Rendering…</div>
              )}

              {previewTab === "diff" && result && (
                <img src={result.diffImage} alt="Diff overlay" className="w-full h-full object-contain" />
              )}
            </div>
          </div>

        </div>


        <div className="border-t border-base-300 p-4 flex items-center gap-2">

          <button
            className="btn btn-primary"
            onClick={runComparison}
            disabled={status === "running"}
          >
            {status === "running"
              ? <span className="loading loading-dots"></span>
              : "Run Comparison"}
          </button>

          {result && (
            <div
              className={`ml-auto text-sm font-medium ${
                result.score >= passingScore ? "text-success" : "text-error"
              }`}
            >
              {result.score}% match
            </div>
          )}

        </div>


        {error && (
          <div className="border-t border-base-300 p-4">
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          </div>
        )}


        {result && (
          <div className="border-t border-base-300 p-4">

            <div
              className={`rounded-box border p-3 flex items-center justify-between ${
                result.score >= passingScore
                  ? "border-success/30 bg-success/10"
                  : "border-error/30 bg-error/10"
              }`}
            >
              <span className="font-medium">
                {result.score >= passingScore ? "Looks good!" : "Not quite a match yet"}
              </span>

              <span className={result.score >= passingScore ? "text-success" : "text-error"}>
                {result.score}%
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2 w-full justify-end">

              {doSubmit && <Submit
                payload={{ html, css }}
                score={result.score}
                groupId={groupId}
                taskId={taskId}
                submission={submission}
                setSubmission={setSubmission}
                googleClientId={googleClientId}
                submitUrl={submitUrl}
              />}

              <button
                className="btn btn-ghost"
                onClick={resetCode}
                disabled={submission !== Submission.INCOMPLETE}
              >
                Reset
              </button>

            </div>

          </div>
        )}

      </div>

    </GoogleOAuthProvider>
  )
}
