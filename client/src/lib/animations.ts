declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

// Initialize smooth scroll for the entire site
export function initializeSmoothScroll() {
  if (typeof window === 'undefined') return;

  // Smooth scroll behavior for all internal links
  const smoothScrollTo = (target: string) => {
    const element = document.getElementById(target);
    if (element && window.gsap) {
      window.gsap.to(window, {
        duration: 1.5,
        scrollTo: {
          y: element,
          offsetY: 80
        },
        ease: 'power2.inOut'
      });
    } else if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

  // Hero Section Animations
  const timeline = gsap.timeline({ delay: 0.1 });
  
  timeline
    .fromTo('.hero-title', {
      opacity: 0,
      y: 30,
      filter: 'blur(5px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: 'power3.out'
    })
    .fromTo('.hero-subtitle', {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.3')
    .fromTo('.hero-buttons', {
      opacity: 0,
      y: 15
    }, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    }, '-=0.2');
}

export function initializeScrollAnimations() {
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;

  // Navigation Animation on Scroll
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

  // About Section Animations
  const aboutTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#about',
      start: 'top 90%',
      end: 'bottom 20%',
      scrub: false
    }
  });

  aboutTimeline
    .fromTo('.about-image', {
      opacity: 0,
      y: 60,
      scale: 0.9,
      filter: 'blur(5px)'
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 0.6,
      ease: 'back.out(1.2)'
    })
    .fromTo('.about-content', {
      opacity: 0,
      y: 40,
      filter: 'blur(3px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.4,
      ease: 'power3.out'
    }, '-=0.2');

  // Education Section Animation
  const educationTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#education',
      start: 'top 90%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      scrub: false
    }
  });

  educationTimeline
    .fromTo('.education-title', {
      opacity: 0,
      y: 30,
      filter: 'blur(3px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.4,
      ease: 'power2.out'
    })
    .fromTo('.education-timeline', {
      opacity: 0,
      y: 40,
      filter: 'blur(3px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.2')
    .fromTo('.education-item', {
      opacity: 0,
      y: 30,
      scale: 0.95
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: 'back.out(1.2)',
      stagger: 0.1
    }, '-=0.3');

  // Tech Stack Section Animations
  const techStackTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#tech-stack',
      start: 'top 90%',
      end: 'bottom 20%',
      scrub: false
    }
  });

  techStackTimeline
    .fromTo('.tech-stack-title', {
      opacity: 0,
      y: 30,
      filter: 'blur(3px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.4,
      ease: 'power2.out'
    })
    .fromTo('.tech-stack-content', {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power3.out'
    }, '-=0.2');

  // MERN Stack Cards Individual Animation
  gsap.fromTo('.tech-stack-content .glassmorphic', {
    opacity: 0,
    y: 30,
    scale: 0.95,
    rotateY: 5
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateY: 0,
    duration: 0.4,
    stagger: 0.08,
    ease: 'back.out(1.1)',
    scrollTrigger: {
      trigger: '.tech-stack-content',
      start: 'top 85%'
    }
  });

  // Projects Section Animations
  const projectsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 90%',
      end: 'bottom 20%',
      scrub: false
    }
  });

  projectsTimeline
    .fromTo('.projects-title', {
      opacity: 0,
      y: 30,
      filter: 'blur(3px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.4,
      ease: 'power2.out'
    })
    .fromTo('.projects-container', {
      opacity: 0,
      y: 40
    }, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, '-=0.2');

  // Individual project cards stagger animation
  gsap.fromTo('.project-card', {
    opacity: 0,
    y: 30,
    scale: 0.95
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.4,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.projects-container',
      start: 'top 85%'
    }
  });

  // Contact Section Animations
  const contactTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 90%',
      end: 'bottom 20%',
      scrub: false
    }
  });

  contactTimeline
    .fromTo('.contact-title', {
      opacity: 0,
      y: 30,
      filter: 'blur(3px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.4,
      ease: 'power2.out'
    })
    .fromTo('.contact-info', {
      opacity: 0,
      x: -30
    }, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.2')
    .fromTo('.contact-form', {
      opacity: 0,
      x: 30
    }, {
      opacity: 1,
      x: 0,
      duration: 0.4,
      ease: 'power2.out'
    }, '-=0.3');

  // Footer Animation
  gsap.fromTo('footer', {
    opacity: 0,
    y: 30
  }, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: 'footer',
      start: 'top 95%'
    }
  });

  // Skills/Progress Bars Animation
  gsap.fromTo('.skill-bar', {
    width: '0%',
    opacity: 0
  }, {
    width: (i: number, target: any) => (target as HTMLElement).style.width,
    opacity: 1,
    duration: 0.8,
    ease: 'power2.out',
    stagger: 0.1,
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 80%'
    }
  });

  // Glassmorphic Elements Hover Enhancement
  document.querySelectorAll('.glassmorphic').forEach((element: Element) => {
    element.addEventListener('mouseenter', function(this: Element) {
      gsap.to(this, {
        scale: 1.02,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    element.addEventListener('mouseleave', function(this: Element) {
      gsap.to(this, {
        scale: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });

  // Parallax Effects for Background Elements
  gsap.to('.orb', {
    y: (i: number, target: any) => -100 * (i + 1),
    scrollTrigger: {
      trigger: 'body',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1
    }
  });

  // Text Reveal Animation for Headings
  document.querySelectorAll('h1, h2, h3').forEach((heading: Element) => {
    gsap.fromTo(heading, {
      opacity: 0,
      y: 20,
      filter: 'blur(2px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: heading,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    });
  });

  // Stagger animation for lists and grids
  document.querySelectorAll('.grid > *, .space-y-4 > *, .flex.space-x-4 > *').forEach((item: Element, index: number) => {
    gsap.fromTo(item, {
      opacity: 0,
      y: 15,
      scale: 0.98
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.3,
      delay: index * 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: item,
        start: 'top 90%',
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
    duration: 2,
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
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut',
    stagger: 0.2
  });
}
