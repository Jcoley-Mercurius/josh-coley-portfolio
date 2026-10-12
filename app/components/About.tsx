export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-content px-[6%] py-[45px] tablet:px-[5%] tablet:py-[70px]"
    >
      <span className="eyebrow">About Mercurius Solutions</span>
      <h2
        id="about-title"
        className="mt-4 font-display text-[clamp(34px,4vw,56px)] leading-[1.1] font-normal tracking-[-0.03em]"
      >
        Classical inspiration.
        <br />
        Contemporary development.
      </h2>
      <p className="mt-4 max-w-[700px]">
        Josh Coley’s web and product development work, spanning client projects and founder-built
        software. Each case study distinguishes the project’s needs, his contribution, and verified
        implementation evidence.
      </p>
    </section>
  );
}
