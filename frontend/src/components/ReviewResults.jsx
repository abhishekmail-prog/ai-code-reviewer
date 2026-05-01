import React, { useState } from "react";
import ResultSection from "./ResultSection";
import styles from "./ReviewResults.module.css";

function BugsPanel({ bugs }) {
  if (!bugs || bugs.length === 0) {
    return (
      <p className={styles.allClear}>✓ No bugs found — code looks clean!</p>
    );
  }
  return (
    <ul className={styles.bugList}>
      {bugs.map((b, i) => (
        <li key={i} className={styles.bugItem}>
          <div className={styles.bugNum}>{i + 1}</div>
          <div className={styles.bugText}>
            <strong>{b.title}</strong>
            <span>{b.description}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

function ComplexityPanel({ complexity }) {
  const c = complexity || {};
  return (
    <div className={styles.complexityGrid}>
      <div className={styles.complexityCard}>
        <div className={styles.cLabel}>Time Complexity</div>
        <div className={`${styles.cVal} ${styles.timeColor}`}>{c.time || "N/A"}</div>
        <div className={styles.cDesc}>{c.timeExplanation}</div>
      </div>
      <div className={styles.complexityCard}>
        <div className={styles.cLabel}>Space Complexity</div>
        <div className={`${styles.cVal} ${styles.spaceColor}`}>{c.space || "N/A"}</div>
        <div className={styles.cDesc}>{c.spaceExplanation}</div>
      </div>
    </div>
  );
}

function OptimizationsPanel({ optimizations }) {
  if (!optimizations || optimizations.length === 0) {
    return <p className={styles.allClear}>No major optimizations needed.</p>;
  }
  return (
    <ul className={styles.optList}>
      {optimizations.map((o, i) => (
        <li key={i} className={styles.optItem}>
          <div className={styles.optDot} />
          <div className={styles.optText}>
            <strong>{o.title}</strong> — {o.description}
          </div>
        </li>
      ))}
    </ul>
  );
}

function CleanCodePanel({ code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code || "").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <button className={styles.copyBtn} onClick={handleCopy}>
        {copied ? "Copied!" : "Copy"}
      </button>
      <div className={styles.codeBlock}>
        <pre>{code}</pre>
      </div>
    </div>
  );
}

export default function ReviewResults({ data, language }) {
  if (!data) return null;

  const { bugs, complexity, optimizations, cleanedCode } = data;
  const bugCount = bugs?.length ?? 0;
  const optCount = optimizations?.length ?? 0;

  return (
    <div className={styles.container}>
      <ResultSection
        icon="🐛"
        title="Bugs & Issues"
        badge={`${bugCount} found`}
        badgeClass="bugs"
      >
        <BugsPanel bugs={bugs} />
      </ResultSection>

      <ResultSection
        icon="⏱"
        title="Time Complexity"
        badge={complexity?.time || "N/A"}
        badgeClass="complexity"
      >
        <ComplexityPanel complexity={complexity} />
      </ResultSection>

      <ResultSection
        icon="⚡"
        title="Optimization Suggestions"
        badge={`${optCount} tip${optCount !== 1 ? "s" : ""}`}
        badgeClass="optimize"
      >
        <OptimizationsPanel optimizations={optimizations} />
      </ResultSection>

      <ResultSection
        icon="✨"
        title="Cleaned-up Version"
        badge={language}
        badgeClass="clean"
      >
        <CleanCodePanel code={cleanedCode} />
      </ResultSection>
    </div>
  );
}
