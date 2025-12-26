import { useState, useEffect } from "react";
import { Link } from "react-router";
import Button from "../ui/Button";

export function Header() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["a-propos", "fonctionnalites", "equipe"];
      const scrollPosition = window.scrollY + 100; // Offset for sticky header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "À propos", href: "#a-propos", id: "a-propos" },
    { name: "Fonctionnalités", href: "#fonctionnalites", id: "fonctionnalites" },
    { name: "Équipe", href: "#equipe", id: "equipe" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo / Title */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#006d77] flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">CA</span>
          </div>
          <h1 className="font-semibold text-[#006d77] tracking-tight">
            Cabinet Dr. Amrani
          </h1>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-1 bg-secondary/50 p-1 rounded-full border border-border/50 backdrop-blur-sm">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-out z-10 ${
                activeSection === link.id
                  ? "text-white bg-[#006d77]"
                  : "text-[#006d77] hover:text-[#005f66]"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CTA */}
        <Link to="/dashboard">
          <Button className="bg-[#006d77] text-white shadow-none hover:bg-[#005f66] hover:shadow-md transition-shadow">
            Accès Cabinet
          </Button>
        </Link>
      </nav>
    </header>
  );
}

export default Header;