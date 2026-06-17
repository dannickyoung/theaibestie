type Meta = { icon: string; label: string };

export default function LessonCard({
  badge,
  title,
  desc,
  href,
  art,
  pixel = true,
  meta,
}: {
  badge: string;
  title: string;
  desc: string;
  href: string;
  art: string;
  pixel?: boolean;
  meta: Meta[];
}) {
  return (
    <a className="lesson-card" href={href}>
      <div className="lc-left">
        <span className="lc-badge">
          <i className="iconoir-bookmark-book" /> {badge}
        </span>
        <h2>{title}</h2>
        <p>{desc}</p>
        <div className="lc-meta">
          {meta.map((m) => (
            <span key={m.label}>
              <i className={m.icon} /> {m.label}
            </span>
          ))}
        </div>
        <span className="lc-open">
          Open the lesson <i className="iconoir-arrow-right" />
        </span>
      </div>
      <div className="lc-art">
        <div className="cc-tile">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={art} alt="" style={pixel ? undefined : { imageRendering: "auto" }} />
        </div>
      </div>
    </a>
  );
}
