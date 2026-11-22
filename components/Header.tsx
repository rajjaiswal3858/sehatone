"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";
import { Menu, Close, ArrowRight } from "./icons";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`header${scrolled ? " is-scrolled" : ""}${open ? " is-open" : ""}`}>
      <div className="wrap header__inner">
        <a href="/" className="header__logo" aria-label="SEHATONE home">
          <Logo />
        </a>
        <nav className="header__nav" aria-label="Primary">
          {nav.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <div className="header__cta">
          <a href="/#contact" className="link-quiet">Contact</a>
          <a href="/#demo" className="btn btn--primary btn--sm">
            Book a demo <ArrowRight size={15} />
          </a>
        </div>
        <button
          className="header__toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <Close size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <div id="mobile-nav" className="mnav" hidden={!open}>
        <nav aria-label="Mobile">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>
          ))}
          <a href="/#contact" onClick={() => setOpen(false)}>Contact</a>
        </nav>
        <a href="/#demo" className="btn btn--primary" onClick={() => setOpen(false)}>
          Book a free demo <ArrowRight size={16} />
        </a>
      </div>
    </header>
  );
}
