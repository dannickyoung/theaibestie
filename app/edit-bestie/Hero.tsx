/* eslint-disable @next/next/no-img-element */
import { BuyButton, PriceTag, SaleStrip } from "./Pricing";
import "./hero.css";

function BtnArrow() {
  return (
    <svg className="btn-arrow" viewBox="0 0 48 28" fill="none" aria-hidden="true">
      <path d="M2 15 C 16 16.5, 30 16.8, 47 17" />
      <path d="M26 1 C 33 5, 41 10.5, 47 17" />
      <path d="M47 17 C 40 20, 32 23, 24 25.5" />
    </svg>
  );
}

/** Eggshell film edge: sprocket holes plus faint edge printing, like real stock. */
function FilmEdge({ pos }: { pos: "top" | "bottom" }) {
  return (
    <div className={`ebh-edge ebh-edge-${pos}`} aria-hidden="true">
      <span>EDIT BESTIE 400 ▸ 12</span>
      <span>EDIT BESTIE 400 ▸ 13</span>
      <span>EDIT BESTIE 400 ▸ 14</span>
    </div>
  );
}

const HANDLES = ["tl", "tm", "tr", "ml", "mr", "bl", "bm", "br"];

/**
 * One die-cut Wendy head, selected like a layer in a video editor: bounding box with transform handles,
 * a rotation handle, snapping guides, a cursor mid-drag, a layer tag, and a mini timeline underneath.
 * Decorative only.
 */
function EditorArt() {
  return (
    <div className="ebh-art rise" style={{ animationDelay: "200ms" }} aria-hidden="true">
      <div className="ebh-stage">
        <span className="ebh-guide ebh-guide-v" />
        <span className="ebh-guide ebh-guide-h" />
        <div className="ebh-sel">
          <img className="ebh-face" src="/edit-bestie/wendy-wink-hero.webp" width={609} height={760} alt="" />
          <svg className="ebh-box" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0.6 0.9 L 50 0.2 L 99.4 0.8 L 99.8 50 L 99.2 99.3 L 50 99.8 L 0.4 99.1 L 0.1 50 Z" />
          </svg>
          <span className="ebh-rot">
            <i />
          </span>
          {HANDLES.map((h) => (
            <span key={h} className={`ebh-h ebh-h-${h}`} />
          ))}
          <span className="ebh-tag">wendy.png</span>
          <span className="ebh-cursor">
            <svg viewBox="0 0 24 30">
              <path d="M2.5 2.2 L 3.2 24.5 L 9 18.6 L 13.4 28 L 17.6 26 L 13.2 16.8 L 21.4 16.4 Z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="ebh-tl">
        <div className="ebh-ruler" />
        <div className="ebh-track">
          <span className="ebh-clip ebh-clip-1">edit my reel</span>
          <span className="ebh-clip ebh-clip-2" />
          <span className="ebh-key ebh-key-1" />
          <span className="ebh-key ebh-key-2" />
          <span className="ebh-key ebh-key-3" />
        </div>
        <span className="ebh-playhead" />
      </div>
    </div>
  );
}

/** Hero: eggshell film band with the selected Wendy layer, then the straight countdown strip right below it. */
export default function Hero({ ssrOnSale }: { ssrOnSale: boolean }) {
  return (
    <>
    <section className="ebh">
      <FilmEdge pos="top" />
      <div className="lp-container ebh-inner">
        <div className="ebh-copy">
          <h1 className="ebh-h1 rise" style={{ animationDelay: "60ms" }}>
            <span className="ebh-line">You film.</span>{" "}
            <span className="ebh-line">
              <span className="ebh-mark">Claude&nbsp;edits.</span>
            </span>{" "}
            <span className="ebh-line">You post.</span>
          </h1>
          <p className="ebh-sub rise" style={{ animationDelay: "140ms" }}>
            Edit Bestie turns your phone clips into a finished reel in your&nbsp;look.
          </p>
          <div className="ebh-buy rise" style={{ animationDelay: "220ms" }}>
            <PriceTag ssrOnSale={ssrOnSale} />
            <BuyButton ssrOnSale={ssrOnSale}>
              <BtnArrow />
            </BuyButton>
            <p className="eb-musts">
              <span>
                <i className="iconoir-apple-mac" aria-hidden="true" /> Mac only
              </span>
              <span>
                <i className="iconoir-chat-bubble" aria-hidden="true" /> needs Claude&nbsp;Pro
              </span>
            </p>
          </div>
        </div>
        <EditorArt />
      </div>
      <FilmEdge pos="bottom" />
    </section>
    <SaleStrip ssrOnSale={ssrOnSale} />
    </>
  );
}
