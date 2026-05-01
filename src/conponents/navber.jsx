import navLinks from "../constant/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";

// register plugin
gsap.registerPlugin(SplitText);

const Navbar = () => {
  // logo ref for logo animation
  const logoRef = useRef();

  //  link ref for link animation
  const linkRef = useRef();

  // login link ref for animation
  const loginRef = useRef();

  // cart ref for cart animation
  const cartRef = useRef();

  // navbar ref for animation
  const navRef = useRef();

  // index of links
  const [currentIndex, setCurrentIndex] = useState(0);

  // total no of links
  const totalLinks = navLinks.length;

  // esitch to next index of link
  const goToSlide = (index) => {
    const newIndex = (index + totalLinks) % totalLinks;
    setCurrentIndex(newIndex);
  };

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

  //link hover animation
  useGSAP(() => {
    const items = gsap.utils.toArray(".nav-item");

    items.forEach((item) => {
      const icon = item.querySelector(".nav-icon");

      gsap.set(icon, {
        y: 20,
        opacity: 0,
        scale: 0.8,
      });
    });
  }, []);

  const handleEnter = (item) => {
    const text = item.querySelector(".nav-text");
    const icon = item.querySelector(".nav-icon");

    gsap.killTweensOf([text, icon]);

    gsap.to(text, {
      y: -20,
      opacity: 0,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(icon, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)",
    });
  };

  const handleLeave = (item) => {
    const text = item.querySelector(".nav-text");
    const icon = item.querySelector(".nav-icon");

    gsap.killTweensOf([text, icon]);

    gsap.to(text, {
      y: 0,
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });

    gsap.to(icon, {
      y: 20,
      opacity: 0,
      scale: 0.8,
      duration: 0.25,
      ease: "power2.out",
    });
  };

  // login link animation
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    // initial state of icon
    gsap.set(".login-icon", {
      y: 10,
      opacity: 0,
      scale: 0.7,
    });

    // text up + fade
    tl.to(".login-text", {
      y: -24,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    // icon center + pop
    tl.to(
      ".login-icon",
      {
        y: 0,

        opacity: 1,
        scale: 1.2,
        duration: 0.4,
        ease: "back.out(1.7)",
      },
      "<",
    );

    const login = loginRef.current;

    const enter = () => tl.play();
    const leave = () => tl.reverse();

    login.addEventListener("mouseenter", enter);
    login.addEventListener("mouseleave", leave);

    return () => {
      login.removeEventListener("mouseenter", enter);
      login.removeEventListener("mouseleave", leave);
    };
  });

  // cart link animation
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });

    // initial state of icon
    gsap.set(".cart-icon", {
      y: 10,
      opacity: 0,
      scale: 0.7,
    });

    // text up + fade
    tl.to(".cart-text", {
      y: -24,
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    // icon center + pop
    tl.to(
      ".cart-icon",
      {
        y: 0,

        opacity: 1,
        scale: 1.2,
        duration: 0.4,
        ease: "back.out(1.7)",
      },
      "<",
    );

    const cart = cartRef.current;

    const enter = () => tl.play();
    const leave = () => tl.reverse();

    cart.addEventListener("mouseenter", enter);
    cart.addEventListener("mouseleave", leave);

    return () => {
      cart.removeEventListener("mouseenter", enter);
      cart.removeEventListener("mouseleave", leave);
    };
  });

  // navbar animation
  useGSAP(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <>
      <nav className=" mt-4 flex-between h-13 px-10" ref={navRef}>
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
        <div className=" flex items-center gap-0.5 bg-white/5 border border-white/10 rounded-full px-1.5 py-1.5 backdrop-blur-md">
          {navLinks.map((link, index) => {
            const isActive = index === currentIndex;
            return (
              <NavLink
                ref={linkRef}
                key={link.id}
                to={link.link}
                className={`nav-item relative flex-between overflow-hidden text-white/100  text-[13px] font-medium px-4 py-1.5 rounded-full transition-all duration-150 ${
                  isActive
                    ? "bg-white/30 border border-white/10 text-white"
                    : "text-white/50"
                }`}
                onMouseEnter={(e) => handleEnter(e.currentTarget)}
                onMouseLeave={(e) => handleLeave(e.currentTarget)}
                onClick={() => goToSlide(index)}
              >
                {/* TEXT */}
                <span className="nav-text relative z-10 whitespace-nowrap">
                  {link.title}
                </span>

                {/* ICON */}
                <span className="nav-icon absolute inset-0 flex items-center justify-center text-[14px]">
                  {link.icon}
                </span>
              </NavLink>
            );
          })}
        </div>

        {/* Cart + Login */}
        <div className="flex items-center gap-2">
          <NavLink
            ref={loginRef}
            to="#"
            className="text-white/100 text-[13px] font-medium px-4 py-2 rounded-full border border-white/30 transition-all bg-white/5 backdrop-blur-md"
          >
            <span className="login-text relative z-10">Login</span>
            <span className="login-icon absolute inset-0 flex items-center justify-center z-0">
              👤
            </span>
          </NavLink>
          <NavLink
            ref={cartRef}
            to="#"
            className="text-black text-[13px] font-semibold px-4 py-2 rounded-full bg-white  transition-all backdrop-blur-md"
          >
            <span className="cart-text relative z-10">Cart (0)</span>
            <span className="cart-icon absolute inset-0 flex items-center justify-center z-0">
              📦
            </span>
          </NavLink>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
