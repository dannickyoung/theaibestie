import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import NavBar from "@/components/NavBar";
import Reveal from "@/components/Reveal";
import { BuyButton, PriceText, SaleStrip } from "./Pricing";
import SampleReel from "./SampleReel";
import Hero from "./Hero";
import { isOnSale } from "./sale";
import "./edit-bestie.css";

// Re-render at most once a minute so the server-side price flips soon after the
// sale deadline; the client components then correct to the exact second.
export const revalidate = 60;

const serif = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["500", "700"],
  style: ["normal", "italic"],
  variable: "--eb-serif",
  display: "swap",
});

const TITLE = "Edit Bestie · The AI Bestie";
const DESCRIPTION =
  "You film. Claude edits. You post. Edit Bestie turns your phone clips into a finished reel in your look: best takes picked, ums cut, captions timed to your voice, sound effects in. Mac only, needs Claude Pro.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/edit-bestie" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/edit-bestie",
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

function BtnArrow() {
  return (
    <svg className="btn-arrow" viewBox="0 0 48 28" fill="none" aria-hidden="true">
      <path d="M2 15 C 16 16.5, 30 16.8, 47 17" />
      <path d="M26 1 C 33 5, 41 10.5, 47 17" />
      <path d="M47 17 C 40 20, 32 23, 24 25.5" />
    </svg>
  );
}

const STEPS = [
  { t: "Film.", d: "On your phone. Say your lines as many times as you want." },
  { t: "Drop it in.", d: "AirDrop the clips into one folder." },
  { t: "Say it in plain words.", d: "\"Edit my reel.\" \"Make it calm.\" \"Bold for the hook.\"" },
  {
    t: "Claude edits.",
    d: "It picks your best take of every line, cuts the pauses, puts your words on screen on the beat you said them, drops in soft clicks and pops, an emoji where you made the joke, a snap zoom on the punch, and puts one big word behind your head. Then it makes you a cover.",
  },
  {
    t: "Watch. Give notes.",
    d: "\"Captions bigger.\" \"Cut the pause before the ask.\" Claude builds a new version. Keeps the old one. Want to tweak it yourself? \"Give me the CapCut version.\" Every layer is still yours.",
  },
  { t: "Post.", d: "A finished 1080x1920 video. No other app needed." },
];

const LOOKS = [
  { key: "girl", t: "Cool girl.", d: "Soft and warm. Calm lowercase words, one yellow line with sparkles." },
  { key: "bold", t: "Bold.", d: "Words pop on every beat. One big word behind your head." },
  { key: "dude", t: "Cool dude.", d: "Dark and cinematic. Tiny caps, big serif words rising." },
  {
    key: "mix",
    t: "Mix them.",
    d: "Bold hook, cool girl body. Or say a look inside your script and it switches right there.",
  },
];

const GET = [
  { icon: "iconoir-folder", d: "The Edit Bestie skill for Claude Code (a folder you open once)" },
  { icon: "iconoir-palette", d: "The three looks, plus mixing" },
  { icon: "iconoir-sparks", d: "Emoji pops, snap zooms, push-ins, freeze frames and shakes, placed on the beat" },
  { icon: "iconoir-media-image", d: "A cover image for every reel" },
  {
    icon: "iconoir-music-double-note",
    d: "Our own sound kit: 34 clicks, pops, whooshes and payoffs we made, safe to use on any post, even paid ads",
  },
  { icon: "iconoir-book", d: "The handbook: install, the menu of things to say, stuck list. Short, with pictures." },
  { icon: "iconoir-video-camera", d: "The filming guide: 8 things that make the edit look expensive" },
  {
    icon: "iconoir-design-pencil",
    d: "CapCut export: say \"give me the CapCut version\" and every clip, caption and sound lands on its own layer in CapCut",
  },
  {
    icon: "iconoir-refresh-double",
    d: "Free updates. Your purchase page always has the latest version; tell Claude \"update edit bestie\" and it swaps it in.",
  },
];

const FOR = [
  "Creators who film talking to camera and hate editing",
  "UGC creators with 10 videos due this week",
  "Coaches, founders and small business owners who talk to their audience on reels",
  "Anyone who has clips sitting on their phone because \"I'll edit them later\"",
];

const NOT_FOR = [
  "You want someone else to film and write for you (this edits what you filmed)",
  "You edit for the love of it. Keep going, we respect that.",
  "You're on Windows or iPad (Mac only, for now)",
  "You're not ready for a Claude Pro plan (about $20 a month, paid to Claude)",
];

const FAQ = [
  {
    q: "I'm not techy.",
    a: "Neither is Wendy. You paste \"set up edit bestie\" and say yes a few times. Claude does the rest.",
  },
  { q: "Will it look like me?", a: "It's your face, your words, your look. Claude edits, you direct." },
  {
    q: "Do I need CapCut?",
    a: "No. You get a finished video. Like to tweak? Say \"give me the CapCut version\" and you get a CapCut project with every clip, caption and sound on its own layer.",
  },
  { q: "How many reels?", a: "No cap from us. Your Claude plan has daily usage; short reels use little." },
  {
    q: "Other languages?",
    a: "Yes. English out of the box; say your language and Claude fetches the bigger speech model once. Add your names to the \"spell right\" list.",
  },
  { q: "Music?", a: "We add sound effects. Add the trending sound in Instagram when you post." },
  { q: "Windows?", a: "Not yet. Buyers get it free when it ships." },
  {
    q: "Refunds?",
    a: "If it won't run on your Mac within 7 days and we can't fix it together, full refund. No refunds for change of mind. Digital product, we say it up front.",
  },
];

/** Tiny 9:16 caption mock for each look. Decorative. */
function LookMock({ look }: { look: string }) {
  return (
    <div className={`eb-mock eb-mock-${look}`} aria-hidden="true">
      {look === "bold" && <span className="eb-mock-behind">POP</span>}
      {look === "mix" && <span className="eb-mock-behind">HOOK</span>}
      <span className="eb-mock-head" />
      <span className="eb-mock-body" />
      {look === "girl" && (
        <span className="eb-mock-cap">
          calm words
          <span className="eb-mock-line">
            <i>✦</i>
            <b />
            <i>✦</i>
          </span>
        </span>
      )}
      {look === "bold" && <span className="eb-mock-cap">every beat</span>}
      {look === "dude" && (
        <span className="eb-mock-cap">
          <small>TINY CAPS</small>
          <em>rising</em>
        </span>
      )}
      {look === "mix" && (
        <span className="eb-mock-cap">
          body
          <span className="eb-mock-line">
            <i>✦</i>
            <b />
            <i>✦</i>
          </span>
        </span>
      )}
    </div>
  );
}

function Sprockets({ pos }: { pos: "top" | "bottom" }) {
  return <div className={`eb-sprockets eb-sprockets-${pos}`} aria-hidden="true" />;
}

export default function EditBestiePage() {
  const ssrOnSale = isOnSale(Date.now());

  return (
    <>
      <NavBar />

      <main className={`lp eb ${serif.variable}`}>
        <Hero ssrOnSale={ssrOnSale} />

        <div className="lp-container eb-body">
          {/* ---------- sample reel ---------- */}
          <section className="eb-watch" aria-labelledby="eb-watch-title">
            <div className="eb-watch-reel">
              <SampleReel />
            </div>
            <div className="eb-watch-copy">
              <span className="eb-kicker">
                <span className="eb-rec" aria-hidden="true" /> SAMPLE REEL
              </span>
              <h2 id="eb-watch-title">Watch Claude&apos;s edit</h2>
              <p className="eb-watch-text">
                Best takes picked, ums cut, captions timed to your voice, sound effects in. You say &quot;edit my
                reel&quot;. You get a&nbsp;video.
              </p>
              <p className="eb-annot">
                <svg className="eb-annot-arrow" viewBox="0 0 120 106" aria-hidden="true">
                  <path d="M103 15 C 100 30, 99 33, 96 38 C 90 47, 74 47, 71 40 C 68 33, 80 33, 84 42 C 89 54, 88 58, 80 64 C 70 76, 50 82, 36 76 C 33 75, 30 72, 27 68" />
                  <path d="M27 68 l 16 -3" />
                  <path d="M27 68 l 8 12" />
                </svg>
                Built by a UGC agency founder who edited all day, every&nbsp;day.{" "}
                <span className="eb-annot-punch">Now she doesn&apos;t.</span>
              </p>
            </div>
          </section>
          {/* ---------- the problem ---------- */}
          <Reveal className="eb-paper eb-paper-white eb-problem">
            <span className="eb-scribble">sound familiar?</span>
            <p>
              You can film in the little pockets of your day.{" "}
              <span className="eb-hl">Editing is what kills it.</span> Finding the one good take. Cutting every{" "}
              <s className="eb-um">um</s>. Captions, one word at a time. Three hours for a 30 second video. So the
              clips sit on your&nbsp;phone.
            </p>
          </Reveal>

          {/* ---------- how it works ---------- */}
          <section id="how" className="eb-section">
            <div className="eb-head">
              <h2>How it works</h2>
            </div>

            <div className="eb-timeline" aria-hidden="true">
              <div className="eb-ruler" />
              <div className="eb-track">
                {STEPS.map((s, i) => (
                  <span key={s.t} className={`eb-seg eb-seg-${i + 1}`}>
                    {i + 1}
                  </span>
                ))}
              </div>
              <span className="eb-playhead" />
            </div>

            <ol className="eb-steps">
              {STEPS.map((s, i) => (
                <li key={s.t} className="eb-step">
                  <span className="eb-step-tc">STEP {i + 1}</span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* ---------- pick your look ---------- */}
          <section className="eb-section">
            <div className="eb-head">
              <h2>Pick your look</h2>
            </div>
            <div className="eb-looks">
              {LOOKS.map((l) => (
                <div key={l.key} className={`eb-look eb-look-${l.key}`}>
                  <LookMock look={l.key} />
                  <div className="eb-look-text">
                    <h3>{l.t}</h3>
                    <p>{l.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="eb-remember">
              Your colour. Your name spelled right. Your sign-off. Claude remembers your style, so reel two is
              faster than reel one.
            </p>
          </section>

          {/* ---------- what you get ---------- */}
          <section className="eb-section">
            <div className="eb-head">
              <h2>What you get</h2>
            </div>
            <Reveal className="eb-paper eb-paper-kraft eb-bin">
              <ul>
                {GET.map((g) => (
                  <li key={g.d}>
                    <span className="eb-chip">
                      <i className={g.icon} aria-hidden="true" />
                    </span>
                    <span>{g.d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* ---------- who it's for / not for ---------- */}
          <section className="eb-section eb-who">
            <Reveal className="eb-paper eb-paper-mint eb-who-card">
              <h2>Who it&apos;s for</h2>
              <ul>
                {FOR.map((f) => (
                  <li key={f}>
                    <i className="iconoir-check" aria-hidden="true" /> <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="eb-paper eb-paper-pink eb-who-card" delay={80}>
              <h2>Who it&apos;s not for</h2>
              <ul>
                {NOT_FOR.map((f) => (
                  <li key={f}>
                    <i className="iconoir-xmark" aria-hidden="true" /> <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* ---------- the honest part + why the price ---------- */}
          <section className="eb-section eb-honest-row">
            <Reveal className="eb-paper eb-paper-yellow eb-honest">
              <h2>The honest part</h2>
              <p>
                You need Claude Pro (about $20 a month, paid to Claude, not to us). You need a Mac with an Apple
                chip (2020 or later; older Intel Macs work, slower). About 5 GB of free space. The first setup takes
                20 minutes, mostly waiting. After that, you type two words.
              </p>
              <div className="eb-pills">
                <span>
                  <i className="iconoir-chat-bubble" aria-hidden="true" /> Claude Pro
                </span>
                <span>
                  <i className="iconoir-apple-mac" aria-hidden="true" /> Mac only
                </span>
                <span>
                  <i className="iconoir-hard-drive" aria-hidden="true" /> 5 GB free
                </span>
                <span>
                  <i className="iconoir-clock" aria-hidden="true" /> 20 min setup
                </span>
              </div>
            </Reveal>
            <Reveal className="eb-paper eb-paper-white eb-why" delay={80}>
              <h2>
                Why <PriceText ssrOnSale={ssrOnSale} />
              </h2>
              <p>
                A freelance editor charges $50 to $200 per reel. This is one payment, for every reel you make from
                now on.
              </p>
            </Reveal>
          </section>

          {/* ---------- faq ---------- */}
          <section className="eb-section">
            <div className="eb-head">
              <h2>FAQ</h2>
            </div>
            <div className="eb-paper eb-paper-white eb-faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>
                    <span>{f.q}</span>
                    <i className="iconoir-plus" aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          {/* ---------- close ---------- */}
          <Reveal className="eb-film eb-close">
            <Sprockets pos="top" />
            <div className="eb-close-inner">
              <h2>
                Stop editing your <span className="eb-hl">own videos.</span>
              </h2>
              <SaleStrip ssrOnSale={ssrOnSale} inline />
              <BuyButton ssrOnSale={ssrOnSale}>
                <BtnArrow />
              </BuyButton>
              <p className="eb-dm">
                Questions? DM <strong>EDIT</strong> to{" "}
                <a href="https://instagram.com/the.ai.bestie">@the.ai.bestie</a>.
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="eb-close-face"
              src="/edit-bestie/wendy-wink-close.webp"
              width={312}
              height={390}
              loading="lazy"
              decoding="async"
              alt=""
              aria-hidden="true"
            />
            <Sprockets pos="bottom" />
          </Reveal>

          <footer>
            <span>Edit Bestie is sold by The AI Bestie.</span>
            <a className="ig" href="https://instagram.com/the.ai.bestie">
              <i className="iconoir-instagram" aria-hidden="true" /> @the.ai.bestie
            </a>
          </footer>
        </div>
      </main>
    </>
  );
}
