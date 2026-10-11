"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// After a client-side route change (e.g. "Next project"), move focus to the
// new page's title so keyboard and screen-reader users start there instead of
// at the top of the document. Initial loads and hash targets are left alone.
export default function RouteFocus() {
  const pathname = usePathname();
  const previous = useRef(pathname);

  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    if (window.location.hash) return;
    document
      .querySelector<HTMLElement>('main h1[tabindex="-1"]')
      ?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
