import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef, useState, useCallback, useMemo } from "react";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutSectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const timelineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Optimized scroll progress handler
  const updateScrollProgress = useCallback((self) => {
    setScrollProgress(self.progress);
  }, []);

  // Optimized modern zoom-in storytelling parallax
  useGSAP(() => {
    const aboutSection = aboutSectionRef.current;
    const imageContainer = imageContainerRef.current;

    if (!aboutSection || !imageContainer) return;

    // Main storytelling timeline dengan optimized performance
    const storyTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: aboutSection,
        start: "top center",
        end: "bottom center",
        scrub: 1.5,
        pin: true,
        pinSpacing: true,
        onUpdate: updateScrollProgress,
        invalidateOnRefresh: true,
      }
    });

    // Store timeline reference for cleanup
    timelineRef.current = storyTimeline;

    // Enhanced dramatic zoom-in storytelling sequence with smooth transitions
    storyTimeline
      // Phase 1: Distant view - optimized for GPU acceleration
      .fromTo(imageContainer, {
        scale: 0.1,
        y: 300,
        opacity: 0,
        borderRadius: "50%",
        filter: "blur(20px) brightness(0.3) contrast(1.5)",
        force3D: true,
        willChange: "transform, filter"
      }, {
        scale: 0.6,
        y: 100,
        opacity: 0.7,
        borderRadius: "30px",
        filter: "blur(8px) brightness(0.6) contrast(1.3)",
        duration: 0.4,
        ease: "power2.inOut"
      })
      // Phase 2: Approaching view - smoother transitions
      .to(imageContainer, {
        scale: 1.2,
        y: 0,
        opacity: 1,
        borderRadius: "20px",
        filter: "blur(3px) brightness(0.9) contrast(1.1)",
        duration: 0.3,
        ease: "power1.out"
      })
      // Phase 3: Immersive zoom - enhanced final reveal
      .to(imageContainer, {
        scale: 1.8,
        y: -50,
        borderRadius: "15px",
        filter: "blur(0px) brightness(1.1) contrast(1.0)",
        duration: 0.3,
        ease: "power2.out"
      });

    // Optimized parallax background depth effect
    gsap.fromTo(".about-bg-layer", {
      scale: 1.2,
      opacity: 0.3,
      force3D: true
    }, {
      scrollTrigger: {
        trigger: aboutSection,
        start: "top bottom",
        end: "bottom top",
        scrub: 3,
        invalidateOnRefresh: true
      },
      scale: 0.8,
      opacity: 0.8,
      duration: 1
    });

    // Enhanced text elements storytelling reveal with stagger
    gsap.fromTo(".story-text", {
      y: 100,
      opacity: 0,
      force3D: true
    }, {
      scrollTrigger: {
        trigger: aboutSection,
        start: "top center",
        end: "center center",
        scrub: 2,
        invalidateOnRefresh: true
      },
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Cleanup function for proper memory management
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };

  }, [updateScrollProgress]);

  // Memoized dynamic effects for optimized performance
  const dynamicEffects = useMemo(() => ({
    transform: `perspective(2000px) rotateY(${scrollProgress * 5}deg) rotateX(${scrollProgress * 3}deg)`,
    boxShadow: `0 ${20 + scrollProgress * 30}px ${40 + scrollProgress * 20}px rgba(139, 0, 0, ${0.1 + scrollProgress * 0.3})`,
    willChange: 'transform, box-shadow'
  }), [scrollProgress]);

  // Memoized particle positions to prevent recalculation
  const particleElements = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      width: 20 + i * 15,
      height: 20 + i * 15,
      left: `${10 + i * 15}%`,
      top: `${20 + i * 10}%`,
      translateY: scrollProgress * (50 + i * 20),
      rotate: scrollProgress * 360
    }))
  , [scrollProgress]);

  return (
    <div
      ref={aboutSectionRef}
      id="about"
      className="min-h-[150vh] w-screen bg-background-light relative overflow-hidden"
    >
      {/* Multi-layer background system */}
      <div className="about-bg-layer absolute inset-0 bg-gradient-radial from-primary-red/8 via-primary-red/4 to-transparent" />

      {/* Optimized floating particles effect */}
      <div className="absolute inset-0 opacity-30">
        {particleElements.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-accent-red/20 will-change-transform"
            style={{
              width: `${particle.width}px`,
              height: `${particle.height}px`,
              left: particle.left,
              top: particle.top,
              transform: `translateY(${particle.translateY}px) rotate(${particle.rotate}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          />
        ))}
      </div>

      {/* Storytelling text content */}
      <div className="relative z-20 pt-20 pb-32 px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="story-text font-general text-sm uppercase text-text-muted tracking-wider">
            Welcome to IME Roleplay
          </p>

          <div className="story-text">
            <AnimatedTitle
              title="Jelajahi <b>k</b>ota <br /> IME Roleplay <b>b</b>ersama"
              containerClass="!text-text-primary text-center"
            />
          </div>

          <div className="story-text space-y-6 max-w-2xl mx-auto">
            <p className="text-text-primary text-xl font-medium leading-relaxed">
              Server FiveM Roleplay Indonesia Terdepan dengan Kualitas Terbaik
            </p>
            <p className="text-text-muted text-lg leading-relaxed">
              IME Roleplay menghadirkan pengalaman roleplay yang autentik dengan
              sistem ekonomi yang realistis dan komunitas yang solid
            </p>
          </div>
        </div>
      </div>

      {/* Cinematic zoom image container */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          ref={imageContainerRef}
          className="relative w-[80vw] h-[80vh] max-w-6xl rounded-2xl overflow-hidden will-change-transform"
          style={dynamicEffects}
        >
          <img
            src="img/about.png"
            alt="IME Roleplay - Explore the City"
            className="size-full object-cover will-change-transform"
            loading="eager"
            decoding="async"
          />

          {/* Progressive overlay system */}
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-primary-red/20 will-change-opacity"
            style={{ opacity: Math.max(0, 1 - scrollProgress * 1.5) }}
          />

          {/* Focus vignette effect */}
          <div
            className="absolute inset-0 will-change-opacity"
            style={{
              background: `radial-gradient(circle at center, transparent ${40 + scrollProgress * 20}%, rgba(0,0,0,0.3) ${60 + scrollProgress * 20}%)`,
              opacity: scrollProgress * 0.6
            }}
          />
        </div>
      </div>

      {/* Optimized progress indicator */}
      <div className="fixed bottom-8 right-8 z-30">
        <div className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full bg-accent-red transition-all duration-300 will-change-transform"
            style={{
              transform: `scale(${scrollProgress})`,
              opacity: scrollProgress
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
