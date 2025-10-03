import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  // Animated rotating text
  const roles = [
    "MERN Stack Developer",
    "AI/ML Enthusiast",
    "n8n Agentic Workflow Expert"
  ];
  const [currentRole, setCurrentRole] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Text cycling animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;

    // Force visibility on mobile immediately
    if (isMobile) {
      const forceShow = () => {
        if (titleRef.current) {
          titleRef.current.style.opacity = '1';
          titleRef.current.style.transform = 'translateY(0px)';
          titleRef.current.style.visibility = 'visible';
          titleRef.current.style.display = 'block';
        }
        if (subtitleRef.current) {
          subtitleRef.current.style.opacity = '1';
          subtitleRef.current.style.transform = 'translateY(0px)';
          subtitleRef.current.style.visibility = 'visible';
          subtitleRef.current.style.display = 'block';
        }
        if (buttonsRef.current) {
          buttonsRef.current.style.opacity = '1';
          buttonsRef.current.style.transform = 'translateY(0px)';
          buttonsRef.current.style.visibility = 'visible';
          buttonsRef.current.style.display = 'flex';
        }
      };

      // Force show immediately and again after small delay
      forceShow();
      setTimeout(forceShow, 100);
      setTimeout(forceShow, 500);

    } else if (typeof window !== 'undefined' && window.gsap) {
      // Desktop: Set up for animations
      if (titleRef.current) {
        titleRef.current.style.opacity = '0';
        titleRef.current.style.transform = 'translateY(20px)';
      }
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = '0';
        subtitleRef.current.style.transform = 'translateY(15px)';
      }
      if (buttonsRef.current) {
        buttonsRef.current.style.opacity = '0';
        buttonsRef.current.style.transform = 'translateY(10px)';
      }
    } else {
      // Fallback for when GSAP is not available
      if (titleRef.current) titleRef.current.style.opacity = '1';
      if (subtitleRef.current) subtitleRef.current.style.opacity = '1';
      if (buttonsRef.current) buttonsRef.current.style.opacity = '1';
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
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 z-0 animate-gradient-shift"
        style={{
          background: 'linear-gradient(-45deg, hsl(240, 10%, 3.9%), hsl(240, 10%, 5%), hsl(45, 100%, 15%), hsl(240, 10%, 3.9%))',
          backgroundSize: '400% 400%'
        }}
      ></div>

      {/* Spline 3D Scene */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <iframe
          src='https://my.spline.design/tvatimedoor-Ma5V5HRHuD3vpNuao3Dznnfy/'
          frameBorder='0'
          width='100%'
          height='100%'
          className="spline-iframe"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <h1
          ref={titleRef}
          className="hero-title text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-light mb-4 sm:mb-6 text-glow leading-tight"
          style={{ opacity: 1, transform: 'translateY(0px)' }}
        >
          Hi, I'm <span className="text-gate-theme">Prince Kumar</span>
        </h1>
        <p
          ref={subtitleRef}
          className={`hero-subtitle text-lg sm:text-xl md:text-2xl font-light mb-6 sm:mb-8 text-muted-foreground text-center max-w-3xl mx-auto transition-all duration-500 ${isAnimating ? 'opacity-20 scale-95' : 'opacity-100 scale-100'}`}
          style={{ opacity: 1, transform: 'translateY(0px)' }}
        >
          <span className="text-gate-theme font-semibold">{roles[currentRole]}</span>
        </p>
        <div
          ref={buttonsRef}
          className="hero-buttons flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          style={{ opacity: 1, transform: 'translateY(0px)' }}
        >
          <Button
            onClick={downloadResume}
            className="glassmorphic px-6 sm:px-8 py-3 sm:py-4 rounded-full font-light hover:bg-primary transition-all duration-150 btn-glow border-0 text-foreground w-full sm:w-auto min-h-[48px]"
            variant="outline"
          >
            <i className="ph-download-simple mr-2"></i>
            <span className="text-sm sm:text-base">Download Resume</span>
          </Button>
          <Button
            onClick={scrollToContact}
            className="bg-primary px-6 sm:px-8 py-3 sm:py-4 rounded-full font-light hover:bg-secondary transition-all duration-150 btn-glow w-full sm:w-auto min-h-[48px]"
          >
            <i className="ph-briefcase mr-2"></i>
            <span className="text-sm sm:text-base">Hire Me</span>
          </Button>
        </div>
      </div>
    </section>
  );
}