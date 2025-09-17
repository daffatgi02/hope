import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "top center", // Changed from "center center" to delay start
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase text-neutral-gray md:text-[10px]">
          Welcome to Hope Indonesia
        </p>

        <AnimatedTitle
          title="Jelajahi <b>k</b>ota <br /> Hope Indonesia <b>b</b>ersama"
          containerClass="mt-5 !text-white text-center"
        />

        <div className="about-subtext">
          <p className="text-white">Server FiveM Roleplay Indonesia Terdepan dengan Kualitas Terbaik</p>
          <p className="text-neutral-gray">
            Hope Indonesia menghadirkan pengalaman roleplay yang autentik dengan
            sistem ekonomi yang realistis dan komunitas yang solid
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.png"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
