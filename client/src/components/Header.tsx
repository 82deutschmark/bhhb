import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={`fixed w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#1a1a1a] shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          <Link href="/">
            <a className="flex items-center">
              <img
                src="/BHHC-logo-dark.png"
                alt="Big Happy Holdings"
                className="h-12 md:h-16"
              />
            </a>
          </Link>
          <div className="hidden md:flex space-x-8">
            {["About", "Team", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white hover:text-[#ffcc00] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </motion.header>
  );
}