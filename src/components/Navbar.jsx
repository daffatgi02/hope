import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";
import { HiMenuAlt3, HiX } from "react-icons/hi";

import Button from "./Button";

const navItems = ["Server", "Rules", "Jobs", "About", "Discord"];

const NavBar = () => {
  const navContainerRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (currentScrollY < window.innerHeight * 0.8) {
      // In hero section: hide navbar completely
      setIsNavVisible(false);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down after hero: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between rounded-lg border border-white/10 bg-primary-red/90 px-4 py-3 shadow-lg backdrop-blur-md">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-white/10 blur-sm"></div>
              <img src="/img/logo.png" alt="IME Roleplay" className="relative w-10 drop-shadow-lg" />
            </div>
          </div>

          {/* Mobile Brand Text - Center */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
            <span className="font-zentry text-lg font-bold text-text-primary">IME Roleplay</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <div className="flex items-center gap-6">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <Button
              id="connect-button"
              title="Connect"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-accent-red hover:bg-accent-hover flex items-center justify-center gap-2 text-text-primary shadow-md px-4 py-2 text-sm"
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-text-primary transition-colors hover:text-text-accent md:hidden"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute inset-x-0 top-full mt-2 md:hidden">
            <div className="mx-4 rounded-lg border border-white/10 bg-primary-red/95 shadow-xl backdrop-blur-md">
              <div className="flex flex-col space-y-4 p-4">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item.toLowerCase()}`}
                    className="py-2 text-center text-sm font-medium text-text-primary transition-colors hover:text-text-accent"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <div className="border-t border-white/10 pt-4">
                  <Button
                    id="mobile-connect-button"
                    title="Connect"
                    rightIcon={<TiLocationArrow />}
                    containerClass="bg-accent-red hover:bg-accent-hover flex items-center justify-center gap-2 text-text-primary shadow-md w-full py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default NavBar;
