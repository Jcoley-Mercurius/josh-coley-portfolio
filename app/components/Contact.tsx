import ContactForm from "./ContactForm";

const briefPrompts = [
  "What should your website or product help people do?",
  "Who will use it?",
  "What exists today?",
  "What needs to be ready first?",
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-t border-line bg-[#ede5d7]"
    >
      <div className="mx-auto grid max-w-content gap-8 px-[6%] py-10 tablet:px-[5%] tablet:py-[60px] desktop:grid-cols-[1fr_1.2fr] desktop:gap-[60px]">
        <div>
          <span className="eyebrow">Start with the problem</span>
          <h2
            id="contact-title"
            className="mt-4 font-display text-[clamp(34px,4vw,56px)] leading-[1.1] font-normal tracking-[-0.03em]"
          >
            What would you like to build?
          </h2>
          <p className="mt-4 max-w-[650px]">
            Describe your audience, the task you need to support, and where your project stands.
          </p>
          <h3 className="mt-8 font-display text-[23px] font-normal">A useful starting brief</h3>
          <ol className="mt-3 list-decimal space-y-1 pl-5">
            {briefPrompts.map((prompt) => (
              <li key={prompt}>{prompt}</li>
            ))}
          </ol>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
