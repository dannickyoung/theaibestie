import type { Metadata } from "next";
import { Bodoni_Moda } from "next/font/google";
import NavBar from "@/components/NavBar";
import Reveal from "@/components/Reveal";
import { BuyButton, PriceText, SaleStrip } from "./Pricing";
import SampleReel from "./SampleReel";
import FaqVideo from "./FaqVideo";
import Hero from "./Hero";
import { SETUP_HELP, isOnSale } from "./sale";
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
  { t: "Say \"create a new script\".", d: "Free Script Bestie writes it in your voice." },
  { t: "Film it.", d: "Talking videos go in the VO folder, shots in the B-roll folder." },
  {
    t: "Say \"edit my video\".",
    d: "Claude picks your best takes, cuts the ums, adds your B-roll and hands you the reel with the caption copied.",
  },
];

const REELS = [
  { src: "/edit-bestie/reel-matcha.mp4", poster: "/edit-bestie/reel-matcha-poster.jpg", cap: "Matcha · bold hook" },
  { src: "/edit-bestie/reel-sneakers.mp4", poster: "/edit-bestie/reel-sneakers-poster.jpg", cap: "Sneakers · bold hook, cool girl" },
  { src: "/edit-bestie/reel-car.mp4", poster: "/edit-bestie/reel-car-poster.jpg", cap: "Car · cool dude, B-roll" },
];

const LOOKS = [
  { key: "girl", t: "Cool girl.", d: "Soft and warm. Calm lowercase words, one yellow line with sparkles." },
  { key: "bold", t: "Bold.", d: "Words pop on every beat. One big word behind your head." },
  { key: "dude", t: "Cool dude.", d: "Dark and cinematic. Tiny caps, big serif words rising." },
  {
    key: "mix",
    t: "Mix them, or make your\u00a0own.",
    d: "Bold hook, cool girl body. Or show Claude a reel you love and it builds a look from it.",
  },
];

const GET = [
  { icon: "iconoir-folder", d: "The Edit Bestie skill for the Claude app (a folder you open once)" },
  { icon: "iconoir-page-edit", d: "Script Bestie included (free)" },
  { icon: "iconoir-palette", d: "The three looks, plus mixing" },
  { icon: "iconoir-media-video-list", d: "B-roll cut in over the right line" },
  { icon: "iconoir-emoji", d: "Moving emoji that bounce, wiggle and burst, plus hand-drawn arrows, circles and underlines" },
  { icon: "iconoir-multi-window", d: "Floating mini screens, shrink to card, split screen" },
  { icon: "iconoir-camera", d: "Camera moves: follow cam, whip pan, speed ramp" },
  { icon: "iconoir-label", d: "Label tags and highlights" },
  { icon: "iconoir-media-image-list", d: "3 covers to choose from" },
  { icon: "iconoir-cursor-pointer", d: "The review panel inside the Claude app: tap to trash a line, fix a word, move a shot" },
  { icon: "iconoir-design-pencil", d: "A CapCut version with every layer" },
  {
    icon: "iconoir-music-double-note",
    d: "Our own sound kit: 85 clicks, pops, whooshes and payoffs we made, safe to use on any post, even paid ads",
  },
  { icon: "iconoir-language", d: "Works in other languages (Chinese, Thai and more)" },
  { icon: "iconoir-play", d: "A 90-second setup video that shows every click" },
  { icon: "iconoir-video-camera", d: "The filming guide: 8 things that make the edit look expensive" },
  { icon: "iconoir-refresh-double", d: "Free updates. Your purchase page always has the latest version." },
];

const WHY = [
  { icon: "iconoir-chat-bubble", t: "No terminal, no coding, ever.", d: "It runs in the Claude app with plain words." },
  { icon: "iconoir-lock", t: "Your footage stays in two folders.", d: "Claude touches nothing else on your Mac or phone." },
  { icon: "iconoir-globe", t: "Made for creators in Asia.", d: "Films in your language, captions in Chinese, Thai and more." },
];

const FOR = [
  "Creators who film talking to camera and hate editing",
  "UGC creators with 10 videos due this week",
  "Coaches, founders and small business owners who talk to their audience on reels",
  "Anyone who has clips sitting on their phone because \"I'll edit them later\"",
];

const NOT_FOR = [
  "You want someone else to film for you (this edits what you filmed)",
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
    video: { src: "/edit-bestie/capcut-layers.mp4", poster: "/edit-bestie/capcut-layers-poster.jpg", label: "A CapCut project from Edit Bestie: every caption, B-roll shot, clip and sound on its own layer" },
  },
  { q: "How many reels?", a: "No cap from us. Your Claude plan has daily usage; short reels use little." },
  { q: "Can I film in Chinese, Thai or another language?", a: "Yes. Tell Claude your language at setup." },
  {
    q: "Does it touch anything else on my Mac or phone?",
    a: "No. Only what you put in your video's VO and B-roll folders.",
  },
  { q: "Do you see my videos?", a: "No. They're edited on your own Mac and never uploaded to us." },
  { q: "Music?", a: "We add sound effects. Add the trending sound in Instagram when you post." },
  { q: "Windows?", a: "Not yet. Buyers get it free when it ships." },
  {
    q: "What if I get stuck?",
    a: "Tell Claude \"fix it\", or DM STUCK to @the.ai.bestie and we'll get you running.",
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
              <SampleReel
                src="/edit-bestie/sample_01.mp4"
                poster="/edit-bestie/sample_01-poster.jpg"
                label="Sample reel edited with Edit Bestie, with captions on screen"
              />
            </div>
            <div className="eb-watch-copy">
              <span className="eb-kicker">
                <span className="eb-rec" aria-hidden="true" /> SAMPLE REEL
              </span>
              <h2 id="eb-watch-title">Watch Claude&apos;s edit</h2>
              <p className="eb-watch-text">
                Best takes picked, ums cut, captions timed to your voice, sound effects in. You say &quot;edit my
                video&quot;. You get a&nbsp;reel.
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
          {/* ---------- more sample reels ---------- */}
          <section className="eb-reels" aria-label="More sample reels">
            {REELS.map((r) => (
              <figure key={r.src} className="eb-reel">
                <SampleReel className="eb-reel-phone" src={r.src} poster={r.poster} label={`Sample reel: ${r.cap}`} />
                <figcaption>{r.cap}</figcaption>
              </figure>
            ))}
          </section>

          {/* ---------- before and after ---------- */}
          <section className="eb-watch eb-watch-flip" aria-labelledby="eb-ba-title">
            <div className="eb-watch-reel">
              <SampleReel
                src="/edit-bestie/before-after.mp4"
                poster="/edit-bestie/before-after-poster.jpg"
                label="Before and after: Wendy's raw takes, then the finished reel"
              />
            </div>
            <div className="eb-watch-copy">
              <span className="eb-kicker">BEFORE AND AFTER</span>
              <h2 id="eb-ba-title">12 minutes of raw takes. One 51-second&nbsp;reel.</h2>
              <p className="eb-watch-text">
                Wendy&apos;s raw takes went in. This is the reel Claude handed&nbsp;back.
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
            <p className="eb-skip">
              Already filmed? Skip the script. Drop your takes in VO and say &quot;I have new&nbsp;footage&quot;.
            </p>
            <a className="btn btn-ghost eb-how-btn" href="/edit-bestie/how-it-works">
              See how it works <i className="iconoir-arrow-right" aria-hidden="true" />
            </a>
          </section>

          {/* ---------- pick your look ---------- */}
          <section className="eb-section">
            <div className="eb-head">
              <h2>Pick your look</h2>
            </div>
            <div className="eb-looks-row">
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
              <SampleReel
                className="eb-looks-phone"
                src="/edit-bestie/looks-preview.mp4"
                poster="/edit-bestie/looks-preview-poster.jpg"
                label="Looks preview: cool girl, bold, cool dude and a mix"
              />
            </div>
            <p className="eb-remember">
              Your colour. Your name spelled right. Your sign-off. Claude remembers your style, so reel two is
              faster than reel one.
            </p>
          </section>

          {/* ---------- everything it can do ---------- */}
          <section className="eb-watch eb-watch-flip" aria-labelledby="eb-all-title">
            <div className="eb-watch-reel">
              <SampleReel
                src="/edit-bestie/showcase.mp4"
                poster="/edit-bestie/showcase-poster.jpg"
                label="Everything Edit Bestie can do: every look and effect"
              />
            </div>
            <div className="eb-watch-copy">
              <span className="eb-kicker">EVERYTHING IT CAN DO</span>
              <h2 id="eb-all-title">Every look. Every&nbsp;effect.</h2>
              <p className="eb-watch-text">
                26 effects, 8 caption styles, 85 sound effects and 3 covers per reel. You say what you want in plain
                words. Claude puts it on the&nbsp;beat.
              </p>
            </div>
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

          {/* ---------- why us ---------- */}
          <section className="eb-section">
            <div className="eb-head">
              <h2>Why Edit Bestie</h2>
            </div>
            <div className="eb-why-us">
              {WHY.map((w, i) => (
                <Reveal key={w.t} className={`eb-paper ${["eb-paper-mint", "eb-paper-yellow", "eb-paper-pink"][i]} eb-why-card`} delay={i * 80}>
                  <span className="eb-chip">
                    <i className={w.icon} aria-hidden="true" />
                  </span>
                  <h3>{w.t}</h3>
                  <p>{w.d}</p>
                </Reveal>
              ))}
            </div>
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
                chip (2020 or later; older Intel Macs work, slower). About 3 GB of free space. The first setup takes
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
                  <i className="iconoir-hard-drive" aria-hidden="true" /> 3 GB free
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
                  {"video" in f && f.video && <FaqVideo {...f.video} />}
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
              <BuyButton>
                <BtnArrow />
              </BuyButton>
              <p className="eb-close-setup-help">{SETUP_HELP}</p>
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
