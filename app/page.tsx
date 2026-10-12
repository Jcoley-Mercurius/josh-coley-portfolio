import Hero from "./components/Hero";
import SelectedWork from "./components/SelectedWork";
import About from "./components/About";
import Services from "./components/Services";
import Approach from "./components/Approach";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <Services />
      <Approach />
      <About />
      <Contact />
    </>
  );
}
