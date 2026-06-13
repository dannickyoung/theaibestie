import styles from "./lesson.module.css";

export default function Chip({
  icon,
  color,
}: {
  icon: string;
  color: string;
}) {
  return (
    <div className={styles.chip} style={{ background: color }}>
      <i className={icon} />
    </div>
  );
}
