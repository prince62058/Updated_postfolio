declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

// Initialize optimized smooth scroll for the entire site
export function initializeSmoothScroll() {
  if (typeof window === 'undefined') return;

  // Disable default scroll behavior to prevent conflicts
  document.documentElement.style.scrollBehavior = 'auto';

  // Optimized smooth scroll for internal links
  const smoothScrollTo = (target: string) => {
    const element = document.getElementById(target);
    if (element && window.gsap) {
      window.gsap.to(window, {
        duration: 0.3,
        scrollTo: {
          y: element,
          offsetY: 80
        },
        ease: 'power1.inOut'
      });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Optimize scroll performance on mobile
  if (window.innerWidth <= 768) {
    // Debounce scroll events to prevent lag
    let scrollTimeout: number;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        // Force hardware acceleration
        document.body.style.transform = 'translateZ(0)';
      }, 16);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Optimize touch events
    document.addEventListener('touchstart', () => {
      // Enable momentum scrolling
      (document.body.style as any).webkitOverflowScrolling = 'touch';
    }, { passive: true });
    
    document.addEventListener('touchmove', (e) => {
      // Allow natural scrolling behavior
      const target = e.target as Element;
      if (!target.closest('.overflow-x-auto, input, textarea')) {
        // Don't prevent default for main page scrolling
        return;
      }
    }, { passive: true });
  }

  // Add smooth scroll to navigation links
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="#"], button[data-scroll-to]');
    
    if (link) {
      e.preventDefault();
      const href = link.getAttribute('href') || link.getAttribute('data-scroll-to');
      if (href && href.startsWith('#')) {
        const targetId = href.substring(1);
        smoothScrollTo(targetId);
      }
    }
  });
}

export function initializeHeroAnimations() {
  if (typeof window === 'undefined' || !window.gsap) return;

  const { gsap } = window;
  const isMobile = window.innerWidth <= 768;

  // Force immediate visibility on mobile
  if (isMobile) {
    gsap.set('.hero-title, .hero-subtitle, .hero-buttons', { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)' 
    });
    return; // Skip complex animations on mobile
  }

  // Desktop animations only
  const timeline = gsap.timeline({ delay: 0.2 });
  
  timeline
    .fromTo('.hero-title', {
      opacity: 0,
      y: 30,
      filter: 'blur(3px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.25,
      ease: 'power2.out'
    })
    .fromTo('.hero-subtitle', {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.15,
      ease: 'power2.out'
    }, '-=0.2')
    .fromTo('.hero-buttons', {
      opacity: 0,
      y: 15
    }, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.15');
}

export function initializeScrollAnimations() {
  if (typeof window === 'undefined' || !window.gsap) return;

  const { gsap } = window;
  
  // Show all elements immediately without scroll triggers
  setTimeout(() => {
    const allAnimatedElements = document.querySelectorAll(
      '.hero-title, .hero-subtitle, .hero-buttons, .about-image, .about-content, .tech-stack-content, .projects-container, .contact-info, .contact-form, .education-title, .education-timeline, .education-item, .tech-stack-title, .projects-title, .contact-title, footer, .skill-bar, .project-card, h1, h2, h3, .grid > *, .space-y-4 > *, .flex.space-x-4 > *, .tech-stack-content .glassmorphic'
    );
    
    allAnimatedElements.forEach(el => {
      gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' });
    });
  }, 100);

  // Keep only hover animations for glassmorphic elements
  document.querySelectorAll('.glassmorphic').forEach((element: Element) => {
    element.addEventListener('mouseenter', function(this: Element) {
      gsap.to(this, {
        scale: 1.02,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        duration: 0.2,
        ease: 'power2.out'
      });
    });
    
    element.addEventListener('mouseleave', function(this: Element) {
      gsap.to(this, {
        scale: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });
}

export function initializeFloatingAnimations() {
  if (typeof window === 'undefined' || !window.gsap) return;

  const { gsap } = window;

  // Floating animations for background orbs
  gsap.to(".orb", {
    y: -15,
    duration: 0.8,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    stagger: 0.3
  });

  // Button hover animations
  document.querySelectorAll('.btn-glow, .glassmorphic').forEach((btn: Element) => {
    btn.addEventListener('mouseenter', function(this: Element) {
      gsap.to(this, {
        scale: 1.03,
        filter: 'brightness(1.1)',
        duration: 0.2,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', function(this: Element) {
      gsap.to(this, {
        scale: 1,
        filter: 'brightness(1)',
        duration: 0.2,
        ease: 'power2.out'
      });
    });
  });

  // Continuous floating animation for cards
  gsap.to('.project-card, .education-item', {
    y: -8,
    duration: 0.6,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    stagger: 0.2
  });
}
