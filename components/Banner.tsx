export default function Banner() {
  return (
    <header className="hb-banner">
      <div className="hb-grid" />
      <div className="hb-kicker">THE AI BESTIE COURSE</div>
      <span className="hb-wm">
        <span className="l1">THE AI</span>
        <span className="l2">BESTIE</span>
      </span>
      <div className="hb-coursetab">AI&nbsp;COURSE</div>
      <div className="hb-tag">AI tutorials even your mom can understand</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="hb-face"
        src="/assets/wendy-cool.svg"
        alt="Wendy, your AI Bestie"
      />
    </header>
  );
}
