declare global {
  interface Window {
    gsap: any;
    ScrollTrigger: any;
  }
}

export function initializeHeroAnimations() {
  if (typeof window === 'undefined' || !window.gsap) return;

  const { gsap } = window;

  // Hero Section Animations
  const timeline = gsap.timeline({ delay: 0.5 });
  
  timeline
    .fromTo('.hero-title', {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'power3.out'
    })
    .fromTo('.hero-subtitle', {
      opacity: 0,
      y: 30
    }, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.5')
    .fromTo('.hero-buttons', {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.3');
}

export function initializeScrollAnimations() {
  if (typeof window === 'undefined' || !window.gsap || !window.ScrollTrigger) return;

  const { gsap, ScrollTrigger } = window;

  // About Section Animations
  const aboutTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#about',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false
    }
  });

  aboutTimeline
    .fromTo('.about-image', {
      opacity: 0,
      y: 150,
      scale: 0.8,
      filter: 'blur(15px)'
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      duration: 1.5,
      ease: 'back.out(1.7)'
    })
    .fromTo('.about-content', {
      opacity: 0,
      y: 80,
      filter: 'blur(8px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out'
    }, '-=0.3');

  // Projects Section Animations
  const projectsTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false
    }
  });

  projectsTimeline
    .fromTo('.projects-title', {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    })
    .fromTo('.projects-container', {
      opacity: 0,
      y: 100
    }, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=0.3');

  // Individual project cards stagger animation
  gsap.fromTo('.project-card', {
    opacity: 0,
    y: 60,
    scale: 0.9
  }, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.8,
    stagger: 0.2,
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
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false
    }
  });

  contactTimeline
    .fromTo('.contact-title', {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    }, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    })
    .fromTo('.contact-info', {
      opacity: 0,
      x: -50
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.5')
    .fromTo('.contact-form', {
      opacity: 0,
      x: 50
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.8');
}

export function initializeFloatingAnimations() {
  if (typeof window === 'undefined' || !window.gsap) return;

  const { gsap } = window;

  // Floating animations for background orbs
  gsap.to(".orb", {
    y: -20,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: "power1.inOut",
    stagger: 0.5
  });

  // Button hover animations
  document.querySelectorAll('.btn-glow').forEach((btn: Element) => {
    btn.addEventListener('mouseenter', function(this: Element) {
      gsap.to(this, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
    
    btn.addEventListener('mouseleave', function(this: Element) {
      gsap.to(this, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    });
  });
}
