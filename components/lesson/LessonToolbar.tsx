import styles from "./lesson.module.css";

export default function LessonToolbar({
  label,
  pdfHref,
}: {
  label: string;
  pdfHref: string;
}) {
  return (
    <header className={styles.toolbar}>
      <a className={styles.tbHome} href="/">
        <span className={styles.tbAr}>&lsaquo;</span>
        <span className={styles.tbWm}>THE AI BESTIE</span>
        <span className={styles.tbLs}>&middot; {label}</span>
      </a>
      <a className={styles.tbDl} href={pdfHref} download>
        <i className="iconoir-download" /> Download PDF
      </a>
    </header>
  );
}
