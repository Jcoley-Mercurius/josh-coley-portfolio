import { useSyncExternalStore } from "react";
import { MOTION_STORAGE_KEY } from "./motion-script";

// Motion is "quiet" when the system asks for reduced motion or the visitor
// turns it off with the footer control (MDS-04). The manual choice lives on
// <html data-motion="off"> so CSS can stop motion without waiting for React,
// and in localStorage so it survives reloads (see motion-script.ts).

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
const listeners = new Set<() => void>();

function subscribeManual(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getManualOff() {
  return document.documentElement.dataset.motion === "off";
}

export function setManualMotionOff(off: boolean) {
  const root = document.documentElement;
  if (off) root.dataset.motion = "off";
  else delete root.dataset.motion;
  try {
    if (off) localStorage.setItem(MOTION_STORAGE_KEY, "off");
    else localStorage.removeItem(MOTION_STORAGE_KEY);
  } catch {
    // Storage can be unavailable (private mode, blocked site data). The
    // choice still applies for this visit.
  }
  listeners.forEach((listener) => listener());
}

function subscribeSystem(onChange: () => void) {
  const query = window.matchMedia(REDUCE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getSystemReduce() {
  return window.matchMedia(REDUCE_QUERY).matches;
}

const serverFalse = () => false;

export function useMotionPreference() {
  const manualOff = useSyncExternalStore(subscribeManual, getManualOff, serverFalse);
  const systemReduce = useSyncExternalStore(subscribeSystem, getSystemReduce, serverFalse);
  return { manualOff, systemReduce, allowed: !manualOff && !systemReduce };
}
