import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const safeImg = (src) => ({ src, onError: (e) => { e.currentTarget.src = "/img/logo.png"; } });

export const PolisiSection = () => {
  useGSAP(() => {
    gsap.to('.leaders-jason .img-box', {
      scrollTrigger: {
        trigger: '.leaders-jason',
        start: 'top center',
        end: '80% center',
        scrub: 2
      }, y: -300, duration: 1, ease: 'power1.inOut'
    });
  });

  return (
    <section className="leaders-jason">
      <div className="max-w-lg leaders-content">
        <h1>Polisi</h1>
        <h2>Penjaga ketertiban dengan hirarki jelas dan tindakan tegas.</h2>
        <p>
          Satuan polisi menegakkan hukum, investigasi kriminal, dan patroli terukur.
          Setiap keputusan berdampak pada ekosistem roleplay dan stabilitas kota.
        </p>

        <div className="jason-2">
          <img {...safeImg('/img/polisi.jpg')} alt="Polisi" />
        </div>
      </div>

      <div className="space-y-5 mt-96 img-box">
        <div className="jason-1">
          <img {...safeImg('/img/gallery-1.webp')} alt="Polisi Gallery 1" />
        </div>
        <div className="jason-3">
          <img {...safeImg('/img/gallery-2.webp')} alt="Polisi Gallery 2" />
        </div>
      </div>
    </section>
  );
};

export const CartelSection = () => {
  useGSAP(() => {
    gsap.to('.leaders-lucia .img-box', {
      scrollTrigger: {
        trigger: '.leaders-lucia',
        start: 'top center',
        end: '80% center',
        scrub: 2
      }, y: -200, duration: 1, ease: 'power1.inOut'
    });
  });

  return (
    <section className="leaders-lucia">
      <div className="flex flex-col gap-5 items-end img-box lg:1/2 ps-10 mt-96">
        <div className="lucia-1">
          <img {...safeImg('/img/gallery-3.webp')} alt="Cartel 1" />
        </div>
        <div className="lucia-3">
          <img {...safeImg('/img/gallery-4.webp')} alt="Cartel 3" />
        </div>
      </div>

      <div className="lg:w-1/2 leaders-lucia-content">
        <div className="max-w-xl lg:ps-32 ps-10">
          <h1>Cartel</h1>
          <h2>Organisasi terstruktur dengan strategi bisnis dan wilayah.</h2>
          <p>Cartel mengatur suplai dan distribusi, berkolaborasi dan berkonflik
            dengan faksi lain untuk memperluas pengaruhnya.</p>
        </div>

        <div className="lucia-2">
          <img {...safeImg('/img/stones.webp')} alt="Cartel 2" />
        </div>

        <p className="max-w-xl lg:ps-32 ps-10">Kepemimpinan yang kuat menjaga loyalitas anggota dan
          memastikan operasi berjalan senyap namun efektif.</p>
      </div>
    </section>
  );
};

export const GangSection = () => {
  useGSAP(() => {
    gsap.to('.leaders-jason .img-box', {
      scrollTrigger: {
        trigger: '.leaders-jason',
        start: 'top center',
        end: '80% center',
        scrub: 2
      }, y: -300, duration: 1, ease: 'power1.inOut'
    });
  });

  return (
    <section className="leaders-jason">
      <div className="max-w-lg leaders-content">
        <h1>Gang</h1>
        <h2>Kelompok jalanan dengan identitas, teritori, dan reputasi.</h2>
        <p>
          Gang bergerak lincah dan adaptif. Misi kecil, efek besar - dari
          tagging wilayah hingga operasi cepat yang membentuk narasi kota.
        </p>

        <div className="jason-2">
          <img {...safeImg('/img/swordman.webp')} alt="Gang" />
        </div>
      </div>

      <div className="space-y-5 mt-96 img-box">
        <div className="jason-1">
          <img {...safeImg('/img/gallery-5.webp')} alt="Gang Gallery 1" />
        </div>
        <div className="jason-3">
          <img {...safeImg('/img/about.webp')} alt="Gang Gallery 2" />
        </div>
      </div>
    </section>
  );
};

export const MafiaSection = () => {
  useGSAP(() => {
    gsap.to('.leaders-lucia .img-box', {
      scrollTrigger: {
        trigger: '.leaders-lucia',
        start: 'top center',
        end: '80% center',
        scrub: 2
      }, y: -200, duration: 1, ease: 'power1.inOut'
    });
  });

  return (
    <section className="leaders-lucia">
      <div className="flex flex-col gap-5 items-end img-box lg:1/2 ps-10 mt-96">
        <div className="lucia-1">
          <img {...safeImg('/img/swordman-partial.webp')} alt="Mafia 1" />
        </div>
        <div className="lucia-3">
          <img {...safeImg('/img/entrance.webp')} alt="Mafia 3" />
        </div>
      </div>

      <div className="lg:w-1/2 leaders-lucia-content">
        <div className="max-w-xl lg:ps-32 ps-10">
          <h1>Mafia</h1>
          <h2>Struktur keluarga, strategi rapi, operasi bersih.</h2>
          <p>Mafia menjaga kehormatan dan jaringan bisnis. Kekuatan dibangun
            lewat aliansi, intel, dan langkah yang selalu diperhitungkan.</p>
        </div>

        <div className="lucia-2">
          <img {...safeImg('/img/stones.webp')} alt="Mafia 2" />
        </div>

        <p className="max-w-xl lg:ps-32 ps-10">Puncak kepemimpinan memastikan stabilitas dan kesinambungan
          organisasi dari generasi ke generasi.</p>
      </div>
    </section>
  );
};

const Leaders = () => {
  useGSAP(() => {
    // Overlap for smooth transition from previous section
    gsap.utils.toArray('.leaders-jason').forEach((el) => gsap.set(el, { marginTop: '-80vh' }));
    gsap.utils.toArray('.leaders-lucia').forEach((el) => gsap.set(el, { marginTop: '-80vh' }));

    // Fade previous features section when entering first leaders block
    const firstJason = document.querySelector('.leaders-jason');
    if (firstJason) {
      gsap.timeline({
        scrollTrigger: {
          trigger: firstJason,
          start: 'top 90%',
          end: '10% center',
          scrub: 2,
        }
      }).to('.features-fade', { opacity: 0, duration: 1, ease: 'power1.inOut' });
    }

    // Parallax images in each Jason-like block
    gsap.utils.toArray('.leaders-jason').forEach((section) => {
      const box = section.querySelector('.img-box');
      if (!box) return;
      gsap.to(box, {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: '80% center',
          scrub: 2
        }, y: -300, duration: 1, ease: 'power1.inOut'
      });
    });

    // Cross-fade from each Jason to its following Lucia (subtle)
    gsap.utils.toArray('.leaders-lucia').forEach((section) => {
      const prev = section.previousElementSibling;
      if (!prev) return;
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: '10% center',
          scrub: 2,
        }
      }).to(prev, { opacity: 0.4, duration: 1, ease: 'power1.inOut' });
    });

    // Parallax images in each Lucia-like block
    gsap.utils.toArray('.leaders-lucia').forEach((section) => {
      const box = section.querySelector('.img-box');
      if (!box) return;
      gsap.to(box, {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: '80% center',
          scrub: 2
        }, y: -200, duration: 1, ease: 'power1.inOut'
      });
    });
  });

  return (
    <section className="leaders-wrapper bg-dark-navy">
      {/* Jason-like: Polisi */}
      <section className="leaders-jason">
        <div className="max-w-lg leaders-content">
          <h1>Polisi</h1>
          <h2>Penjaga ketertiban dengan hirarki jelas dan tindakan tegas.</h2>
          <p>
            Satuan polisi menegakkan hukum, investigasi kriminal, dan patroli terukur.
            Setiap keputusan berdampak pada ekosistem roleplay dan stabilitas kota.
          </p>

          <div className="jason-2">
            <img {...safeImg('/img/polisi.jpg')} alt="Polisi" />
          </div>
        </div>

        <div className="space-y-5 mt-96 img-box">
          <div className="jason-1">
            <img {...safeImg('/img/gallery-1.webp')} alt="Polisi Gallery 1" />
          </div>
          <div className="jason-3">
            <img {...safeImg('/img/gallery-2.webp')} alt="Polisi Gallery 2" />
          </div>
        </div>
      </section>

      {/* Lucia-like: Cartel */}
      <section className="leaders-lucia">
        <div className="flex flex-col gap-5 items-end img-box lg:1/2 ps-10 mt-96">
          <div className="lucia-1">
            <img {...safeImg('/img/gallery-3.webp')} alt="Cartel 1" />
          </div>
          <div className="lucia-3">
            <img {...safeImg('/img/gallery-4.webp')} alt="Cartel 3" />
          </div>
        </div>

        <div className="lg:w-1/2 leaders-lucia-content">
          <div className="max-w-xl lg:ps-32 ps-10">
            <h1>Cartel</h1>
            <h2>Organisasi terstruktur dengan strategi bisnis dan wilayah.</h2>
            <p>Cartel mengatur suplai dan distribusi, berkolaborasi dan berkonflik
              dengan faksi lain untuk memperluas pengaruhnya.</p>
          </div>

          <div className="lucia-2">
            <img {...safeImg('/img/stones.webp')} alt="Cartel 2" />
          </div>

          <p className="max-w-xl lg:ps-32 ps-10">Kepemimpinan yang kuat menjaga loyalitas anggota dan
            memastikan operasi berjalan senyap namun efektif.</p>
        </div>
      </section>

      {/* Jason-like: Gang */}
      <section className="leaders-jason">
        <div className="max-w-lg leaders-content">
          <h1>Gang</h1>
          <h2>Kelompok jalanan dengan identitas, teritori, dan reputasi.</h2>
          <p>
            Gang bergerak lincah dan adaptif. Misi kecil, efek besar - dari
            tagging wilayah hingga operasi cepat yang membentuk narasi kota.
          </p>

          <div className="jason-2">
            <img {...safeImg('/img/swordman.webp')} alt="Gang" />
          </div>
        </div>

        <div className="space-y-5 mt-96 img-box">
          <div className="jason-1">
            <img {...safeImg('/img/gallery-5.webp')} alt="Gang Gallery 1" />
          </div>
          <div className="jason-3">
            <img {...safeImg('/img/about.webp')} alt="Gang Gallery 2" />
          </div>
        </div>
      </section>

      {/* Lucia-like: Mafia */}
      <section className="leaders-lucia">
        <div className="flex flex-col gap-5 items-end img-box lg:1/2 ps-10 mt-96">
          <div className="lucia-1">
            <img {...safeImg('/img/swordman-partial.webp')} alt="Mafia 1" />
          </div>
          <div className="lucia-3">
            <img {...safeImg('/img/entrance.webp')} alt="Mafia 3" />
          </div>
        </div>

        <div className="lg:w-1/2 leaders-lucia-content">
          <div className="max-w-xl lg:ps-32 ps-10">
            <h1>Mafia</h1>
            <h2>Struktur keluarga, strategi rapi, operasi bersih.</h2>
            <p>Mafia menjaga kehormatan dan jaringan bisnis. Kekuatan dibangun
              lewat aliansi, intel, dan langkah yang selalu diperhitungkan.</p>
          </div>

          <div className="lucia-2">
            <img {...safeImg('/img/stones.webp')} alt="Mafia 2" />
          </div>

          <p className="max-w-xl lg:ps-32 ps-10">Puncak kepemimpinan memastikan stabilitas dan kesinambungan
            organisasi dari generasi ke generasi.</p>
        </div>
      </section>
    </section>
  );
}

export default Leaders;
