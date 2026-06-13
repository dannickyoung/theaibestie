import styles from "./lesson.module.css";

export default function Star({
  fill,
  style,
}: {
  fill: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg className={styles.star} style={style} viewBox="0 0 51 48">
      <path
        d="M25.5 2l6.4 15.6 16.8 1.3-12.8 11 4 16.4L25.5 38 11 46.3l4-16.4-12.8-11 16.8-1.3z"
        fill={fill}
        stroke="#141414"
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
    </svg>
  );
}
