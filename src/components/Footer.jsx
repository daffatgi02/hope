import { FaDiscord, FaTwitter, FaYoutube, FaMedium } from "react-icons/fa";

const socialLinks = [
  { href: "https://discord.com", icon: <FaDiscord /> },
  { href: "https://twitter.com", icon: <FaTwitter /> },
  { href: "https://youtube.com", icon: <FaYoutube /> },
  { href: "https://medium.com", icon: <FaMedium /> },
];

const Footer = () => {
  return (
    <footer className="w-screen bg-gradient-to-r from-primary-red to-primary-dark py-4 text-text-primary shadow-lg">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-center text-sm font-light md:text-left">
          ©IME Roleplay 2024. Server Roleplay Terbaik
        </p>

        <div className="flex justify-center gap-4  md:justify-start">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-primary/80 transition-colors duration-500 ease-in-out hover:scale-110 hover:text-text-accent"
            >
              {link.icon}
            </a>
          ))}
        </div>

        <a
          href="#server-rules"
          className="text-center text-sm font-light hover:underline md:text-right"
        >
          Server Rules
        </a>
      </div>
    </footer>
  );
};

export default Footer;
