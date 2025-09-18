import { useState, useRef, useLayoutEffect, useCallback, useMemo } from "react";
import { PolisiSection, CartelSection, GangSection, MafiaSection } from "./Leaders";
import { TiLocationArrow } from "react-icons/ti";

// Configuration data for feature cards
const FEATURES_DATA = [
  {
    id: 'polisi',
    src: 'videos/polisi_fix.mp4',
    title: (
      <>
        Poli<b>s</b>i
      </>
    ),
    description: 'Sistem polisi yang realistis dengan ranking, investigasi kriminal, dan patroli rutin untuk menjaga keamanan kota.',
    className: 'border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'
  },
  {
    id: 'gang',
    src: 'videos/gang_fix.mp4',
    title: (
      <>
        Ga<b>n</b>g
      </>
    ),
    description: 'Berbagai peluang bisnis mulai dari toko, restoran, bengkel, hingga perusahaan besar dengan sistem ekonomi yang realistis.',
    className: 'bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'
  },
  {
    id: 'cartel',
    src: 'videos/cartel_fix.mp4',
    title: (
      <>
        Car<b>t</b>el
      </>
    ),
    description: 'Sistem gang dan organisasi kriminal dengan hierarki, territori, dan konflik yang menambah dinamika roleplay.',
    className: 'bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'
  },
  {
    id: 'mafia',
    src: 'videos/mafia_fix.mp4',
    title: (
      <>
        Ma<b>fi</b>a
      </>
    ),
    description: 'Sistem properti lengkap dengan pembelian rumah, apartemen, dan bisnis properti yang dapat dikustomisasi.',
    className: 'bento-tilt_1 me-14 md:col-span-1 md:me-0'
  }
];

// Component mapping for leader sections
const LEADER_COMPONENTS = {
  polisi: PolisiSection,
  gang: GangSection,
  cartel: CartelSection,
  mafia: MafiaSection
};

// Optimized BentoTilt component with throttled mouse events
export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);
  const animationFrameRef = useRef();

  const handleMouseMove = useCallback((event) => {
    if (!itemRef.current) return;

    // Cancel previous animation frame to throttle updates
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const { left, top, width, height } = itemRef.current.getBoundingClientRect();
      const relativeX = (event.clientX - left) / width;
      const relativeY = (event.clientY - top) / height;
      const tiltX = (relativeY - 0.5) * 5;
      const tiltY = (relativeX - 0.5) * -5;

      setTransformStyle(
        `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`
      );
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setTransformStyle("");
  }, []);

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

// Optimized BentoCard component with memoized hover effects
export const BentoCard = ({ src, title, description, isComingSoon, onCtaClick }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);
  const animationFrameRef = useRef();

  const handleMouseMove = useCallback((event) => {
    if (!hoverButtonRef.current) return;

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const rect = hoverButtonRef.current.getBoundingClientRect();
      setCursorPosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    });
  }, []);

  const handleMouseEnter = useCallback(() => setHoverOpacity(1), []);
  const handleMouseLeave = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setHoverOpacity(0);
  }, []);

  const hoverStyle = useMemo(() => ({
    opacity: hoverOpacity,
    background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
  }), [hoverOpacity, cursorPosition.x, cursorPosition.y]);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onCtaClick}
            role="button"
            tabIndex={0}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full border-primary-light/30 bg-primary-blue/20 px-5 py-2 text-xs uppercase text-primary-light backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-light/60"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={hoverStyle}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">detail</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Features component with optimized rendering
const Features = () => {
  const [selected, setSelected] = useState(null);
  const containerRef = useRef(null);
  const frontRef = useRef(null);
  const backRef = useRef(null);

  // Memoized handlers for better performance
  const handleOpen = useCallback((key) => () => setSelected(key), []);
  const handleBack = useCallback(() => setSelected(null), []);

  // Optimized height calculation with debouncing
  useLayoutEffect(() => {
    const updateHeight = () => {
      const el = containerRef.current;
      const front = frontRef.current;
      const back = backRef.current;

      if (!el) return;

      if (!selected && front) {
        el.style.height = `${front.scrollHeight}px`;
      } else if (selected && back) {
        const extraBuffer = 100;
        el.style.height = `${back.scrollHeight + extraBuffer}px`;
      }
    };

    // Use requestAnimationFrame for smoother transitions
    const animationFrame = requestAnimationFrame(updateHeight);

    return () => cancelAnimationFrame(animationFrame);
  }, [selected]);

  // Memoized feature cards to prevent unnecessary re-renders
  const featureCards = useMemo(() =>
    FEATURES_DATA.map((feature) => (
      <BentoTilt key={feature.id} className={feature.className}>
        <BentoCard
          src={feature.src}
          title={feature.title}
          description={feature.description}
          isComingSoon
          onCtaClick={handleOpen(feature.id)}
        />
      </BentoTilt>
    )), [handleOpen]
  );

  // Memoized leader component to prevent unnecessary re-renders
  const LeaderComponent = useMemo(() => {
    return selected ? LEADER_COMPONENTS[selected] : null;
  }, [selected]);

  return (
    <section className="bg-dark-navy pb-52 features-fade">
      <div className="container mx-auto px-3 md:px-10">
        <header className="px-5 py-32">
          <p className="font-circular-web text-lg text-white">
            Fitur Server Hope Indonesia
          </p>
          <p className="max-w-md font-circular-web text-lg text-neutral-gray">
            Rasakan pengalaman roleplay yang tak terlupakan dengan berbagai fitur
            menarik dan sistem yang mendukung interaksi realistis antar pemain.
          </p>
        </header>

        <div ref={containerRef} className={`flip-container ${selected ? 'flipped' : ''}`}>
          <div className="flip-inner">
            {/* Front: Features grid */}
            <div ref={frontRef} className="flip-face flip-front">
              {featureCards[0]} {/* Polisi - full width */}

              <div className="grid min-h-[90vh] w-full grid-cols-2 grid-rows-2 gap-7">
                {featureCards.slice(1)} {/* Gang, Cartel, Mafia */}
              </div>
            </div>

            {/* Back: Leader detail */}
            <div ref={backRef} className="flip-face flip-back">
              <div className="flex justify-between items-center py-4 px-2">
                <button
                  onClick={handleBack}
                  className="border-hsla rounded-md px-4 py-2 text-white bg-primary-blue/20 hover:bg-primary-blue/30 transition"
                  aria-label="Kembali ke daftar fitur"
                >
                  Kembali
                </button>
              </div>

              <div>
                {LeaderComponent && <LeaderComponent />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;