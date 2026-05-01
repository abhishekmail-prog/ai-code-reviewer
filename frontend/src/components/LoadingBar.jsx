import React from "react";
import styles from "./LoadingBar.module.css";

export default function LoadingBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.track}>
        <div className={styles.fill} />
      </div>
      <p className={styles.label}>Analyzing your code...</p>
    </div>
  );
}
