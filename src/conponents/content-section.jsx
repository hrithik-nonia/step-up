import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const ContentSection = () => {
  useGSAP(() => {
    const tl = gsap.timeline();

    const lines = gsap.utils.toArray(".hero-text");

    const splits = [];

    lines.forEach((line, index) => {
      const split = new SplitText(line, { type: "chars" });
      splits.push(split);

      // ✅ FIX: chars ko inline-block + no wrap
      gsap.set(split.chars, {
        display: "inline-block",
      });

      gsap.from(split.chars, {
        x: -60,
        y: -40,
        opacity: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power3.out",
        delay: index * 0.5,
      });
    });

    // SHOE TEXT
    tl.from(
      ".shoe-text",
      {
        y: 40,
        opacity: 0,
        duration: 0.5,
        ease: "power3.out",
      },
      "+=0.7",
    );

    //UNDERLINE
    tl.fromTo(
      ".shoe-underline",
      { scaleX: 0, transformOrigin: "left" },
      {
        scaleX: 1,
        duration: 0.5,
        ease: "power2.out",
      },
    );

    // proper cleanup
    return () => {
      splits.forEach((s) => s.revert());
    };
  }, []);

  return (
    <>
      <section className="w-full flex items-stretch">
        {/* LEFT — Description + Features */}
        <div className="flex-1 flex flex-col justify-center gap-5 px-8 py-10 min-w-max">
          <div>
            <h1
              className="hero-text text-white text-6xl font-bold leading-tight tracking-tight  "
              style={{ textShadow: "0 8px 20px rgba(0,0,0,0.6)" }}
            >
              Elevate every
            </h1>
            <h1
              className="hero-text text-5xl font-extrabold leading-tight tracking-tight mb-3 transparent"
              style={{
                WebkitTextStroke: ".5px #ffffff",
                textShadow: "0 8px 20px rgba(0,0,0,0.6)",
              }}
            >
              Step
            </h1>

            <p className="shoe-text text-white text-2xl tracking-[2.5px] uppercase mt-8 font-bold relative inline-block">
              shoe name
              <span
                className="shoe-underline absolute left-0 bottom-[-6px] w-full h-[2px] 
                bg-gradient-to-r from-white to-transparent 
                rotate-[0.5deg] blur-[0.3px] opacity-80"
              ></span>
            </p>
          </div>
          <ul className="flex flex-col gap-2">
            {[
              "Lightweight foam sole",
              "Breathable knit upper",
              "Available in 6 colorways",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
                <span className="text-white/50 text-[12px]">{f}</span>
              </li>
            ))}
          </ul>
          <a
            href="#"
            className="self-start bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full"
          >
            Shop Now
          </a>
        </div>

        {/* CENTER — Product */}
        <div className="flex-[1.2] flex flex-col items-center justify-center gap-4 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.04),transparent_70%)]" />
          <span className="text-[100px] leading-none relative z-10 drop-shadow-2xl">
            👟
          </span>
          <div className="relative z-10 bg-white/[0.06] border border-white/10 rounded-full px-4 py-1.5">
            <span className="text-white/60 text-[11px] tracking-wider">
              Step Up Air Max
            </span>
          </div>
        </div>

        {/* RIGHT — Price + Size + CTA */}
        <div className="flex-1 flex flex-col justify-center items-end gap-5 px-8 py-10 text-right">
          <div>
            <p className="text-white/25 text-[11px] tracking-[2.5px] uppercase mb-2">
              Price
            </p>
            <h2 className="text-white text-3xl font-bold">₹4,999</h2>
            <p className="text-white/30 text-xs line-through">₹7,499</p>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <p className="text-white/40 text-xs">Select Size</p>
            <div className="flex gap-1.5">
              {[7, 8, 9, 10].map((size) => (
                <button
                  key={size}
                  className={`w-8 h-8 rounded-lg text-[11px] border transition-all
                  ${
                    size === 8
                      ? "border-white/60 bg-white/10 text-white"
                      : "border-white/20 text-white/50 hover:border-white/40"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 items-end">
            <a
              href="#"
              className="bg-white text-black text-xs font-bold px-5 py-2.5 rounded-full"
            >
              Add to Cart
            </a>
            <a
              href="#"
              className="text-white/40 text-xs hover:text-white/60 transition-all"
            >
              Save to Wishlist →
            </a>
          </div>
        </div>
      </section>
    </>
  );
};
export default ContentSection;
