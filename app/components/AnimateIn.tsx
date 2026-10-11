"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMotionPreference } from "../_lib/motion-preference";

interface AnimateInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  once?: boolean;
}

const directionOffset = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
  none: { x: 0, y: 0 },
};

// Legacy section entrance. Driven by `animate` (not whileInView) so turning
// motion off reveals everything at once, including sections not yet scrolled
// to. The server renders the hidden state; .animate-in in globals.css keeps
// it visible when JavaScript never runs.
export default function AnimateIn({
  children,
  className,
  delay = 0,
  direction = "up",
  duration = 0.6,
  once = true,
}: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  const { allowed } = useMotionPreference();
  const offset = directionOffset[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: allowed
        ? { duration, delay, ease: [0.4, 0, 0.2, 1] }
        : { duration: 0 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className ? `animate-in ${className}` : "animate-in"}
      initial="hidden"
      animate={inView || !allowed ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
