import { useEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    const progressDuration = isMobile ? 1.5 : 2;
    const hideDuration = isMobile ? 0.4 : 0.6;
    const initialDelay = isMobile ? 200 : 300;
    
    const timer = setTimeout(() => {
      if (progressBarRef.current && preloaderRef.current) {
        // Animate progress bar from 0 to 100%
        gsap.to(progressBarRef.current, {
          width: "100%",
          duration: progressDuration,
          ease: "power2.out",
          onComplete: () => {
            // Hide preloader after progress completes
            gsap.to(preloaderRef.current, {
              opacity: 0,
              scale: 0.95,
              duration: hideDuration,
              ease: "power2.inOut",
              onComplete: () => {
                if (preloaderRef.current) {
                  preloaderRef.current.style.display = "none";
                }
                onComplete();
              }
            });
          }
        });
      } else {
        // Fallback without animation
        setTimeout(() => {
          if (preloaderRef.current) {
            preloaderRef.current.style.display = "none";
          }
          onComplete();
        }, 2000);
      }
    }, initialDelay);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="text-center w-full flex flex-col items-center justify-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-accent mb-6 sm:mb-8 animate-pulse text-glow px-4">
          Prince Kumar
        </h1>
        <div className="w-64 sm:w-80 h-1 bg-muted rounded-full overflow-hidden mx-auto">
          <div 
            ref={progressBarRef}
            className="progress-bar h-full w-0 rounded-full transition-all duration-300"
          />
        </div>
        <p className="text-muted-foreground mt-3 sm:mt-4 font-light text-sm sm:text-base px-4">Loading Experience...</p>
      </div>
    </div>
  );
}
