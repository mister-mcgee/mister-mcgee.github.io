import { useMemo, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { python } from "@codemirror/lang-python"

type Test = {
  name: string
  code: string
}

type PythonExerciseProps = {
  title: string
  instructions: string

  starterCode: string

  tests: Test[]
}

type TestResult = {
  name: string
  passed: boolean
  error?: string
}

let pyodidePromise: Promise<any> | null = null

async function getPyodide() {
  if (!pyodidePromise) {
    pyodidePromise = (async () => {
      // @ts-ignore
      const { loadPyodide } = await import(
        "https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.mjs" as const
      )

      return await loadPyodide()
    })()
  }

  return pyodidePromise
}

export default function PythonExercise({
  title,
  instructions,
  starterCode,
  tests,
}: PythonExerciseProps) {
  const [code, setCode] = useState(starterCode)

  const [results, setResults] = useState<TestResult[]>([])

  const [runtimeError, setRuntimeError] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)

  const stats = useMemo(() => {
    const passed = results.filter((r) => r.passed).length

    return {
      passed,
      total: results.length,
    }
  }, [results])

  async function runTests() {
    setRuntimeError(null)
    setLoading(true)

    try {
      const pyodide = await getPyodide()

      const newResults: TestResult[] = []

      for (const test of tests) {
        try {
          const fullCode = `
${code}

result = ${test.code}
`

          await pyodide.runPythonAsync(fullCode)

          const passed = pyodide.globals.get("result")

          newResults.push({
            name: test.name,
            passed: Boolean(passed),
          })
        } catch (err: any) {
          newResults.push({
            name: test.name,
            passed: false,
            error: err?.message ?? "Test failed",
          })
        }
      }

      setResults(newResults)
    } catch (err: any) {
      setRuntimeError(err?.message ?? "Unknown runtime error")
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  function resetCode() {
    setCode(starterCode)

    setResults([])
    setRuntimeError(null)
  }

  return (
    <div className="not-prose my-6 rounded-box border border-base-300 bg-base-200 shadow">
      <div className="border-b border-base-300 p-4">
        <h2 className="text-xl font-bold">{title}</h2>

        <p className="mt-2 whitespace-pre-wrap text-sm text-base-content/80">
          {instructions}
        </p>
      </div>

      <div className="overflow-hidden">
        <CodeMirror
          value={code}
          height="300px"
          extensions={[python()]}
          onChange={(value) => setCode(value)}
          theme="dark"
          basicSetup={{
            lineNumbers: true,
            foldGutter: false,
          }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-base-300 p-4">
        <button
          className={`btn btn-primary ${
            loading ? "btn-disabled" : ""
          }`}
          onClick={runTests}
        >
          {loading ? "Loading Python..." : "Run Tests"}
        </button>

        <button
          className="btn btn-ghost"
          onClick={resetCode}
        >
          Reset
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
            {results.map((result) => (
              <div
                key={result.name}
                className={`rounded-box border p-3 ${
                  result.passed
                    ? "border-success/30 bg-success/10"
                    : "border-error/30 bg-error/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {result.name}
                  </span>

                  <span
                    className={
                      result.passed
                        ? "text-success"
                        : "text-error"
                    }
                  >
                    {result.passed ? "PASS" : "FAIL"}
                  </span>
                </div>

                {result.error && (
                  <pre className="mt-2 overflow-auto text-sm text-error whitespace-pre-wrap">
                    {result.error}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}