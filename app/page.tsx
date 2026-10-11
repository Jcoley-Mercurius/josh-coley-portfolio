import Hero from "./components/Hero";
import SelectedWork from "./components/SelectedWork";
import About from "./components/About";
import Services from "./components/Services";
import WhyWorkWithMe from "./components/WhyWorkWithMe";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <About />
      <Services />
      <WhyWorkWithMe />
    </>
  );
}
