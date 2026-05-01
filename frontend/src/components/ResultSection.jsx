import React, { useState } from "react";
import styles from "./ResultSection.module.css";

export default function ResultSection({ icon, title, badge, badgeClass, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className={styles.section}>
      <div className={styles.header} onClick={() => setOpen((o) => !o)}>
        <div className={`${styles.iconBox} ${styles[`icon_${icon}`]}`}>
          <span>{icon}</span>
        </div>
        <span className={`${styles.title} ${styles[`title_${badgeClass}`]}`}>{title}</span>
        {badge && (
          <span className={`${styles.badge} ${styles[`badge_${badgeClass}`]}`}>{badge}</span>
        )}
        <span className={`${styles.chevron} ${open ? styles.open : ""}`}>▼</span>
      </div>
      {open && <div className={styles.body}>{children}</div>}
    </div>
  );
}
