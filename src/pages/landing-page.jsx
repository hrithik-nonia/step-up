import Navbar from "../conponents/navber";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-black  overflow-hidden">
      {/* Base dark gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_0%_0%,#2a2a2a_0%,#111_30%,#000_70%)] "></div>
      // Bottom dark
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
      // Right dark
      <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-l from-black to-transparent" />
      {/* navbar */}
      <Navbar />
    </div>
  );
}
