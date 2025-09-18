import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const safeImg = (src) => ({ src, onError: (e) => { e.currentTarget.src = "/img/logo.png"; } });

export const PolisiSection = () => {
  useGSAP(() => {
    gsap.to('.leaders-jason .img-gallery', {
      scrollTrigger: {
        trigger: '.leaders-jason',
        start: 'top center',
        end: '80% center',
        scrub: 2
      }, y: -50, duration: 1, ease: 'power1.inOut'
    });
  });

  return (
    <div className="leaders-container">
      <section className="leaders-jason">
        <div className="leaders-content">
          <h1>Polisi</h1>
          <h2>Penjaga ketertiban dengan hirarki jelas dan tindakan tegas.</h2>
          <p>
            Satuan polisi menegakkan hukum, investigasi kriminal, dan patroli terukur.
            Setiap keputusan berdampak pada ekosistem roleplay dan stabilitas kota.
          </p>
        </div>

        <div className="img-gallery">
          <div className="jason-1">
            <img {...safeImg('/img/gallery-1.webp')} alt="Polisi Gallery 1" />
          </div>
          <div className="jason-2">
            <img {...safeImg('/img/polisi.jpg')} alt="Polisi" />
          </div>
          <div className="jason-3">
            <img {...safeImg('/img/gallery-2.webp')} alt="Polisi Gallery 2" />
          </div>
        </div>
      </section>
      <div className="leaders-section-separator"></div>
    </div>
  );
};

export const CartelSection = () => {
  useGSAP(() => {
    gsap.to('.leaders-lucia .img-gallery', {
      scrollTrigger: {
        trigger: '.leaders-lucia',
        start: 'top center',
        end: '80% center',
        scrub: 2
      }, y: -50, duration: 1, ease: 'power1.inOut'
    });
  });

  return (
    <div className="leaders-container">
      <section className="leaders-lucia">
        <div className="img-gallery">
          <div className="lucia-1">
            <img {...safeImg('/img/gallery-3.webp')} alt="Cartel 1" />
          </div>
          <div className="lucia-2">
            <img {...safeImg('/img/stones.webp')} alt="Cartel 2" />
          </div>
          <div className="lucia-3">
            <img {...safeImg('/img/gallery-4.webp')} alt="Cartel 3" />
          </div>
        </div>

        <div className="leaders-lucia-content">
          <h1>Cartel</h1>
          <h2>Organisasi terstruktur dengan strategi bisnis dan wilayah.</h2>
          <p>Cartel mengatur suplai dan distribusi, berkolaborasi dan berkonflik
            dengan faksi lain untuk memperluas pengaruhnya.</p>
          <p>Kepemimpinan yang kuat menjaga loyalitas anggota dan
            memastikan operasi berjalan senyap namun efektif.</p>
        </div>
      </section>
      <div className="leaders-section-separator"></div>
    </div>
  );
};

export const GangSection = () => {
  useGSAP(() => {
    gsap.to('.gang-section .img-gallery', {
      scrollTrigger: {
        trigger: '.gang-section',
        start: 'top center',
        end: '80% center',
        scrub: 2
      }, y: -50, duration: 1, ease: 'power1.inOut'
    });
  });

  return (
    <div className="leaders-container">
      <section className="leaders-jason gang-section">
        <div className="leaders-content">
          <h1>Gang</h1>
          <h2>Kelompok jalanan dengan identitas, teritori, dan reputasi.</h2>
          <p>
            Gang bergerak lincah dan adaptif. Misi kecil, efek besar - dari
            tagging wilayah hingga operasi cepat yang membentuk narasi kota.
          </p>
        </div>

        <div className="img-gallery">
          <div className="jason-1">
            <img {...safeImg('/img/gallery-5.webp')} alt="Gang Gallery 1" />
          </div>
          <div className="jason-2">
            <img {...safeImg('/img/swordman.webp')} alt="Gang" />
          </div>
          <div className="jason-3">
            <img {...safeImg('/img/about.webp')} alt="Gang Gallery 2" />
          </div>
        </div>
      </section>
      <div className="leaders-section-separator"></div>
    </div>
  );
};

export const MafiaSection = () => {
  useGSAP(() => {
    gsap.to('.mafia-section .img-gallery', {
      scrollTrigger: {
        trigger: '.mafia-section',
        start: 'top center',
        end: '80% center',
        scrub: 2
      }, y: -50, duration: 1, ease: 'power1.inOut'
    });
  });

  return (
    <div className="leaders-container">
      <section className="leaders-lucia mafia-section">
        <div className="img-gallery">
          <div className="lucia-1">
            <img {...safeImg('/img/swordman-partial.webp')} alt="Mafia 1" />
          </div>
          <div className="lucia-2">
            <img {...safeImg('/img/stones.webp')} alt="Mafia 2" />
          </div>
          <div className="lucia-3">
            <img {...safeImg('/img/entrance.webp')} alt="Mafia 3" />
          </div>
        </div>

        <div className="leaders-lucia-content">
          <h1>Mafia</h1>
          <h2>Struktur keluarga, strategi rapi, operasi bersih.</h2>
          <p>Mafia menjaga kehormatan dan jaringan bisnis. Kekuatan dibangun
            lewat aliansi, intel, dan langkah yang selalu diperhitungkan.</p>
          <p>Puncak kepemimpinan memastikan stabilitas dan kesinambungan
            organisasi dari generasi ke generasi.</p>
        </div>
      </section>
    </div>
  );
};

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

    // Enhanced parallax for all gallery sections
    gsap.utils.toArray('.img-gallery').forEach((gallery, index) => {
      const images = gallery.querySelectorAll('img');

      images.forEach((img, imgIndex) => {
        gsap.fromTo(img,
          { y: 50, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: gallery,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5
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

    // Subtle cross-fade transitions between sections
    gsap.utils.toArray('.leaders-container').forEach((container, index) => {
      if (index === 0) return; // Skip first section

      gsap.fromTo(container,
        { opacity: 0.7 },
        {
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
          },
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut'
        }
      );
    });
  });

  return (
    <section className="leaders-wrapper">
      <PolisiSection />
      <CartelSection />
      <GangSection />
      <MafiaSection />
    </section>
  );
}

export default Leaders;
