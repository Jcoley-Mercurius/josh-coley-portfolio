import Hero from "./components/Hero";
import About from "./components/About";
import FeaturedWork from "./components/FeaturedWork";
import Services from "./components/Services";
import WhyWorkWithMe from "./components/WhyWorkWithMe";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <FeaturedWork />
      <Services />
      <WhyWorkWithMe />
      <Contact />
    </>
  );
}
