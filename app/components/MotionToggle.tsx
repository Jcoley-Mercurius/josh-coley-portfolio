"use client";

import { setManualMotionOff, useMotionPreference } from "../_lib/motion-preference";

// Footer control from the prototype ("Motion: on/off"). A switch whose name
// stays "Motion" while its state is read from aria-checked. When the system
// asks for reduced motion the switch stays focusable but locked off, and says
// why, instead of disappearing from the tab order.
export default function MotionToggle() {
  const { manualOff, systemReduce, allowed } = useMotionPreference();

  return (
    <button
      type="button"
      role="switch"
      aria-label="Motion"
      aria-checked={allowed}
      aria-disabled={systemReduce || undefined}
      aria-describedby={systemReduce ? "motion-system-note" : undefined}
      className="motion-toggle self-start tablet:self-center"
      onClick={() => {
        if (!systemReduce) setManualMotionOff(!manualOff);
      }}
    >
      Motion: {allowed ? "on" : "off"}
      {systemReduce && <span id="motion-system-note"> (system setting)</span>}
    </button>
  );
}
