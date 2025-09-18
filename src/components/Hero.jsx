import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState, useCallback } from "react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = "videos/hero-1.mp4";

const Hero = () => {
  const [loading, setLoading] = useState(true);

  const heroSectionRef = useRef(null);
  const maskWrapperRef = useRef(null);
  const titleLogoRef = useRef(null);
  const overlayLogoRef = useRef(null);
  const entranceMessageRef = useRef(null);

  // Hold GSAP quickTo updaters for parallax to avoid re-renders
  const parallaxRef = useRef({ fastX: null, fastY: null, slowX: null, slowY: null });

  const handleVideoLoad = () => setLoading(false);

  // Fallback timeout in case video metadata load is slow
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  // Mouse tracking with GSAP quickTo (no React state churn)
  const handleMouseMove = useCallback((e) => {
    const section = heroSectionRef.current;
    const { fastX, fastY, slowX, slowY } = parallaxRef.current;
    if (!section || !fastX || !fastY || !slowX || !slowY) return;

    const rect = section.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const offsetX = (mouseX - centerX) / centerX;
    const offsetY = (mouseY - centerY) / centerY;

    fastX(offsetX * 8);
    fastY(offsetY * 8);
    slowX(offsetX * 42);
    slowY(offsetY * 4);
  }, []);

  // Simple logo fade-in animation only
  useGSAP(
    () => {
      if (!heroSectionRef.current) return;

      // Simple fade-in animation for logo
      gsap.set(titleLogoRef.current, { opacity: 0 });
      gsap.to(titleLogoRef.current, {
        opacity: 1,
        duration: 1.5,
        delay: 0.5,
        ease: "power2.out"
      });
    },
    { scope: heroSectionRef }
  );

  // Initialize parallax updaters once
  useGSAP(
    () => {
      parallaxRef.current.fastX = gsap.quickTo(".mouse-parallax", "x", {
        duration: 2.5,
        ease: "power1.out",
      });
      parallaxRef.current.fastY = gsap.quickTo(".mouse-parallax", "y", {
        duration: 2.5,
        ease: "power1.out",
      });
      parallaxRef.current.slowX = gsap.quickTo(".mouse-parallax-slow", "x", {
        duration: 3.5,
        ease: "power1.out",
      });
      parallaxRef.current.slowY = gsap.quickTo(".mouse-parallax-slow", "y", {
        duration: 3.5,
        ease: "power1.out",
      });
      // Subtle up-down animation for scroll tooltip
      gsap.to(".scroll-tip", {
        y: -8,
        duration: 1.3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { scope: heroSectionRef }
  );

  return (
    <section
      ref={heroSectionRef}
      className="hero-section relative w-dvw h-dvh overflow-hidden z-10"
      onMouseMove={handleMouseMove}
    >
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-background-light">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Background Video */}
      <div className="absolute inset-0 z-10">
        <video
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedData={handleVideoLoad}
        />
      </div>

      {/* Main Logo - Ultra-Smooth Entrance */}
      <div className="absolute inset-0 z-30 flex items-center justify-center">
        <div
          ref={titleLogoRef}
          className="text-center mouse-parallax flex flex-col items-center"
        >
          <img
            src="/img/logo.png"
            alt="IME Logo"
            className="w-28 h-28 lg:w-40 lg:h-40 xl:w-52 xl:h-52 object-contain mb-6 transition-all duration-1000 drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Low opacity overlay to show video */}
      <div className="absolute inset-0 z-20 bg-background-light/20"></div>

      {/* Scroll tooltip centered at bottom */}
      <div className="scroll-tip absolute left-1/2 -translate-x-1/2 bottom-5 md:bottom-8 z-[60] flex flex-col items-center text-white/80 pointer-events-none select-none">
        <span className="text-[10px] md:text-xs tracking-wider uppercase">Scroll</span>
        <span className="text-xl md:text-2xl leading-none">↓</span>
      </div>

    </section>
  );
};

export default Hero;
