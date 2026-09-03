"use client";

import { useEffect, useRef } from "react";

/** Replica o hook useReveal do site original: adiciona `${baseClass}--in`
 * quando o elemento entra na viewport (IntersectionObserver). */
export function useReveal(baseClass = "reveal", threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add(baseClass + "--in");
            io.unobserve(el);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [baseClass, threshold]);

  return ref;
}

/** Replica o useRevealGroup: observa filhos que casam com o seletor e
 * marca cada um com `${classe}--in` ao entrar na tela. */
export function useRevealGroup(selector = ".reveal", classList = "reveal", threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll(selector);
    const bases = classList.split(",").map((s) => s.trim()).filter(Boolean);
    const markIn = (el: Element) => {
      bases.forEach((b) => {
        if (el.classList.contains(b)) el.classList.add(b + "--in");
      });
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            markIn(e.target);
            io.unobserve(e.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [selector, classList, threshold]);

  return ref;
}
