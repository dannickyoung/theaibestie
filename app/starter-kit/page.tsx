import type { Metadata } from "next";
import NavBar from "@/components/NavBar";

const TITLE = "The Starter Kit · The AI Bestie";
const DESCRIPTION =
  "Build your personal brand with Claude in one afternoon. A step-by-step guide plus the personal-brand-builder skill: your voice captured, your brand system, and your first 7 posts. $9.90, instant download.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/starter-kit" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/starter-kit",
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
    icon: "iconoir-heart",
    title: "brand-foundation.md",
    desc: "Who you are, who you help, and your story, written down at last.",
  },
  {
    icon: "iconoir-microphone",
    title: "voice-profile.md",
    desc: "How YOU actually sound, turned into rules any AI can follow.",
  },
  {
    icon: "iconoir-edit-pencil",
    title: "brand-system.md",
    desc: "Your content pillars, positioning line, and two ready bios.",
  },
  {
    icon: "iconoir-send",
    title: "first-7-posts.md",
    desc: "Seven posts ready to publish, in your voice, hooks included.",
  },
  {
    icon: "iconoir-sparks",
    title: "The skill, installed",
    desc: "The personal-brand-builder lives in your Claude. Run it again anytime.",
  },
  {
    icon: "iconoir-gift",
    title: "3 bonus prompts",
    desc: "A brand interview, a 30-day content plan, and an honest brand audit.",
  },
];

const BOX = [
  {
    n: 1,
    title: "The step-by-step guide",
    desc: "Follow the pictures. Click. Done. From “what is Claude?” to your first skill running, with fixes for every snag.",
  },
  {
    n: 2,
    title: "The personal-brand-builder skill",
    desc: "It interviews you like a brand strategist, captures your voice from your real writing, then builds everything around it.",
  },
  {
    n: 3,
    title: "Bonus prompts to keep",
    desc: "Three copy-paste prompts for the day after: discover your niche, plan 30 days of content, audit your profile honestly.",
  },
];

export default function StarterKitPage() {
  return (
    <>
      <NavBar />
      <div className="wrap">
        <div className="lesson-card" style={{ marginTop: 34, cursor: "default" }}>
          <div className="lc-left">
            <span className="lc-badge" style={{ background: "var(--magenta)" }}>
              <i className="iconoir-bookmark-book" /> STARTER KIT
            </span>
            <h2>Build Your Personal Brand With Claude</h2>
            <p>
              The step-by-step guide + the personal-brand-builder Claude skill.
              It interviews you, captures how YOU actually sound, then writes
              your brand system and your first 7 posts, in your voice, in one
              afternoon. No code.
            </p>
            <div className="lc-meta">
              <span>
                <i className="iconoir-flash" /> Guide + Claude skill, instant delivery
              </span>
              <span>
                <i className="iconoir-credit-card" /> $9.90 · one-time, yours forever
              </span>
            </div>
            <a className="lc-open" href="/api/checkout">
              Get the Starter Kit · $9.90 <i className="iconoir-arrow-right" />
            </a>
            <p style={{ fontSize: 13, color: "#6b7178", marginTop: 12, maxWidth: "none", textWrap: "balance" }}>
              All sales are final. But if you can&apos;t get it set up, DM us <strong>STUCK</strong> and we&apos;ll personally walk you through it until it works.
            </p>
          </div>
          <div className="lc-art">
            <div className="cc-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/wendy-front.png" alt="" style={{ imageRendering: "auto" }} />
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
            <i className="iconoir-laptop" /> A computer, Mac or Windows
          </span>
          <span className="lm">
            <i className="iconoir-chat-bubble" /> Claude Pro or higher (about US$20/month, paid to
            Claude, not us)
          </span>
          <span className="lm">
            <i className="iconoir-clock" /> One afternoon
          </span>
        </div>

        <div className="cta-card" style={{ marginTop: 40 }}>
          <div className="cta-grid" />
          <h2>Your brand and your first 7 posts, done today.</h2>
          <a className="btn" href="/api/checkout">
            Get the Starter Kit · $9.90 <i className="iconoir-arrow-right" />
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
