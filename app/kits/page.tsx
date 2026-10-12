import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import EditBestiePrice from "./EditBestiePrice";
import { PRICE_REGULAR, PRICE_SALE } from "../edit-bestie/sale";

const TITLE = "The Kits · The AI Bestie";
const DESCRIPTION =
  "One-afternoon builds for non-technical people. Build your personal brand with Claude, build your own AI assistant that lives in Telegram, or let Claude edit your reels. One-time, instant download.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/kits" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/kits",
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

export default function KitsPage() {
  return (
    <>
      <NavBar />
      <div className="wrap">
        <div className="intro" style={{ marginTop: 34 }}>
          <span className="free-badge">★ THE AI BESTIE KITS</span>
          <h1>Worth every cent</h1>
          <p>
            Each kit is a step-by-step guide plus a ready-made Claude skill.
            You follow the pictures, Claude does the technical work. No code.
          </p>
          <div className="learn-modes">
            <span className="lm">
              <i className="iconoir-flash" /> Instant download
            </span>
            <span className="lm">
              <i className="iconoir-credit-card" /> One-time, yours forever
            </span>
          </div>
        </div>

        <div className="section-label">
          <i className="iconoir-cart" /> The kits
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <a className="lesson-card" href="/edit-bestie" style={{ background: "#FFF6CC" }}>
            <div className="lc-left">
              <span className="lc-badge" style={{ background: "var(--ink)" }}>
                <i className="iconoir-video-camera" /> EDIT BESTIE · NEW
              </span>
              <h2>You Film. Claude Edits. You&nbsp;Post.</h2>
              <p>
                Edit Bestie turns your phone clips into a finished reel in your
                look. Best takes picked, ums cut, captions timed to your voice,
                sound effects in. You say &ldquo;edit my video&rdquo;. You get a&nbsp;reel.
              </p>
              <div className="lc-meta">
                <span>
                  <i className="iconoir-flash" /> Claude app skill + free Script Bestie + 85 sounds
                </span>
                <span>
                  <i className="iconoir-credit-card" />{" "}
                  <EditBestiePrice
                    sale={
                      <>
                        <s style={{ fontWeight: 700 }}>{PRICE_REGULAR}</s>&nbsp;{PRICE_SALE} · Bestie flash sale
                      </>
                    }
                  />
                </span>
              </div>
              <p style={{ fontSize: 13.5, fontWeight: 800, color: "var(--magenta)", marginTop: 10 }}>
                🍎 For Mac users only. Needs a Claude&nbsp;Pro&nbsp;plan.
              </p>
              <span className="lc-open">
                See how it works <i className="iconoir-arrow-right" />
              </span>
            </div>
            <div className="lc-art">
              <div className="cc-tile" style={{ background: "#CFF3FA", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/edit-bestie/sample_01-tile.jpg"
                  alt="A frame from a reel edited with Edit Bestie"
                  style={{ imageRendering: "auto", width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
          </a>

          <a className="lesson-card" href="/starter-kit">
            <div className="lc-left">
              <span className="lc-badge" style={{ background: "var(--magenta)" }}>
                <i className="iconoir-bookmark-book" /> STARTER KIT
              </span>
              <h2>Build Your Personal Brand With Claude</h2>
              <p>
                The personal-brand-builder skill interviews you, captures how
                YOU actually sound, then writes your brand system and your
                first 7 posts, in your voice, in one afternoon.
              </p>
              <div className="lc-meta">
                <span>
                  <i className="iconoir-flash" /> Guide + Claude skill
                </span>
                <span>
                  <i className="iconoir-credit-card" /> $9.90
                </span>
              </div>
              <span className="lc-open">
                See what&apos;s inside <i className="iconoir-arrow-right" />
              </span>
            </div>
            <div className="lc-art">
              <div className="cc-tile">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/wendy-front.png" alt="" style={{ imageRendering: "auto" }} />
              </div>
            </div>
          </a>

          <a className="lesson-card" href="/assistant-kit" style={{ background: "#FFEAF4" }}>
            <div className="lc-left">
              <span className="lc-badge" style={{ background: "var(--green)" }}>
                <i className="iconoir-sparks" /> ASSISTANT KIT
              </span>
              <h2>Build Your Own AI Assistant</h2>
              <p>
                Your own assistant, living in Telegram. You name her, pick her
                personality, and Claude builds her for you. She remembers
                everything, files your receipts, and texts you a morning
                affirmation written from YOUR wildest dreams.
              </p>
              <div className="lc-meta">
                <span>
                  <i className="iconoir-flash" /> Guide + assistant-builder skill
                </span>
                <span>
                  <i className="iconoir-credit-card" /> $9.90
                </span>
              </div>
              <p style={{ fontSize: 13.5, fontWeight: 800, color: "var(--magenta)", marginTop: 10 }}>
                🍎 For Mac users only. Written and tested on Mac.
              </p>
              <span className="lc-open">
                See what&apos;s inside <i className="iconoir-arrow-right" />
              </span>
            </div>
            <div className="lc-art">
              <div className="cc-tile" style={{ background: "#EFE1FA" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/ava-checklist.png" alt="" style={{ imageRendering: "auto", width: "100%", height: "100%", objectFit: "cover", borderRadius: 26 }} />
              </div>
            </div>
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
