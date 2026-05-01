import React from "react";
import styles from "./CodeEditor.module.css";

const LANGUAGES = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "cpp", label: "C++" },
];

export default function CodeEditor({ code, language, onChange, onLanguageChange }) {
  return (
    <div className={styles.card}>
      <div className={styles.toolbar}>
        <div className={styles.dots}>
          <span className={`${styles.dot} ${styles.red}`} />
          <span className={`${styles.dot} ${styles.amber}`} />
          <span className={`${styles.dot} ${styles.green}`} />
        </div>
        <span className={styles.label}>paste your code</span>
        <select
          className={styles.langSelect}
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
        >
          {LANGUAGES.map((l) => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
      </div>

      <textarea
        className={styles.textarea}
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`// Paste your ${language} code here...\n\nfunction example() {\n  // your code\n}`}
        spellCheck={false}
      />

      <div className={styles.charCount}>
        {code.length.toLocaleString()} character{code.length !== 1 ? "s" : ""}
      </div>
    </div>
  );
}
