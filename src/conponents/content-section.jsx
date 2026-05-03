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
  // products
  const products = ["../../public/nike/img4.png", "../../public/nike/img6.png"];

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

  // animation for left section
  useGSAP(() => {
    const tl = gsap.timeline();

    const split = new SplitText(".discreption-text", { type: "lines" });

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
        duration: 0.3,
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

    // left shift button animation
    tl.fromTo(
      ".left-shift-btn",
      { scale: 0, transformOrigin: "center", opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.1,
        ease: "back.out(2)",
      },
    );

    // discreption text and read btn animation
    gsap.set(split.lines, {
      overflow: "hidden",
    });

    tl.from(split.lines, {
      yPercent: 100,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    });

    // read more btn
    tl.fromTo(
      ".read-more-btn",
      { yPercent: 40, opacity: 0 }, // start (bottom)
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.1,
        ease: "power3.out",
        clearProps: "transform",
      },
    );

    // proper cleanup
    return () => {
      splits.forEach((s) => s.revert());
    };
  }, []);

  // animation for right section
  useGSAP(() => {
    const tl = gsap.timeline();

    // brand clip board animation
    tl.fromTo(
      ".brand-clip-board",
      { scale: 0.8, opacity: 0, x: 40, y: -40, transformOrigin: "top right" },
      {
        scale: 1,
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      },
    );

    // shoe size comp animation
    tl.fromTo(
      ".shoe-size-comp",
      {
        scale: 0.8,
        opacity: 0,
        x: 40,
        y: -40,
        transformOrigin: "right",
      },
      {
        scale: 1,
        x: 0,
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      },
    );

    // right shift btn
    tl.fromTo(
      ".right-shift-btn",
      { scale: 0, transformOrigin: "center", opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.1,
        ease: "back.out(2)",
      },
    );

    // social media linka animation
    tl.fromTo(
      ".social-media",
      { scale: 0, transformOrigin: "center", opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.1,
        ease: "back.out(2)",
      },
    );

    // 1️⃣ container pop
    tl.fromTo(
      ".price-section",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
      },
    );

    // 2️⃣ price text show first
    tl.from(
      ".price-text",
      {
        x: -20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.2",
    );

    // 3️⃣ button enters from left (push feel)
    tl.fromTo(
      ".shop-now-btn",
      { x: -150, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        clearProps: "transform",
      },
    );
  }, []);

  // social media icons
  const socialIcons = [
    <PiInstagramLogoLight size={"20px"} />,
    <CiFacebook size={"20px"} />,
    <RiTwitterXFill size={"20px"} />,
  ];

  // state for product scroll
  const [index, setIndex] = useState(0);

  // left / right btn
  const next = () => {
    setIndex((prev) => (prev + 1) % products.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  // slider animation
  useGSAP(() => {
    const slides = gsap.utils.toArray(".slider > div");

    slides.forEach((slide, i) => {
      const img = slide.querySelector("img");

      if (i === index) {
        // CENTER ACTIVE - 3D floating
        gsap.to(slide, {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
        });

        // Continuous floating animation on image
        gsap.killTweensOf(img);
        gsap.to(img, {
          y: -12,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });

        // Shadow element ke liye
        const shadow = slide.querySelector(".product-shadow");
        if (shadow) {
          gsap.killTweensOf(shadow);
          gsap.to(shadow, {
            opacity: 0.5,
            scaleX: 0.8,
            duration: 2,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        }
      } else if (i < index) {
        gsap.killTweensOf(img);
        gsap.to(slide, {
          scale: 0.8,
          opacity: 0,
          x: "-100%",
          duration: 0.6,
          ease: "power3.out",
        });
        gsap.to(img, { y: 0, duration: 0.3 });
      } else {
        gsap.killTweensOf(img);
        gsap.to(slide, {
          scale: 0.8,
          opacity: 0,
          x: "100%",
          duration: 0.6,
          ease: "power3.out",
        });
        gsap.to(img, { y: 0, duration: 0.3 });
      }
    });
  }, [index]);

  return (
    <>
      <section className="w-full items-stretch">
        {/* second layer for product */}
        <div className=" flex relative w-full h-[calc(100vh-120px)] ">
          {/* CENTER — Product */}
          <div className="flex-[1.2] flex items-center justify-center relative z-10 ">
            <div className="relative w-full h-[320px] overflow-hidden ">
              <div className="slider w-full h-full relative ">
                {products.map((img, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 flex items-center justify-center "
                  >
                    <div className="relative flex items-center justify-center">
                      <img
                        src={img}
                        className="h-[400px] object-contain relative z-10"
                      />

                      <div
                        className="product-shadow absolute bottom-[-18px] left-1/2 -translate-x-1/2 w-[180px] h-[20px] rounded-full"
                        style={{
                          background:
                            "radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)",
                          filter: "blur(8px)",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🔥 Overlay (2 Columns) */}
          <div className="absolute inset-0 flex z-20">
            {/* left section */}
            <div className="w-1/2  flex  px-4 flex-col gap-5">
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

              {/* left shift button */}
              <button
                className=" left-shift-btn my-10 ms-30 group relative w-14 h-14 rounded-full 
                bg-gradient-to-br from-white/20 to-white/5 
                backdrop-blur-xl border border-white/20 
                shadow-[0_8px_30px_rgba(0,0,0,0.3)] 
                hover:scale-105 transition-all duration-300 "
                onClick={prev}
              >
                <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 blur-xl transition-all"></div>

                <span
                  className="relative flex items-center justify-center w-full h-full text-white text-2xl 
              group-hover:-translate-x-1 transition-transform"
                >
                  ←
                </span>
              </button>

              <p className="discreption-text text-white/80 text-sm leading-relaxed max-w-sm">
                Step into next-level comfort and performance. Designed with
                lightweight materials, breathable knit upper, and responsive
                cushioning for all-day movement and style.
              </p>

              <NavLink
                to="#"
                className="read-more-btn self-start  text-white/80 text-xs font-bold px-5 py-2.5 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.3)]  backdrop-blur-xl border border-white/20 bg-gradient-to-br from-white/20 to-white/5 "
              >
                Read more
              </NavLink>
            </div>

            {/* right section */}
            <div className="flex-1 flex flex-col  items-end gap-5 px-8 py-3  text-left ">
              {/* next shoe brand */}
              <NavLink
                className="brand-clip-board w-full max-w-[245px] 
            bg-white/5 backdrop-blur-2xl border border-white/10 
            rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-4  text-center "
              >
                <p className="text-white font-bold inline-block scale-x-125 ">
                  NIKE
                </p>
              </NavLink>

              <div
                className="shoe-size-comp bg-white/5 backdrop-blur-2xl border border-white/10 
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
                      <button
                        key={size}
                        className={` w-full h-8 rounded-full text-[11px] border transition-all
                  ${
                    isActive
                      ? "border-white/60 bg-white/100 text-black/90"
                      : "border-white/20 text-white/50 hover:border-white/40"
                  }`}
                        onClick={() => goToSlide(index)}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="grid grid-cols-2">
                {/* right: button */}
                <div>
                  <button
                    className="right-shift-btn mt-5 mr-7 group relative w-14 h-14 rounded-full 
                bg-gradient-to-br from-white/20 to-white/5 
                backdrop-blur-xl border border-white/20 
                shadow-[0_8px_30px_rgba(0,0,0,0.3)] 
                hover:scale-105 transition-all duration-300"
                    onClick={next}
                  >
                    <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 blur-xl transition-all"></div>

                    <span
                      className="relative flex items-center justify-center w-full h-full text-white text-2xl 
                  group-hover:translate-x-1 transition-transform"
                    >
                      →
                    </span>
                  </button>
                </div>

                {/* RIGHT: icons */}
                <div className="flex flex-col items-end gap-3 mt-2">
                  {socialIcons.map((icon, index) => (
                    <NavLink
                      key={index}
                      to="#"
                      className="social-media rounded-full p-2 
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
                </div>
              </div>
              <div
                className="price-section flex items-center gap-3 rounded-full py-2 px-4 m-6 
            bg-white/5 backdrop-blur-md border border-white/20 
            text-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.25)]  overflow-hidden"
              >
                <button
                  className="shop-now-btn text-white text-xs font-bold px-5 py-2 rounded-full 
              backdrop-blur-xl border border-white/20 
              bg-gradient-to-br from-white/20 to-white/5 
              hover:scale-105 transition-all duration-300"
                >
                  Shop Now
                </button>

                <span className="price-text text-white font-bold text-sm whitespace-nowrap">
                  $ 700
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Price + Size + CTA */}
        <div className="flex-1 flex flex-col  items-end gap-5 px-8 py-3 "></div>
      </section>
    </>
  );
};
export default ContentSection;
