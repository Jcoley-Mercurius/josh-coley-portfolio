import { useSyncExternalStore } from "react";

// Motion is quiet when the system asks for reduced motion (MDS-04). CSS
// handles entrance and card motion through the media query; this hook lets
// script-driven motion (HeroDepth) follow the same preference.

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCE_QUERY);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getAllowed() {
  return !window.matchMedia(REDUCE_QUERY).matches;
}

// The server cannot know the preference; HeroDepth only starts after mount.
const serverAllowed = () => false;

export function useMotionPreference() {
  const allowed = useSyncExternalStore(subscribe, getAllowed, serverAllowed);
  return { allowed };
}
