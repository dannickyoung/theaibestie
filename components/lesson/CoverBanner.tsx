import styles from "./lesson.module.css";

export default function CoverBanner({
  tab,
  faceSrc,
  faceAlt = "Wendy, your AI Bestie",
}: {
  tab: string;
  faceSrc: string;
  faceAlt?: string;
}) {
  return (
    <div className={styles.banner}>
      <div className={styles.bGrid} />
      <div className={styles.bKicker}>THE AI BESTIE COURSE</div>
      <span className={styles.bWm}>
        <span className={styles.l1}>THE AI</span>
        <span className={styles.l2}>BESTIE</span>
      </span>
      <div className={styles.coursetab}>{tab}</div>
      <div className={styles.bTag}>AI tutorials even your mom can understand</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.bFace} src={faceSrc} alt={faceAlt} />
    </div>
  );
}
