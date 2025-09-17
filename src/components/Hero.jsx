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

  // Scroll-driven animation and initial state
  useGSAP(
    () => {
      if (!heroSectionRef.current) return;

      // Initial mask setup (with WebKit fallbacks)
      gsap.set(maskWrapperRef.current, {
        maskImage: "radial-gradient(circle at 50% 50%, black 20%, transparent 60%)",
        WebkitMaskImage:
          "radial-gradient(circle at 50% 50%, black 20%, transparent 60%)",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "180% 180%",
        WebkitMaskSize: "180% 180%",
        maskPosition: "50% 50%",
        WebkitMaskPosition: "50% 50%",
      });

      gsap.set(titleLogoRef.current, { y: "20vh", opacity: 0, scale: 0.85 });
      gsap.set(overlayLogoRef.current, { opacity: 0, scale: 0.85 });

      gsap.set(entranceMessageRef.current, {
        maskImage:
          "radial-gradient(circle at 50% 120vh, black 0%, transparent 0%)",
        WebkitMaskImage:
          "radial-gradient(circle at 50% 120vh, black 0%, transparent 0%)",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
      });

      // Main timeline
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "+=300%", // Reduced to prevent About section overlap
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const maskSize = gsap.utils.interpolate(180, 300, progress);
            const maskOpacity = gsap.utils.interpolate(
              1,
              0.15,
              Math.pow(progress, 0.8)
            );

            gsap.set(maskWrapperRef.current, {
              maskSize: `${maskSize}% ${maskSize}%`,
              WebkitMaskSize: `${maskSize}% ${maskSize}%`,
              opacity: maskOpacity,
            });
          },
        },
      });

      // Optimized animation sequence for reveal
      mainTimeline
        // Phase 1: Gentle video scale (0-25%)
        .to(
          ".scale-out-video",
          { scale: 1.06, duration: 0.4, ease: "power1.out" },
          0
        )
        // Phase 2: Blur-to-focus (10-40%)
        .to(
          ".scale-out-video",
          { filter: "blur(0px) brightness(1)", duration: 0.5, ease: "power2.out" },
          0.1
        )
        // Phase 3: Logo entrance (30-60%)
        .to(
          titleLogoRef.current,
          { y: 0, opacity: 1, scale: 1.02, duration: 0.5, ease: "power2.out" },
          0.3
        )
        // Phase 4: Overlay flash (45-55%)
        .to(
          overlayLogoRef.current,
          { opacity: 0.9, scale: 1.0, duration: 0.15, ease: "power1.out" },
          0.45
        )
        .to(
          overlayLogoRef.current,
          { opacity: 0, scale: 0.98, duration: 0.25, ease: "power1.out" },
          0.5
        )
        // Phase 4.5: Subtle shrink (55-65%)
        .to(
          titleLogoRef.current,
          { scale: 0.96, duration: 0.3, ease: "power1.out" },
          0.55
        );
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
      className="hero-section relative w-dvw h-dvh overflow-hidden bg-dark-navy"
      onMouseMove={handleMouseMove}
    >
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-dark-navy">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      {/* Main Mask Wrapper - JSM Style - Clean & Minimal */}
      <div ref={maskWrapperRef} className="absolute inset-0 z-10">
        {/* Single Background Video with Scale Animation */}
        <video
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          className="scale-out-video absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'blur(2px) brightness(0.8)' }}
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
            alt="Hope Logo"
            className="w-28 h-28 lg:w-40 lg:h-40 xl:w-52 xl:h-52 object-contain mb-6 transition-all duration-1000 drop-shadow-2xl"
          />
          <div className="text-lg lg:text-xl xl:text-2xl font-general text-white/90 tracking-widest uppercase transition-all duration-700">
           Hope Indonesia
          </div>
        </div>
      </div>

      {/* Overlay Logo for Gentle Flash Effect */}
      <div className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none">
        <div
          ref={overlayLogoRef}
          className="text-center flex flex-col items-center"
        >
          <img
            src="/img/logo.png"
            alt="Hope Logo"
            className="w-28 h-28 lg:w-40 lg:h-40 xl:w-52 xl:h-52 object-contain mb-6 transition-all duration-1000 drop-shadow-2xl brightness-150 contrast-125"
          />
          <div className="text-lg lg:text-xl xl:text-2xl font-general text-white tracking-widest uppercase transition-all duration-700">
            Hope Indonesia
          </div>
        </div>
      </div>

      {/* Smooth Entrance Message */}
      <div
        ref={entranceMessageRef}
        className="absolute inset-0 w-full h-dvh overflow-hidden z-50 bg-dark-navy"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center mouse-parallax-slow flex flex-col items-center">
            <img
              src="/img/logo.png"
              alt="Hope Logo"
              className="w-20 h-20 lg:w-28 lg:h-28 xl:w-36 xl:h-36 object-contain mb-8 transition-all duration-1500 drop-shadow-2xl"
            />
            <AnimatedTitle
              title="H<b>o</b>pe Indon<b>e</b>sia"
              containerClass="!text-3xl lg:!text-4xl xl:!text-5xl !text-white text-center mb-6 !font-zentry !font-black"
            />
            <p className="text-base lg:text-lg text-neutral-gray/70 font-general max-w-2xl mx-auto leading-relaxed transition-all duration-1000">
              Server FiveM roleplay terdepan di Indonesia.<br />
              Bergabunglah dalam petualangan yang tak terlupakan.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll tooltip centered at bottom */}
      <div className="scroll-tip absolute left-1/2 -translate-x-1/2 bottom-5 md:bottom-8 z-[60] flex flex-col items-center text-white/80 pointer-events-none select-none">
        <span className="text-[10px] md:text-xs tracking-wider uppercase">Scroll</span>
        <span className="text-xl md:text-2xl leading-none">↓</span>
      </div>

    </section>
  );
};

export default Hero;
