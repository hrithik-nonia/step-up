import navLinks from "../constant/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useRef } from "react";

// register plugin
gsap.registerPlugin(SplitText);

const Navbar = () => {
  const logoRef = useRef();

  useGSAP(() => {
    const logoSplit = new SplitText(".logo-text", { type: "chars,words" });
    // gradient class add
    gsap.set(logoSplit.words, { overflow: "visible" });

    // gradient class add
    logoSplit.chars.forEach((char) => char.classList.add("text-gradient"));
    // Animation
    gsap.from(logoSplit.chars, {
      y: 16,
      opacity: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: "power3.out",
    });

    const tl = gsap.timeline({ paused: true });

    // initial state
    gsap.set(".shoe", {
      y: 10,
      opacity: 0,
      scale: 0.7,
    });

    // text up + fade
    tl.to(".logo-text", {
      y: -24,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    // shoe center + pop
    tl.to(
      ".shoe",
      {
        y: 0,
        opacity: 1,
        scale: 1.2,
        duration: 0.4,
        ease: "back.out(1.7)",
      },
      "<",
    );

    const logo = logoRef.current;

    const enter = () => tl.play();
    const leave = () => tl.reverse();

    logo.addEventListener("mouseenter", enter);
    logo.addEventListener("mouseleave", leave);

    return () => {
      logo.removeEventListener("mouseenter", enter);
      logo.removeEventListener("mouseleave", leave);
    };
  });

  return (
    <>
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between h-13 px-10">
        {/* Logo */}
        <a
          ref={logoRef}
          className="logo relative flex items-center justify-center w-[110px] h-[32px] cursor-pointer"
        >
          <span className="logo-text absolute text-white text-[20px] font-semibold leading-none">
            Step Up
          </span>

          <span className="shoe absolute text-white text-[20px] leading-none">
            👟
          </span>
        </a>

        {/* Nav links — pill container with floating active state */}
        <div className="flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full px-1.5 py-1.5 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.link}
              className="text-white/55 hover:text-white text-[13px] font-medium px-4 py-1.5 rounded-full transition-all duration-150
          [&.active]:bg-white/12 [&.active]:border [&.active]:border-white/20 [&.active]:text-white"
            >
              {link.title}
            </a>
          ))}
        </div>

        {/* Cart + Login */}
        <div className="flex items-center gap-2">
          <a
            href="#"
            className="text-white/60 text-[13px] font-medium px-4 py-2 rounded-full border border-white/12 hover:text-white transition-all"
          >
            Login
          </a>
          <a
            href="#"
            className="text-black text-[13px] font-semibold px-4 py-2 rounded-full bg-white hover:bg-white/90 transition-all"
          >
            Cart (0)
          </a>
        </div>
      </div>
    </>
  );
};
export default Navbar;
