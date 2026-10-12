import type { Metadata } from "next";
import NavBar from "@/components/NavBar";
import SetupVideo from "./SetupVideo";

export const metadata: Metadata = {
  title: "Thank you! | The AI Bestie",
  description: "Your purchase is confirmed.",
  robots: { index: false },
};

export default async function ThanksPage({ searchParams }: { searchParams: Promise<{ kit?: string }> }) {
  const { kit } = await searchParams;
  if (kit === "edit") return <EditBestieThanks />;
  return (
    <>
      <NavBar />
      <div className="wrap" style={{ textAlign: "center" }}>
        <div className="intro" style={{ marginTop: 90, marginLeft: "auto", marginRight: "auto" }}>
          <span className="free-badge">★ ORDER CONFIRMED</span>
          <h1>
            Thank <span className="hl">you!</span>
          </h1>
          <p style={{ marginLeft: "auto", marginRight: "auto" }}>
            Your kit is on its way to your inbox right now. Go grab it!
          </p>
          <p style={{ marginTop: 12, marginLeft: "auto", marginRight: "auto" }}>
            Nothing after a few minutes? Check spam, or DM @the.ai.bestie.
          </p>
        </div>
        <div className="hero-cta" style={{ justifyContent: "center" }}>
          <a className="btn btn-primary" href="/lessons">
            <i className="iconoir-bookmark-book" /> Back to the lessons
          </a>
          <a className="btn btn-ghost" href="https://instagram.com/the.ai.bestie">
            <i className="iconoir-instagram" /> @the.ai.bestie
          </a>
        </div>
      </div>
    </>
  );
}

/** After an Edit Bestie purchase: the setup video plays by itself, right under the thank-you. */
function EditBestieThanks() {
  return (
    <>
      <NavBar />
      <div className="wrap" style={{ textAlign: "center" }}>
        <div className="intro" style={{ marginTop: 70, marginLeft: "auto", marginRight: "auto" }}>
          <span className="free-badge">★ ORDER CONFIRMED</span>
          <h1>
            Your editor is <span className="hl">hired.</span>
          </h1>
          <p style={{ marginLeft: "auto", marginRight: "auto" }}>
            Edit Bestie and Script Bestie are on their way to your&nbsp;inbox.
            <br />
            While you wait, watch this: every setup click in 90&nbsp;seconds.
          </p>
        </div>
        <SetupVideo />
        <p style={{ marginTop: 22, fontWeight: 700, color: "var(--soft, #555)" }}>
          Nothing in your inbox after a few minutes? Check spam, or DM @the.ai.bestie.
        </p>
        <div className="hero-cta" style={{ justifyContent: "center" }}>
          <a className="btn btn-ghost" href="https://instagram.com/the.ai.bestie">
            <i className="iconoir-instagram" /> @the.ai.bestie
          </a>
        </div>
      </div>
      <style>{`
        .thanks-video{ position:relative; width:min(340px, 86vw); margin:28px auto 0; }
        .thanks-video video{ display:block; width:100%; aspect-ratio:9/16; border-radius:28px; background:#000;
          border:8px solid #121014; box-shadow:0 18px 40px rgba(0,0,0,.25); }
      `}</style>
    </>
  );
}
