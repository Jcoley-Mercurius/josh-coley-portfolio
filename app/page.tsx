import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import FeaturedWork from "./components/FeaturedWork";
import Services from "./components/Services";
import WhyWorkWithMe from "./components/WhyWorkWithMe";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <FeaturedWork />
        <Services />
        <WhyWorkWithMe />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
