import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import Capabilities from "../components/Capabilities";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Footer from "../components/Footer";

export default function HomePage() {
  return (
    <>
      <main>
        <Hero />
        <Marquee />
        <Capabilities />
        <Projects />
        <Experience />
        <Education />
      </main>
      <Footer />
    </>
  );
}
