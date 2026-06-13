import { Fragment } from "react";
import styles from "./lesson.module.css";

export type RoadmapItem = {
  title: React.ReactNode;
  status: "done" | "next" | "lock";
};

const ICON: Record<RoadmapItem["status"], string> = {
  done: "iconoir-check-circle-solid",
  next: "iconoir-star",
  lock: "iconoir-lock",
};
const ICON_COLOR: Record<RoadmapItem["status"], string> = {
  done: "var(--green-deep)",
  next: "var(--magenta)",
  lock: "#9aa0a6",
};
const CARD: Record<RoadmapItem["status"], string> = {
  done: styles.rmDone,
  next: styles.rmNext,
  lock: styles.rmLock,
};

export default function Roadmap({ items }: { items: RoadmapItem[] }) {
  return (
    <div className={`${styles.clay} ${styles.roadmap}`}>
      <h3 className={styles.rmTitle}>
        <i className="iconoir-map-pin" /> The road ahead
      </h3>
      <div className={styles.rmRow}>
        {items.map((it, i) => (
          <Fragment key={i}>
            {i > 0 && <i className={`iconoir-nav-arrow-right ${styles.rmArrow}`} />}
            <div className={`${styles.rmCard} ${CARD[it.status]}`}>
              <div>{it.title}</div>
              <i
                className={ICON[it.status]}
                style={{ color: ICON_COLOR[it.status], fontSize: 17 }}
              />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
