// Runs inline in <head>, before first paint: sets data-js, which switches off
// the no-JavaScript fallbacks in globals.css.
export const motionScript = `document.documentElement.setAttribute("data-js","")`;
