import styles from "./lesson.module.css";

export default function Step({
  n,
  title,
  children,
}: {
  n: number | string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.setup}>
      <div className={styles.num2}>{n}</div>
      <div className={styles.stepBody}>
        <h3>{title}</h3>
        {children}
      </div>
    </div>
  );
}
