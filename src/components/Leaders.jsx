import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useMemo, useState, useCallback, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const safeImg = (src) => ({ src, onError: (e) => { e.currentTarget.src = "/img/logo.png"; } });

// Top 3 organizations data for each category
const TOP_ORGANIZATIONS_DATA = {
  polisi: {
    id: 'polisi',
    organizations: [
      {
        id: 1,
        name: 'LSPD Elite Unit',
        description: 'Unit elite Los Santos Police Department dengan spesialisasi operasi khusus dan investigasi kriminal tingkat tinggi.',
        members: '45 Anggota',
        images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
        altTexts: ['LSPD Elite 1', 'LSPD Elite 2', 'LSPD Elite 3']
      },
      {
        id: 2,
        name: 'BCSO Tactical Force',
        description: 'Blaine County Sheriff Office dengan fokus pada patroli wilayah dan penegakan hukum di area terpencil.',
        members: '32 Anggota',
        images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
        altTexts: ['BCSO Tactical 1', 'BCSO Tactical 2', 'BCSO Tactical 3']
      },
      {
        id: 3,
        name: 'SAHP Highway Patrol',
        description: 'San Andreas Highway Patrol yang bertanggung jawab atas keamanan jalan raya dan pengaturan lalu lintas.',
        members: '28 Anggota',
        images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
        altTexts: ['SAHP Highway 1', 'SAHP Highway 2', 'SAHP Highway 3']
      }
    ]
  },
  gang: {
    id: 'gang',
    organizations: [
      {
        id: 1,
        name: 'Ballas Street Kings',
        description: 'Gang jalanan paling dominan di Grove Street dengan kontrol penuh atas wilayah selatan Los Santos.',
        members: '38 Anggota',
        images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
        altTexts: ['Ballas Kings 1', 'Ballas Kings 2', 'Ballas Kings 3']
      },
      {
        id: 2,
        name: 'Los Santos Vagos',
        description: 'Gang veteran dengan tradisi panjang dan jaringan bisnis illegal yang solid di kawasan timur kota.',
        members: '42 Anggota',
        images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
        altTexts: ['Vagos 1', 'Vagos 2', 'Vagos 3']
      },
      {
        id: 3,
        name: 'Families Coalition',
        description: 'Koalisi keluarga gang yang menguasai wilayah perumahan dengan strategi bisnis yang terorganisir.',
        members: '35 Anggota',
        images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
        altTexts: ['Families 1', 'Families 2', 'Families 3']
      }
    ]
  },
  cartel: {
    id: 'cartel',
    organizations: [
      {
        id: 1,
        name: 'Los Santos Cartel',
        description: 'Organisasi kriminal terbesar dengan jaringan internasional dan operasi bisnis yang kompleks.',
        members: '55 Anggota',
        images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
        altTexts: ['LS Cartel 1', 'LS Cartel 2', 'LS Cartel 3']
      },
      {
        id: 2,
        name: 'Sinaloa Syndicate',
        description: 'Sindikat dengan fokus pada logistik dan distribusi dengan teknologi canggih dan keamanan ketat.',
        members: '48 Anggota',
        images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
        altTexts: ['Sinaloa 1', 'Sinaloa 2', 'Sinaloa 3']
      },
      {
        id: 3,
        name: 'Tijuana Brotherhood',
        description: 'Persaudaraan yang menguasai jalur perdagangan lintas batas dengan strategi ekspansi wilayah.',
        members: '41 Anggota',
        images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
        altTexts: ['Tijuana 1', 'Tijuana 2', 'Tijuana 3']
      }
    ]
  },
  mafia: {
    id: 'mafia',
    organizations: [
      {
        id: 1,
        name: 'Torretti Family',
        description: 'Keluarga mafia tertua dengan tradisi bisnis legal dan illegal yang seimbang, menguasai industri konstruksi.',
        members: '52 Anggota',
        images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
        altTexts: ['Torretti 1', 'Torretti 2', 'Torretti 3']
      },
      {
        id: 2,
        name: 'Lucchese Enterprises',
        description: 'Perusahaan dengan jaringan bisnis yang luas dari restoran hingga kasino dengan operasi yang sangat terorganisir.',
        members: '46 Anggota',
        images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
        altTexts: ['Lucchese 1', 'Lucchese 2', 'Lucchese 3']
      },
      {
        id: 3,
        name: 'Corleone Collective',
        description: 'Kolektif yang fokus pada perdagangan seni dan barang antik dengan jaringan kolektor internasional.',
        members: '39 Anggota',
        images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
        altTexts: ['Corleone 1', 'Corleone 2', 'Corleone 3']
      }
    ]
  }
};

// Minimalist Navigation Slider Component
const SliderNavigation = ({ currentIndex, totalSlides, onPrevious, onNext, disabled = false }) => {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      <button
        onClick={onPrevious}
        disabled={disabled}
        className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/30 text-text-primary hover:bg-white/20 hover:border-white/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous organization"
      >
        <FiChevronLeft className="w-5 h-5 group-hover:transform group-hover:-translate-x-0.5 transition-transform duration-200" />
      </button>

      <div className="flex items-center space-x-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'w-8 bg-accent-red'
                : 'w-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={disabled}
        className="group flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/30 text-text-primary hover:bg-white/20 hover:border-white/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next organization"
      >
        <FiChevronRight className="w-5 h-5 group-hover:transform group-hover:translate-x-0.5 transition-transform duration-200" />
      </button>
    </div>
  );
};

// Enhanced Leader Section with Slider
const LeaderSection = ({ data, showSeparator = true }) => {
  const { id, organizations } = data;
  const [currentOrgIndex, setCurrentOrgIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const contentRef = useRef(null);
  const galleryRef = useRef(null);

  const currentOrg = organizations[currentOrgIndex];

  // Optimized navigation handlers with animation
  const handlePrevious = useCallback(() => {
    if (isAnimating) return;
    setCurrentOrgIndex(prev => (prev === 0 ? organizations.length - 1 : prev - 1));
  }, [isAnimating, organizations.length]);

  const handleNext = useCallback(() => {
    if (isAnimating) return;
    setCurrentOrgIndex(prev => (prev === organizations.length - 1 ? 0 : prev + 1));
  }, [isAnimating, organizations.length]);

  // GSAP animations for smooth transitions
  useGSAP(() => {
    if (!contentRef.current || !galleryRef.current) return;

    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false)
    });

    // Fade out current content
    tl.to([contentRef.current, galleryRef.current], {
      opacity: 0,
      y: 20,
      duration: 0.3,
      ease: "power2.inOut"
    })
    // Fade in new content
    .to([contentRef.current, galleryRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    });

  }, [currentOrgIndex]);

  // Section-specific parallax animation
  useGSAP(() => {
    gsap.to(`.${id}-section .img-gallery`, {
      scrollTrigger: {
        trigger: `.${id}-section`,
        start: 'top center',
        end: '80% center',
        scrub: 2
      },
      y: -50,
      duration: 1,
      ease: 'power1.inOut'
    });
  }, [id]);

  return (
    <div className="leaders-container">
      <section className={`leaders-jason ${id}-section`}>
        <div className="leaders-content" ref={contentRef}>
          <h1>{currentOrg.name}</h1>

          <SliderNavigation
            currentIndex={currentOrgIndex}
            totalSlides={organizations.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            disabled={isAnimating}
          />

          <div className="space-y-4">
            <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-6">
              {currentOrg.description}
            </p>

            <div className="text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Anggota:</span>
                <span className="text-accent-red font-medium">{currentOrg.members}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="img-gallery" ref={galleryRef}>
          {currentOrg.images.map((imageSrc, index) => (
            <div key={`${currentOrg.id}-${index}`} className={`jason-${index + 1}`}>
              <img {...safeImg(imageSrc)} alt={currentOrg.altTexts[index]} />
            </div>
          ))}
        </div>
      </section>
      {showSeparator && <div className="leaders-section-separator"></div>}
    </div>
  );
};

// Export individual sections for Features.jsx compatibility
export const PolisiSection = () => {
  const data = useMemo(() => TOP_ORGANIZATIONS_DATA.polisi, []);
  return <LeaderSection data={data} />;
};

export const CartelSection = () => {
  const data = useMemo(() => TOP_ORGANIZATIONS_DATA.cartel, []);
  return <LeaderSection data={data} />;
};

export const GangSection = () => {
  const data = useMemo(() => TOP_ORGANIZATIONS_DATA.gang, []);
  return <LeaderSection data={data} />;
};

export const MafiaSection = () => {
  const data = useMemo(() => TOP_ORGANIZATIONS_DATA.mafia, []);
  return <LeaderSection data={data} showSeparator={false} />;
};

// Main Leaders component with optimized GSAP animations
const Leaders = () => {
  useGSAP(() => {
    // Fade previous features section when entering leaders
    const leadersWrapper = document.querySelector('.leaders-wrapper');
    if (leadersWrapper) {
      gsap.timeline({
        scrollTrigger: {
          trigger: leadersWrapper,
          start: 'top 90%',
          end: '10% center',
          scrub: 2,
        }
      }).to('.features-fade', { opacity: 0, duration: 1, ease: 'power1.inOut' });
    }

    // Enhanced parallax for all gallery sections with performance optimization
    const galleries = gsap.utils.toArray('.img-gallery');

    galleries.forEach((gallery) => {
      const images = gallery.querySelectorAll('img');

      images.forEach((img, imgIndex) => {
        gsap.fromTo(img,
          { y: 50, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: gallery,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
              invalidateOnRefresh: true
            },
            y: -30,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            delay: imgIndex * 0.1
          }
        );
      });
    });

    // Optimized cross-fade transitions between sections
    const containers = gsap.utils.toArray('.leaders-container');

    containers.forEach((container, index) => {
      if (index === 0) return;

      gsap.fromTo(container,
        { opacity: 0.7 },
        {
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1,
            invalidateOnRefresh: true
          },
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut'
        }
      );
    });
  }, []);

  const organizationCategories = useMemo(() => Object.values(TOP_ORGANIZATIONS_DATA), []);

  return (
    <section className="leaders-wrapper">
      {organizationCategories.map((categoryData, index) => (
        <LeaderSection
          key={categoryData.id}
          data={categoryData}
          showSeparator={index < organizationCategories.length - 1}
        />
      ))}
    </section>
  );
};

export default Leaders;