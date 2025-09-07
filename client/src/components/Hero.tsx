import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      // Hero animations will be triggered from the main animation system
      if (titleRef.current) titleRef.current.style.opacity = '0';
      if (subtitleRef.current) subtitleRef.current.style.opacity = '0';
      if (buttonsRef.current) buttonsRef.current.style.opacity = '0';
    }
  }, []);

  const downloadResume = async () => {
    try {
      // Fetch the resume from our API
      const response = await fetch('/api/resume/download');
      
      if (!response.ok) {
        console.error('Failed to download resume:', response.statusText);
        return;
      }

      // Create a temporary URL for the file
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      // Create and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Prince_Kumar_Updated_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
    } catch (error) {
      console.error('Error downloading resume:', error);
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center">
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0">
        <iframe 
          src='https://my.spline.design/orb-9auMpnTWSKl924IM8jEPQIqQ/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          style={{ background: 'transparent' }}
          title="3D Orb Animation"
        />
      </div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <h1 
          ref={titleRef}
          className="hero-title text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-light mb-4 sm:mb-6 text-glow leading-tight"
        >
          Hi, I'm <span className="text-accent">Prince Kumar</span>
        </h1>
        <p 
          ref={subtitleRef}
          className="hero-subtitle text-lg sm:text-xl md:text-2xl font-light mb-6 sm:mb-8 text-muted-foreground text-center max-w-3xl mx-auto"
        >
          MERN Stack Developer & AI/ML Enthusiast
        </p>
        <div 
          ref={buttonsRef}
          className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
        >
          <Button
            onClick={downloadResume}
            className="glassmorphic px-6 sm:px-8 py-3 sm:py-4 rounded-full font-light hover:bg-primary transition-all duration-300 btn-glow border-0 text-foreground w-full sm:w-auto min-h-[48px]"
            variant="outline"
          >
            <i className="ph-download-simple mr-2"></i>
            <span className="text-sm sm:text-base">Download Resume</span>
          </Button>
          <Button
            onClick={scrollToContact}
            className="bg-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full font-light hover:bg-secondary transition-all duration-300 btn-glow w-full sm:w-auto min-h-[48px]"
          >
            <i className="ph-briefcase mr-2"></i>
            <span className="text-sm sm:text-base">Hire Me</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
