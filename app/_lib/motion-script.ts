// Server-safe half of the motion preference (the hook is in
// motion-preference.ts, which only client components may import).

export const MOTION_STORAGE_KEY = "mercurius-motion";

// Runs inline in <head>, before first paint: restores a saved "Motion: off"
// and sets data-js, which switches off the no-JavaScript fallbacks in
// globals.css.
export const motionScript = `(function(){var d=document.documentElement;d.setAttribute("data-js","");try{if(localStorage.getItem("${MOTION_STORAGE_KEY}")==="off")d.setAttribute("data-motion","off")}catch(e){}})()`;
