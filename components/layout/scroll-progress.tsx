"use client";

import { useEffect, useState } from "react";

const SECTIONS = ["home", "about", "how-it-works", "calculator", "products", "testimonials", "radio-promo", "faqs", "contact"];

export function ScrollProgress() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const handle = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let idx = 0;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.offsetTop <= scrollY) { idx = i; break; }
      }
      setActive(idx);
    };
    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  return (
    <nav className="fixed right-3 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-2" aria-label="Section navigation">
      {SECTIONS.map((id, i) => (
        <a
          key={id}
          href={`#${id}`}
          className={`block rounded-full transition-all duration-300 ${
            i === active ? "w-2 h-2 bg-gold-500" : "w-1.5 h-1.5 bg-surface-600 hover:bg-surface-500"
          }`}
          aria-label={`Go to ${id}`}
        />
      ))}
    </nav>
  );
}
