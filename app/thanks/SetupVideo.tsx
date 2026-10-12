/** Edit Bestie's 90-second setup video: starts by itself (muted, as browsers require); the controls turn sound on. */
export default function SetupVideo() {
  return (
    <div className="thanks-video">
      <video
        src="/edit-bestie/setup.mp4"
        poster="/edit-bestie/setup-poster.jpg"
        autoPlay
        muted
        playsInline
        controls
        aria-label="Edit Bestie setup video: every setup click in 90 seconds"
      />
    </div>
  );
}
