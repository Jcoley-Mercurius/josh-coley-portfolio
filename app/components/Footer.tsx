import MotionToggle from "./MotionToggle";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col justify-between gap-[25px] border-t border-line px-[6%] py-10 text-xs tablet:flex-row tablet:items-center tablet:px-[5%]">
      <span>© {year} Mercurius Solutions</span>
      <MotionToggle />
      <span>Project evidence under review</span>
    </footer>
  );
}
