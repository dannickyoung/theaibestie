import styles from "./lesson.module.css";
import LessonToolbar from "./LessonToolbar";

/** Page shell: full-width notepaper, fixed toolbar, centered content column. */
export default function Lesson({
  label,
  pdfHref,
  children,
}: {
  label: string;
  pdfHref?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.root}>
      <LessonToolbar label={label} pdfHref={pdfHref} />
      <div className={styles.col}>{children}</div>
    </div>
  );
}
