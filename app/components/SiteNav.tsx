"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
];

// Disclosure navigation (not a modal, so focus is not trapped). The mobile
// panel closes on Escape (focus returns to the button), a click outside, focus
// leaving the menu, any route or hash change, and widening past 650px.
// Without JavaScript, globals.css hides the button and shows the links inline.
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [openedOn, setOpenedOn] = useState(pathname);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // A route change (including browser back/forward) closes the menu. Adjusted
  // during render, as React recommends for state derived from a prop.
  if (open && openedOn !== pathname) {
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const close = () => setOpen(false);
    const inside = (target: EventTarget | null) =>
      target instanceof Node &&
      (navRef.current?.contains(target) || buttonRef.current?.contains(target));

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!inside(event.target)) close();
    };
    const onFocusIn = (event: FocusEvent) => {
      if (!inside(event.target)) close();
    };
    const wide = window.matchMedia("(min-width: 651px)");
    const onWide = () => wide.matches && close();

    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("focusin", onFocusIn);
    window.addEventListener("hashchange", close);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("hashchange", close);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="menu-toggle a1-btn inline-flex items-center gap-2 tablet:hidden"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => {
          setOpenedOn(pathname);
          setOpen((value) => !value);
        }}
      >
        Menu <span aria-hidden="true">☰</span>
      </button>
      <nav
        ref={navRef}
        id="primary-navigation"
        aria-label="Primary"
        className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col items-stretch gap-4 bg-paper p-6 shadow-[0_15px_20px_#0001] tablet:static tablet:flex tablet:flex-row tablet:items-center tablet:bg-transparent tablet:p-0 tablet:shadow-none desktop:gap-[30px]`}
      >
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={close}>
            {link.label}
          </Link>
        ))}
        <Link href="/#contact" className="a1-btn text-center" onClick={close}>
          Discuss a project <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </>
  );
}
