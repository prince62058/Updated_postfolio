import { useState, useCallback } from "react";
import { initializeScrollAnimations, initializeHeroAnimations, initializeFloatingAnimations } from "@/lib/animations";

export function useGSAP() {
  const [isLoaded, setIsLoaded] = useState(false);

  const initializeAnimations = useCallback(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      // Initialize all animations
      initializeHeroAnimations();
      initializeScrollAnimations();
      initializeFloatingAnimations();
      setIsLoaded(true);
    }
  }, []);

  return {
    isLoaded,
    initializeAnimations
  };
}
