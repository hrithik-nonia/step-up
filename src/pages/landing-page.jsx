export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_0_-90%,#1f1f1f,black_100%)]"></div>
      {/* Glossy shine layer */}
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.08)_0%,transparent_40%,transparent_60%,rgba(255,255,255,0.05)_100%)]"></div>
      <div className="">
        <div>logo0</div>
        <div>links</div>
        <div>cart</div>
      </div>
    </div>
  );
}
