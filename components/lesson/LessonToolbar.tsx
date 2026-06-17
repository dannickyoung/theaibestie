import styles from "./lesson.module.css";

export default function LessonToolbar({
  label,
  pdfHref,
}: {
  label: string;
  pdfHref?: string;
}) {
  return (
    <header className={styles.toolbar}>
      <a className={styles.tbHome} href="/lessons">
        <span className={styles.tbAr}>&lsaquo;</span>
        <span className={styles.tbWm}>THE AI BESTIE</span>
        <span className={styles.tbSep}>&middot;</span>
        <span className={styles.tbLs}>{label}</span>
      </a>
      {pdfHref && (
        <a className={styles.tbDl} href={pdfHref} download>
          <i className="iconoir-download" />
          <span className={styles.dlFull}>Download PDF</span>
          <span className={styles.dlShort}>PDF</span>
        </a>
      )}
    </header>
  );
}
