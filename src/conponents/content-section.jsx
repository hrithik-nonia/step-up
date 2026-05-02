import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { PiInstagramLogoLight } from "react-icons/pi";
import { CiFacebook } from "react-icons/ci";
import { RiTwitterXFill } from "react-icons/ri";

gsap.registerPlugin(SplitText);

const ContentSection = () => {
  // temp arr for size
  const size = [7, 8, 9, 10, 11, 12, 13, 14];

  // index of links
  const [currentIndex, setCurrentIndex] = useState(0);

  // total no of links
  const totalSize = size.length;

  // esitch to next index of link
  const goToSlide = (index) => {
    const newIndex = (index + totalSize) % totalSize;
    setCurrentIndex(newIndex);
  };
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

  // social media icons
  const socialIcons = [
    <PiInstagramLogoLight size={"20px"} />,
    <CiFacebook size={"20px"} />,
    <RiTwitterXFill size={"20px"} />,
  ];

  return (
    <>
      <section className="w-full flex items-stretch">
        {/* LEFT — Description + Features */}
        <div className="flex-1 flex flex-col justify-center gap-5 px-8 py-3 min-w-max">
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

          <button
            className="my-10 ms-30 group relative w-14 h-14 rounded-full 
            bg-gradient-to-br from-white/20 to-white/5 
            backdrop-blur-xl border border-white/20 
            shadow-[0_8px_30px_rgba(0,0,0,0.3)] 
            hover:scale-105 transition-all duration-300 "
          >
            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 blur-xl transition-all"></div>

            <span
              className="relative flex items-center justify-center w-full h-full text-white text-2xl 
              group-hover:-translate-x-1 transition-transform"
            >
              ←
            </span>
          </button>

          <p className="text-white/80 text-sm leading-relaxed max-w-sm">
            Step into next-level comfort and performance. Designed with
            lightweight materials, breathable knit upper, and responsive
            cushioning for all-day movement and style.
          </p>

          <NavLink
            to="#"
            className="self-start  text-white/80 text-xs font-bold px-5 py-2.5 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.3)]  backdrop-blur-xl border border-white/20 bg-gradient-to-br from-white/20 to-white/5 "
          >
            Read more
          </NavLink>
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
        <div className="flex-1 flex flex-col  items-end gap-5 px-8 py-10 text-left">
          <div
            className="bg-white/5 backdrop-blur-2xl border border-white/10 
            rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-4 "
          >
            <p className="text-white/100 text-[11px] tracking-[2.5px] uppercase mb-2 pe-10">
              A Shoe Color(black)
            </p>

            <p className="text-white/100 text-[11px] tracking-[2.5px] uppercase mb-2 pe-10">
              A Shoe Size(8)
            </p>
            {/* shoe sizes */}
            <div className="grid grid-cols-4 gap-1 mt-4 ps-10">
              {size.map((size, index) => {
                const isActive = index === currentIndex;
                return (
                  <>
                    <button
                      key={size}
                      className={`w-full h-8 rounded-full text-[11px] border transition-all
                  ${
                    isActive
                      ? "border-white/60 bg-white/100 text-black/90"
                      : "border-white/20 text-white/50 hover:border-white/40"
                  }`}
                      onClick={() => goToSlide(index)}
                    >
                      {size}
                    </button>
                  </>
                );
              })}
            </div>
          </div>

          {/* social media */}
          {socialIcons.map((icon, link, index) => (
            <NavLink
              key={index}
              to={link}
              className="rounded-full p-2 
              bg-white/5 backdrop-blur-md 
              border border-white/20 
              text-white/80 
              shadow-[0_4px_20px_rgba(0,0,0,0.25)] 
              hover:bg-white/10 hover:text-white 
              transition-all duration-300"
            >
              {icon}
            </NavLink>
          ))}

          <h2 className="text-white text-3xl font-bold">₹4,999</h2>
          <p className="text-white/30 text-xs line-through">₹7,499</p>

          <div className="flex flex-col gap-2 items-end">
            <p className="text-white/40 text-xs">Select Size</p>
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
