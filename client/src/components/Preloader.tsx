import { useEffect, useRef } from "react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.gsap && progressBarRef.current && preloaderRef.current) {
        // Animate progress bar from 0 to 100%
        window.gsap.to(progressBarRef.current, {
          width: "100%",
          duration: 2,
          ease: "power2.out",
          onComplete: () => {
            // Hide preloader after progress completes
            window.gsap.to(preloaderRef.current, {
              opacity: 0,
              scale: 0.9,
              duration: 1,
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
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div className="text-center">
        <h1 className="text-6xl font-light text-accent mb-8 animate-pulse text-glow">
          Prince Kumar
        </h1>
        <div className="w-80 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            ref={progressBarRef}
            className="progress-bar h-full w-0 rounded-full transition-all duration-300"
          />
        </div>
        <p className="text-muted-foreground mt-4 font-light">Loading Experience...</p>
      </div>
    </div>
  );
}
