const steps = [
  {
    title: "Define the product",
    body: "Clarify who it serves, the problem, and what success means. You receive a fixed quote for that scope before work begins.",
  },
  {
    title: "Design the experience",
    body: "Map pages, interactions, responsive layouts, and the states people encounter.",
  },
  {
    title: "Build and verify",
    body: "Implement the agreed experience and collect evidence of what works.",
  },
];

export default function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="mx-auto grid max-w-content gap-[30px] px-[6%] py-[45px] tablet:grid-cols-[1fr_1.4fr] tablet:px-[5%] tablet:py-[70px] desktop:gap-[60px]"
    >
      <div>
        <span className="eyebrow">The Mercurius approach</span>
        <h2
          id="approach-title"
          className="mt-4 font-display text-[clamp(34px,4vw,56px)] leading-[1.1] font-normal tracking-[-0.03em]"
        >
          Purpose.
          <br />
          Form.
          <br />
          Function.
        </h2>
        <p className="mt-4">Product, design, and technology decisions brought together.</p>
      </div>
      <ol>
        {steps.map((step, index) => (
          <li key={step.title} className="border-b border-line py-5">
            <h3 className="font-display text-[26px] leading-[1.1] font-normal">
              <span className="mr-1 align-middle font-sans text-xs text-bronze">
                0{index + 1} /
              </span>{" "}
              {step.title}
            </h3>
            <p className="mt-3">{step.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
