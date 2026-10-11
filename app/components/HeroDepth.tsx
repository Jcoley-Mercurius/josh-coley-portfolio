"use client";

import { scroll } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { useMotionPreference } from "../_lib/motion-preference";

// Prototype depth: the artwork drifts down by scrollY × 0.06, capped at
// mds/tokens.json motion.heroDepthMaxPx. Desktop only (MDS-04, "bounded
// desktop hero depth"). This component only feeds --hero-depth; the
// transform itself belongs to .hero-art img in globals.css.
const DEPTH_RATE = 0.06;
const DEPTH_MAX = 32;
const DESKTOP = "(min-width: 901px)";

export default function HeroDepth({ children }: { children: ReactNode }) {
  const layer = useRef<HTMLDivElement>(null);
  const { allowed } = useMotionPreference();

  useEffect(() => {
    const element = layer.current;
    if (!allowed || !element) return;

    const desktop = window.matchMedia(DESKTOP);
    let stopScroll: VoidFunction | undefined;
    let last = 0;

    const reset = () => {
      stopScroll?.();
      stopScroll = undefined;
      last = 0;
      element.style.removeProperty("--hero-depth");
    };

    const start = () => {
      reset();
      if (!desktop.matches) return;
      // Two parameters, so framer passes scroll info (it checks arity).
      stopScroll = scroll((_progress: number, info) => {
        const depth = Math.min(Math.round(info.y.current * DEPTH_RATE), DEPTH_MAX);
        if (depth === last) return;
        last = depth;
        element.style.setProperty("--hero-depth", `${depth}px`);
      });
    };

    start();
    desktop.addEventListener("change", start);
    return () => {
      desktop.removeEventListener("change", start);
      reset();
    };
  }, [allowed]);

  return (
    <div ref={layer} className="hero-art-layer">
      {children}
    </div>
  );
}
