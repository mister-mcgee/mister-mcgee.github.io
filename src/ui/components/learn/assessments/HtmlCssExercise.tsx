import { useEffect, useRef, useState } from "react"

type HtmlCssExerciseProps = {
  title: string
  instructions?: string

  targetHtml: string
  targetCss: string

  starterHtml?: string
  starterCss?: string

  width?: number
  height?: number
}

type PixelResult = {
  score: number
  diffPixels: number
  totalPixels: number
}

export default function HtmlCssExercise({
  title,
  instructions,

  targetHtml,
  targetCss,

  starterHtml = "",
  starterCss = "",

  width = 400,
  height = 300,
}: HtmlCssExerciseProps) {
  const [html, setHtml] = useState(starterHtml)
  const [css, setCss] = useState(starterCss)

  const [result, setResult] = useState<PixelResult | null>(null)

  const targetFrame = useRef<HTMLIFrameElement>(null)
  const studentFrame = useRef<HTMLIFrameElement>(null)

  function buildDocument(
    html: string,
    css: string
  ) {
    return `
<!DOCTYPE html>
<html>
<head>
<style>
* {
  box-sizing: border-box;
}

html, body {
  margin:0;
  padding:0;
  width:100%;
  height:100%;
}

${css}

</style>
</head>

<body>
${html}
</body>

</html>
`
  }

  useEffect(() => {
    if (targetFrame.current) {
      targetFrame.current.srcdoc =
        buildDocument(targetHtml, targetCss)
    }
  }, [targetHtml, targetCss])


  useEffect(() => {
    if (studentFrame.current) {
      studentFrame.current.srcdoc =
        buildDocument(html, css)
    }
  }, [html, css])


  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">
        {title}
      </h2>

      {instructions && (
        <p>
          {instructions}
        </p>
      )}


      <div className="grid grid-cols-2 gap-4">

        <div>
          <h3 className="font-bold">
            Target
          </h3>

          <iframe
            ref={targetFrame}
            width={width}
            height={height}
            className="border"
          />
        </div>


        <div>
          <h3 className="font-bold">
            Your Version
          </h3>

          <iframe
            ref={studentFrame}
            width={width}
            height={height}
            className="border"
          />
        </div>

      </div>


      <div className="grid grid-cols-2 gap-4">

        <div>
          <h3>
            HTML
          </h3>

          <textarea
            value={html}
            onChange={(e) =>
              setHtml(e.target.value)
            }
            className="w-full h-48 border font-mono"
          />
        </div>


        <div>
          <h3>
            CSS
          </h3>

          <textarea
            value={css}
            onChange={(e) =>
              setCss(e.target.value)
            }
            className="w-full h-48 border font-mono"
          />
        </div>

      </div>


      <button
        onClick={async () => {

          if (
            !targetFrame.current ||
            !studentFrame.current
          ) {
            return
          }


          const targetDoc =
            targetFrame.current.contentDocument

          const studentDoc =
            studentFrame.current.contentDocument


          if (
            !targetDoc ||
            !studentDoc
          ) {
            return
          }


          const targetCanvas =
            await renderElementToCanvas(
              targetDoc.body,
              width,
              height
            )


          const studentCanvas =
            await renderElementToCanvas(
              studentDoc.body,
              width,
              height
            )


          const comparison =
            compareCanvases(
              targetCanvas,
              studentCanvas
            )


          setResult(comparison)

        }}
      >
        Grade
      </button>


      {result && (
        <div>
          Score:
          {(result.score * 100).toFixed(2)}%
        </div>
      )}

    </div>
  )
}

async function renderElementToCanvas(
  element: HTMLElement,
  width: number,
  height: number
): Promise<HTMLCanvasElement> {

  const serialized = new XMLSerializer()
    .serializeToString(element)

  const svg = `
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="${width}"
  height="${height}"
>
  <foreignObject
    width="100%"
    height="100%"
  >
    <div
      xmlns="http://www.w3.org/1999/xhtml"
      style="
        width:${width}px;
        height:${height}px;
      "
    >
      ${serialized}
    </div>
  </foreignObject>
</svg>
`

  const blob = new Blob(
    [svg],
    {
      type: "image/svg+xml"
    }
  )

  const url = URL.createObjectURL(blob)

  const image = new Image()

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve()
    image.onerror = reject
    image.src = url
  })

  URL.revokeObjectURL(url)


  const canvas =
    document.createElement("canvas")

  canvas.width = width
  canvas.height = height


  const ctx =
    canvas.getContext("2d")

  if (!ctx) {
    throw new Error(
      "Canvas unavailable"
    )
  }


  ctx.drawImage(
    image,
    0,
    0,
    width,
    height
  )

  return canvas
}


function compareCanvases(
  a: HTMLCanvasElement,
  b: HTMLCanvasElement
): PixelResult {

  const ctxA =
    a.getContext("2d")

  const ctxB =
    b.getContext("2d")


  if (!ctxA || !ctxB) {
    throw new Error(
      "Missing canvas context"
    )
  }


  const imageA =
    ctxA.getImageData(
      0,
      0,
      a.width,
      a.height
    )

  const imageB =
    ctxB.getImageData(
      0,
      0,
      b.width,
      b.height
    )


  let different = 0

  const total =
    a.width *
    a.height


  for (
    let i = 0;
    i < imageA.data.length;
    i += 4
  ) {

    const r =
      Math.abs(
        imageA.data[i] -
        imageB.data[i]
      )

    const g =
      Math.abs(
        imageA.data[i + 1] -
        imageB.data[i + 1]
      )

    const b =
      Math.abs(
        imageA.data[i + 2] -
        imageB.data[i + 2]
      )


    // tolerance for antialiasing
    if (
      r > 10 ||
      g > 10 ||
      b > 10
    ) {
      different++
    }
  }


  return {
    score:
      1 -
      different / total,

    diffPixels:
      different,

    totalPixels:
      total
  }
}