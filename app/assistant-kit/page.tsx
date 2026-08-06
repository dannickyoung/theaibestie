import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

const TITLE = "The Assistant Kit · The AI Bestie";
const DESCRIPTION =
  "Build your own AI assistant that lives in Telegram. You name her, Claude builds her: memory, receipts, and a daily affirmation written from your wildest dreams. $9.90, instant download.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/assistant-kit" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/assistant-kit",
    siteName: "The AI Bestie",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "The AI Bestie" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

const WALK_AWAY = [
  {
    icon: "iconoir-send-diagonal",
    title: "Your own AI assistant",
    desc: "Living in Telegram, working 24/7, even with your laptop closed.",
  },
  {
    icon: "iconoir-emoji",
    title: "A name and personality YOU chose",
    desc: "Warm cheerleader, chief of staff, funny best friend, or your own invention.",
  },
  {
    icon: "iconoir-brain",
    title: "Memory that sticks",
    desc: "Tell it once, it remembers forever. Ask anytime.",
  },
  {
    icon: "iconoir-receive-dollars",
    title: "Receipts, filed",
    desc: "Send a photo, it gets logged. So tax time is not a nightmare.",
  },
  {
    icon: "iconoir-sun-light",
    title: "A daily affirmation",
    desc: "Written fresh every morning from YOUR wildest dreams. Not generic quotes.",
  },
  {
    icon: "iconoir-mail",
    title: "Room to grow",
    desc: "Level 2 teaches it your Gmail and Calendar, with Claude guiding each step.",
  },
];

const BOX = [
  {
    n: 1,
    title: "The step-by-step guide",
    desc: "7 steps with a picture for every click. From “what is Claude?” to your assistant saying hi in Telegram.",
  },
  {
    n: 2,
    title: "The assistant-builder skill",
    desc: "Claude interviews you (the fun questions), takes 3 codes, and builds and switches on your assistant for you.",
  },
  {
    n: 3,
    title: "5 power prompts",
    desc: "The Bug Test, the Safety Check, the Detective and friends. Health-check, lock down, and fix your assistant by copy-paste.",
  },
];

export default function AssistantKitPage() {
  return (
    <>
      <NavBar />
      <div className="wrap">
        <div className="lesson-card" style={{ marginTop: 34, cursor: "default", background: "#FFEAF4" }}>
          <div className="lc-left">
            <span className="lc-badge" style={{ background: "var(--green)" }}>
              <i className="iconoir-sparks" /> ASSISTANT KIT · NEW
            </span>
            <h2>Build Your Own AI Assistant</h2>
            <p>
              Meet your new assistant. You get to name her. By tonight she
              lives in Telegram: she remembers everything you tell her, files
              your receipts, and texts you a morning affirmation written from
              YOUR wildest dreams. Claude builds her. You answer fun questions.
            </p>
            <div className="lc-meta">
              <span>
                <i className="iconoir-flash" /> Guide + assistant-builder skill, instant delivery
              </span>
              <span>
                <i className="iconoir-credit-card" /> $9.90 · one-time, yours forever
              </span>
            </div>
            <p style={{ fontSize: 13.5, fontWeight: 800, color: "var(--magenta)", marginTop: 10 }}>
              🍎 For Mac users only. Written and tested on Mac.
            </p>
            <a className="lc-open" href="/api/checkout?kit=assistant">
              Get the Assistant Kit · $9.90 <i className="iconoir-arrow-right" />
            </a>
            <p style={{ fontSize: 13, color: "#6b7178", marginTop: 12, maxWidth: "none", textWrap: "balance" }}>
              All sales are final. But if you can&apos;t get it set up, DM us <strong>STUCK</strong> and we&apos;ll personally walk you through it until it works.
            </p>
          </div>
          <div className="lc-art">
            <div className="cc-tile" style={{ background: "#EFE1FA" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/ava-checklist.png" alt="" style={{ imageRendering: "auto", width: "100%", height: "100%", objectFit: "cover", borderRadius: 26 }} />
            </div>
          </div>
        </div>

        <div className="section-label">
          <i className="iconoir-gift" /> What you walk away with
        </div>
        <div className="promise-row">
          {WALK_AWAY.slice(0, 3).map((w) => (
            <div className="promise-card" key={w.title}>
              <span className="hp-chip">
                <i className={w.icon} />
              </span>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>
        <div className="promise-row">
          {WALK_AWAY.slice(3).map((w) => (
            <div className="promise-card" key={w.title}>
              <span className="hp-chip">
                <i className={w.icon} />
              </span>
              <h3>{w.title}</h3>
              <p>{w.desc}</p>
            </div>
          ))}
        </div>

        <div className="section-label">
          <i className="iconoir-open-book" /> What&apos;s inside the kit
        </div>
        <div className="steps-row">
          {BOX.map((b) => (
            <div className="step-card" key={b.n}>
              <span className="step-num">{b.n}</span>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="section-label">
          <i className="iconoir-check-circle" /> What you need
        </div>
        <div className="learn-modes" style={{ marginTop: 4 }}>
          <span className="lm">
            <i className="iconoir-laptop" /> A Mac (this kit is written and tested on Mac only)
          </span>
          <span className="lm">
            <i className="iconoir-chat-bubble" /> Claude Pro or higher (about US$20/month, paid to
            Claude, not us)
          </span>
          <span className="lm">
            <i className="iconoir-key" /> A Claude API key (pay as you go, usually a few dollars a
            month, paid to Claude, not us)
          </span>
          <span className="lm">
            <i className="iconoir-send-diagonal" /> Telegram, free
          </span>
          <span className="lm">
            <i className="iconoir-clock" /> One afternoon
          </span>
        </div>
        <p style={{ fontSize: 13.5, color: "#6b7178", marginTop: 14, textWrap: "balance" }}>
          The honest part: both costs above are paid to Claude, not to us, and
          the guide shows you the spending-cap screen so there is never a
          surprise bill. Not ready for that? Grab our free lessons instead, no
          hard feelings.
        </p>

        <div className="cta-card" style={{ marginTop: 40 }}>
          <div className="cta-grid" />
          <h2>My assistant works while I sleep</h2>
          <a className="btn" href="/api/checkout?kit=assistant">
            Get the Assistant Kit · $9.90 <i className="iconoir-arrow-right" />
          </a>
        </div>

        <footer>
          <span>Questions? DM us anytime.</span>
          <a className="ig" href="https://instagram.com/the.ai.bestie">
            <i className="iconoir-instagram" /> @the.ai.bestie
          </a>
        </footer>
      </div>
    </>
  );
}
