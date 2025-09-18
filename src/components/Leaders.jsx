import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useMemo } from "react";

gsap.registerPlugin(ScrollTrigger);

const safeImg = (src) => ({ src, onError: (e) => { e.currentTarget.src = "/img/logo.png"; } });

// Configuration data for all leader sections
const LEADERS_DATA = [
  {
    id: 'polisi',
    title: 'Polisi',
    subtitle: 'Penjaga ketertiban dengan hirarki jelas dan tindakan tegas.',
    description: [
      'Satuan polisi menegakkan hukum, investigasi kriminal, dan patroli terukur. Setiap keputusan berdampak pada ekosistem roleplay dan stabilitas kota.'
    ],
    images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
    altTexts: ['Polisi Gallery 1', 'Polisi', 'Polisi Gallery 2']
  },
  {
    id: 'cartel',
    title: 'Cartel',
    subtitle: 'Organisasi terstruktur dengan strategi bisnis dan wilayah.',
    description: [
      'Cartel mengatur suplai dan distribusi, berkolaborasi dan berkonflik dengan faksi lain untuk memperluas pengaruhnya.',
      'Kepemimpinan yang kuat menjaga loyalitas anggota dan memastikan operasi berjalan senyap namun efektif.'
    ],
    images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
    altTexts: ['Cartel 1', 'Cartel 2', 'Cartel 3']
  },
  {
    id: 'gang',
    title: 'Gang',
    subtitle: 'Kelompok jalanan dengan identitas, teritori, dan reputasi.',
    description: [
      'Gang bergerak lincah dan adaptif. Misi kecil, efek besar - dari tagging wilayah hingga operasi cepat yang membentuk narasi kota.'
    ],
    images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
    altTexts: ['Gang Gallery 1', 'Gang', 'Gang Gallery 2']
  },
  {
    id: 'mafia',
    title: 'Mafia',
    subtitle: 'Struktur keluarga, strategi rapi, operasi bersih.',
    description: [
      'Mafia menjaga kehormatan dan jaringan bisnis. Kekuatan dibangun lewat aliansi, intel, dan langkah yang selalu diperhitungkan.',
      'Puncak kepemimpinan memastikan stabilitas dan kesinambungan organisasi dari generasi ke generasi.'
    ],
    images: ['/img/gallery-5.webp', '/img/gallery-5.webp', '/img/gallery-5.webp'],
    altTexts: ['Mafia 1', 'Mafia 2', 'Mafia 3']
  }
];

// Reusable LeaderSection component
const LeaderSection = ({ data, showSeparator = true }) => {
  const { id, title, subtitle, description, images, altTexts } = data;

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
        <div className="leaders-content">
          <h1>{title}</h1>
          <h2>{subtitle}</h2>
          {description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="img-gallery">
          {images.map((imageSrc, index) => (
            <div key={index} className={`jason-${index + 1}`}>
              <img {...safeImg(imageSrc)} alt={altTexts[index]} />
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
  const data = useMemo(() => LEADERS_DATA.find(item => item.id === 'polisi'), []);
  return <LeaderSection data={data} />;
};

export const CartelSection = () => {
  const data = useMemo(() => LEADERS_DATA.find(item => item.id === 'cartel'), []);
  return <LeaderSection data={data} />;
};

export const GangSection = () => {
  const data = useMemo(() => LEADERS_DATA.find(item => item.id === 'gang'), []);
  return <LeaderSection data={data} />;
};

export const MafiaSection = () => {
  const data = useMemo(() => LEADERS_DATA.find(item => item.id === 'mafia'), []);
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
              invalidateOnRefresh: true // Better performance on resize
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
      if (index === 0) return; // Skip first section

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

  return (
    <section className="leaders-wrapper">
      {LEADERS_DATA.map((leaderData, index) => (
        <LeaderSection
          key={leaderData.id}
          data={leaderData}
          showSeparator={index < LEADERS_DATA.length - 1}
        />
      ))}
    </section>
  );
};

export default Leaders;