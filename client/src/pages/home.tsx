import { useEffect } from "react";
import Preloader from "@/components/Preloader";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import { useGSAP } from "@/hooks/use-gsap";

export default function Home() {
  const { isLoaded, initializeAnimations } = useGSAP();

  useEffect(() => {
    // Register GSAP plugins
    if (typeof window !== 'undefined' && window.gsap) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-inter overflow-x-hidden">
      <Preloader onComplete={initializeAnimations} />
      <BackgroundOrbs />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
