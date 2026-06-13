export default function Banner() {
  return (
    <header className="banner">
      <div className="grid" />
      <div className="kicker">THE AI BESTIE COURSE</div>
      <span className="wordmark">
        <span className="l1">THE AI</span>
        <span className="l2">BESTIE</span>
      </span>
      <div className="coursetab">AI&nbsp;COURSE</div>
      <div className="tag">AI tutorials even your mom can understand</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="banner-face"
        src="/assets/wendy-cool.svg"
        alt="Wendy, your AI Bestie"
      />
    </header>
  );
}
