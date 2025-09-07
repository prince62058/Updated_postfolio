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
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;
  
  // Optimize ScrollTrigger for mobile performance
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    refreshPriority: -1
  });
  
  // Simplified approach for mobile
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    // Disable most animations on mobile for better performance
    ScrollTrigger.defaults({
      scroller: window,
      immediateRender: true,
      fastScrollEnd: true
    });
    
    // Force all elements to be visible immediately on mobile
    setTimeout(() => {
      const allAnimatedElements = document.querySelectorAll(
        '.hero-title, .hero-subtitle, .hero-buttons, .about-image, .about-content, .tech-stack-content, .projects-container, .contact-info, .contact-form'
      );
      
      allAnimatedElements.forEach(el => {
        gsap.set(el, { opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' });
      });
    }, 100);
    
    return; // Skip complex scroll animations on mobile
  }

  // Navigation Animation on Scroll - optimized for mobile
  if (window.innerWidth > 768) {
    gsap.to('nav', {
      backdropFilter: 'blur(20px)',
      backgroundColor: 'rgba(0, 20, 40, 0.8)',
      scrollTrigger: {
        trigger: 'body',
        start: 'top -50px',
        end: 'bottom bottom',
        scrub: true
      }
    });
  } else {
    // Simpler mobile navigation animation
    gsap.to('nav', {
      backdropFilter: 'blur(10px)',
      backgroundColor: 'rgba(0, 20, 40, 0.9)',
      scrollTrigger: {
        trigger: 'body',
        start: 'top -30px',
        end: 'bottom bottom',
        scrub: 0.5
      }
    });
  }

  // About Section Animations
  const aboutTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#about',
      start: 'top 85%',
      end: 'bottom 20%',
      scrub: false
    }
  });

  aboutTimeline
    .fromTo('.about-image', {
      opacity: 0,
      y: 40,
      scale: 0.95,
      filter: 'blur(3px)'
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.3,
      ease: 'power2.out'
    })
    .fromTo('.about-content', {
      opacity: 0,
      y: 30,
      filter: 'blur(2px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.25,
      ease: 'power2.out'
    }, '-=0.15');

  // Education Section Animation
  const educationTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#education',
      start: 'top 85%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      scrub: false
    }
  });

  educationTimeline
    .fromTo('.education-title', {
      opacity: 0,
      y: 20,
      filter: 'blur(2px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.25,
      ease: 'power2.out'
    })
    .fromTo('.education-timeline', {
      opacity: 0,
      y: 30,
      filter: 'blur(2px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.15')
    .fromTo('.education-item', {
      opacity: 0,
      y: 20,
      scale: 0.98
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.1,
      ease: 'power2.out',
      stagger: 0.05
    }, '-=0.2');

  // Tech Stack Section Animations
  const techStackTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#tech-stack',
      start: 'top 85%',
      end: 'bottom 20%',
      scrub: false
    }
  });

  techStackTimeline
    .fromTo('.tech-stack-title', {
      opacity: 0,
      y: 20,
      filter: 'blur(2px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.25,
      ease: 'power2.out'
    })
    .fromTo('.tech-stack-content', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.15');

  // MERN Stack Cards Individual Animation
  gsap.fromTo('.tech-stack-content .glassmorphic', {
    opacity: 0,
    y: 20,
    scale: 0.98
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.25,
    stagger: 0.04,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.tech-stack-content',
      start: 'top 80%'
    }
  });

  // Projects Section Animations
  const projectsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 85%',
      end: 'bottom 20%',
      scrub: false
    }
  });

  projectsTimeline
    .fromTo('.projects-title', {
      opacity: 0,
      y: 20,
      filter: 'blur(2px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.25,
      ease: 'power2.out'
    })
    .fromTo('.projects-container', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.15');

  // Individual project cards stagger animation
  gsap.fromTo('.project-card', {
    opacity: 0,
    y: 20,
    scale: 0.98
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.25,
    stagger: 0.04,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.projects-container',
      start: 'top 80%'
    }
  });

  // Contact Section Animations
  const contactTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 85%',
      end: 'bottom 20%',
      scrub: false
    }
  });

  contactTimeline
    .fromTo('.contact-title', {
      opacity: 0,
      y: 20,
      filter: 'blur(2px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.25,
      ease: 'power2.out'
    })
    .fromTo('.contact-info', {
      opacity: 0,
      x: -20
    }, {
      opacity: 1,
      x: 0,
      duration: 0.25,
      ease: 'power2.out'
    }, '-=0.15')
    .fromTo('.contact-form', {
      opacity: 0,
      x: 20
    }, {
      opacity: 1,
      x: 0,
      duration: 0.25,
      ease: 'power2.out'
    }, '-=0.2');

  // Footer Animation
  gsap.fromTo('footer', {
    opacity: 0,
    y: 20
  }, {
    opacity: 1,
    y: 0,
    duration: 0.25,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: 'footer',
      start: 'top 90%'
    }
  });

  // Skills/Progress Bars Animation
  gsap.fromTo('.skill-bar', {
    width: '0%',
    opacity: 0
  }, {
    width: (i: number, target: any) => (target as HTMLElement).style.width,
    opacity: 1,
    duration: 0.2,
    ease: 'power2.out',
    stagger: 0.05,
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 75%'
    }
  });

  // Glassmorphic Elements Hover Enhancement (Desktop only)
  if (window.innerWidth > 768) {
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

  // Optimized Parallax Effects for Background Elements
  if (window.innerWidth > 768) {
    // Only enable parallax on desktop to prevent mobile lag
    gsap.to('.orb', {
      y: (i: number, target: any) => -50 * (i + 1),
      scrollTrigger: {
        trigger: 'body',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5
      }
    });
  }

  // Text Reveal Animation for Headings
  document.querySelectorAll('h1, h2, h3').forEach((heading: Element) => {
    gsap.fromTo(heading, {
      opacity: 0,
      y: 15,
      filter: 'blur(1px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Stagger animation for lists and grids
  document.querySelectorAll('.grid > *, .space-y-4 > *, .flex.space-x-4 > *').forEach((item: Element, index: number) => {
    gsap.fromTo(item, {
      opacity: 0,
      y: 10,
      scale: 0.99
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.2,
      delay: index * 0.03,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
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
