import { useMemo, useState } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"

type Test = {
  name: string
  code: string
}

type JavaScriptExerciseProps = {
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

export default function JavaScriptExercise({
  title,
  instructions,
  starterCode,
  tests,
}: JavaScriptExerciseProps) {
  const [code, setCode] = useState(starterCode)

  const [results, setResults] = useState<TestResult[]>([])

  const [runtimeError, setRuntimeError] = useState<string | null>(null)

  const stats = useMemo(() => {
    const passed = results.filter((r) => r.passed).length

    return {
      passed,
      total: results.length,
    }
  }, [results])

  async function runTests() {
    setRuntimeError(null)

    try {
      // create isolated scope object
      const scope: Record<string, any> = {}

      // execute student code
      const wrappedCode = `
        "use strict";

        ${code}

        return {
          ...globalThis
        }
      `

      const fn = new Function(wrappedCode)

      const returned = fn()

      Object.assign(scope, returned)

      const newResults: TestResult[] = []

      for (const test of tests) {
        try {
          const runner = new Function(`
            ${code}

            return ${test.code}
          `)

          const passed = runner()

          newResults.push({
            name: test.name,
            passed,
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
          extensions={[javascript()]}
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
          className="btn btn-primary"
          onClick={runTests}
        >
          Run Tests
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
                  <pre className="mt-2 overflow-auto text-sm text-error">
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