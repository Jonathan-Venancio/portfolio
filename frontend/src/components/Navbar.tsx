import { useState, useEffect } from "react";
import { Shield, Menu, X } from "lucide-react";

const links = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#trajetoria", label: "Trajetória" },
  { href: "#servicos", label: "Serviços" },
  { href: "#projetos", label: "Projetos" },
  { href: "#competencias", label: "Competências" },
  { href: "#contato", label: "Contato" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || open ? "bg-background/90 backdrop-blur-md border-b border-border" : ""}`}>
      <div className="container flex items-center justify-between h-16 px-4">
        <a href="#inicio" className="flex items-center gap-2 font-heading font-bold text-foreground" onClick={() => setOpen(false)}>
          <Shield className="w-5 h-5 text-primary" aria-hidden="true" />
          <span>JV</span>
        </a>

        <div className="hidden md:flex items-center gap-5 text-sm font-mono">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-muted-foreground hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-out border-b border-border bg-background/95 backdrop-blur-md ${
          open ? "max-h-[36rem]" : "max-h-0 border-b-0"
        }`}
      >
        <div className="container px-4 py-4 flex flex-col gap-1 font-mono text-sm">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-3 py-3 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary/60 transition-colors"
            >
              <span className="text-primary mr-2">&gt;</span>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
