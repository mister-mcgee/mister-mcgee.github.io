import { useMemo, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google"
import { Check, Lock } from "lucide-react"

type Test = {
  name: string
  code: string
}

type JavaScriptExerciseProps = {
  title: string
  instructions: string
  starterCode: string
  tests: Test[]
  groupId?: string
  taskId?: string
  doSubmit?: boolean
}

type TestResult = {
  name: string
  passed: boolean
  error?: string
}

const Submission = {
  PENDING: "pending",
  COMPLETE: "complete",
  INCOMPLETE: "incomplete",
} as const

type Submission = typeof Submission[keyof typeof Submission]


function getScore(results: TestResult[]) {
  if (results.length === 0) return 0

  return Math.round(
    results.filter(r => r.passed).length / results.length * 100
  )
}


function Submit({
  code,
  results,
  groupId,
  taskId,
  submission,
  setSubmission,
}: {
  code: string
  results: TestResult[]
  groupId?: string
  taskId?: string
  submission: Submission
  setSubmission: (a: Submission) => void
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

    data.append("data", JSON.stringify({
      accessToken,
      groupId: groupId ?? "[group]",
      taskId: taskId ?? "[task]",
      score: getScore(results),
      responses: results.map(result => result.passed),
      code,
    }))

    fetch("https://script.google.com/macros/s/AKfycbwyeVWA2u7NOHQSyUaf_-BeNkvUjRQNTQI3C1OpxbHRs6gXqACtHcnygY6PzJjtOaA/exec", {
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


  if (results.length === 0) {
    return (
      <div className="flex items-center rounded-lg caution p-2 text-base-content/65 grow">
        <Lock className="w-5 h-5" />
        <div className="divider divider-horizontal"></div>
        <span className="text-sm italic">
          Run tests before submitting.
        </span>
      </div>
    )
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
        Submit ({getScore(results)}%)
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


export default function JavaScriptExercise({
  title,
  instructions,
  starterCode,
  tests,
  groupId,
  taskId,
  doSubmit
}: JavaScriptExerciseProps) {

  const [code, setCode] = useState(starterCode)
  const [results, setResults] = useState<TestResult[]>([])
  const [runtimeError, setRuntimeError] = useState<string | null>(null)

  const [submission, setSubmission] = useState<Submission>(
    Submission.INCOMPLETE
  )


  const stats = useMemo(() => {
    return {
      passed: results.filter(r => r.passed).length,
      total: results.length,
    }
  }, [results])


  async function runTests() {
    setRuntimeError(null)

    try {
      const newResults: TestResult[] = []

      for (const test of tests) {
        try {
          const runner = new Function(`
            "use strict";

            ${code}

            return ${test.code}
          `)

          newResults.push({
            name: test.name,
            passed: runner(),
          })

        } catch (err: any) {
          newResults.push({
            name: test.name,
            passed: false,
            error: err.message,
          })
        }
      }

      setResults(newResults)

    } catch (err: any) {
      setRuntimeError(err?.message ?? "Unknown runtime error")
      setResults([])
    }
  }


  function resetCode() {
    setCode(starterCode)
    setResults([])
    setRuntimeError(null)
    setSubmission(Submission.INCOMPLETE)
  }


  return (
    <GoogleOAuthProvider clientId="749413588250-nthuvm5m8u7n07b9qd1eegmmdg4nd8g0.apps.googleusercontent.com">

      <div className="not-prose my-6 rounded-box border border-base-300 bg-base-200 shadow">

        <div className="border-b border-base-300 p-4">
          <h2 className="text-xl font-bold">{title}</h2>

          <p className="mt-2 whitespace-pre-wrap text-sm text-base-content/80">
            {instructions}
          </p>
        </div>


        <CodeMirror
          value={code}
          height="300px"
          extensions={[javascript()]}
          onChange={value => setCode(value)}
          theme="dark"
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
          }}
        />


        <div className="border-t border-base-300 p-4 flex items-center gap-2">

          <button
            className="btn btn-primary"
            onClick={runTests}
          >
            Run Tests
          </button>

          {results.length > 0 && (
            <div className="ml-auto text-sm font-medium">
              {stats.passed} / {stats.total} Passed
            </div>
          )}

        </div>


        {(runtimeError || results.length > 0) && (
          <div className="border-t border-base-300 p-4">

            {runtimeError && (
              <div className="alert alert-error mb-4">
                <span>{runtimeError}</span>
              </div>
            )}

            <div className="space-y-2">

              {results.map(result => (
                <div
                  key={result.name}
                  className={`rounded-box border p-3 ${
                    result.passed
                      ? "border-success/30 bg-success/10"
                      : "border-error/30 bg-error/10"
                  }`}
                >

                  <div className="flex justify-between">
                    <span className="font-medium">
                      {result.name}
                    </span>

                    <span className={result.passed ? "text-success" : "text-error"}>
                      {result.passed ? "PASS" : "FAIL"}
                    </span>
                  </div>

                  {result.error && (
                    <pre className="mt-2 text-sm text-error">
                      {result.error}
                    </pre>
                  )}

                </div>
              ))}

            </div>


            <div className="mt-4 flex items-center gap-2 w-full justify-end">

              {doSubmit && <Submit
                code={code}
                results={results}
                groupId={groupId}
                taskId={taskId}
                submission={submission}
                setSubmission={setSubmission}
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