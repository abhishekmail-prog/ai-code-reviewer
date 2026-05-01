import React, { useState } from "react";
import CodeEditor from "./components/CodeEditor";
import ReviewResults from "./components/ReviewResults";
import LoadingBar from "./components/LoadingBar";
import { reviewCode } from "./api";
import styles from "./App.module.css";

export default function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleReview = async () => {
    if (!code.trim()) {
      setError("Please paste some code first.");
      return;
    }
    setLoading(true);
    setResults(null);
    setError("");

    try {
      const data = await reviewCode(code, language);
      setResults(data);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCode("");
    setResults(null);
    setError("");
  };

  return (
    <div className={styles.app}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
        <h1 className={styles.heading}>Code Reviewer</h1>
        <span className={styles.badge}>AI-powered</span>
      </header>

      {/* Editor */}
      <CodeEditor
        code={code}
        language={language}
        onChange={setCode}
        onLanguageChange={setLanguage}
      />

      {/* Actions */}
      <div className={styles.actions}>
        <button
          className={styles.btnReview}
          onClick={handleReview}
          disabled={loading}
        >
          {loading ? (
            <>
              <span className={styles.spinner} />
              Analyzing...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 12l2 2 4-4" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              Review Code
            </>
          )}
        </button>
        <button className={styles.btnClear} onClick={handleClear}>
          Clear
        </button>
      </div>

      {/* Loading */}
      {loading && <LoadingBar />}

      {/* Error */}
      {error && <div className={styles.errorBox}>⚠ {error}</div>}

      {/* Results */}
      {results && <ReviewResults data={results} language={language} />}

      {/* Empty state */}
      {!results && !loading && !error && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <p>
            Paste any code above and click{" "}
            <strong style={{ color: "var(--accent)" }}>Review Code</strong>
            <br />
            to get AI-powered feedback on bugs, complexity, and optimizations.
          </p>
        </div>
      )}
    </div>
  );
}
