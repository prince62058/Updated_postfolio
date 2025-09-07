import { Button } from "@/components/ui/button";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigationLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Tech Stack', id: 'tech-stack' },
    { label: 'Projects', id: 'projects' },
    { label: 'Contact', id: 'contact' }
  ];

  const socialLinks = [
    {
      icon: 'ph-github-logo',
      href: 'https://github.com/prince62058',
      label: 'GitHub'
    },
    {
      icon: 'ph-linkedin-logo',
      href: 'https://www.linkedin.com/in/prince62058/',
      label: 'LinkedIn'
    },
    {
      icon: 'ph-envelope',
      href: 'mailto:princekumar5252@gmail.com',
      label: 'Email'
    }
  ];

  return (
    <footer className="py-8 sm:py-12 relative z-10 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main Footer Content */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-accent mb-2">Prince Kumar</h2>
          <p className="text-base sm:text-lg text-muted-foreground font-light mb-4 sm:mb-6">
            Computer Science Engineering Student | AI & ML Enthusiast
          </p>
          
          {/* Social Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 sm:space-x-2 hover:text-accent transition-colors font-light text-sm sm:text-base min-h-[44px] px-2 py-1"
              >
                <i className={`${social.icon} text-xl`}></i>
                <span>{social.label}</span>
              </a>
            ))}
            <a
              href="tel:+916205872519"
              className="flex items-center space-x-1 sm:space-x-2 hover:text-accent transition-colors font-light text-sm sm:text-base min-h-[44px] px-2 py-1"
            >
              <i className="ph-phone text-xl"></i>
              <span>Phone</span>
            </a>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          {navigationLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="hover:text-accent transition-colors font-light text-sm sm:text-base min-h-[44px] px-2 py-1"
            >
              {link.label}
            </button>
          ))}
        </div>
        
        {/* Copyright */}
        <div className="text-center text-muted-foreground font-light border-t border-border pt-4 sm:pt-6">
          <p className="text-xs sm:text-sm">© 2025 Prince Kumar. All rights reserved. Built with passion and ❤️</p>
        </div>
      </div>
      
      {/* Footer Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="orb absolute w-16 h-16 rounded-full bottom-10 left-10 floating-animation opacity-30"></div>
        <div className="orb absolute w-12 h-12 rounded-full bottom-20 right-20 floating-animation opacity-20" style={{ animationDelay: '-3s' }}></div>
      </div>
    </footer>
  );
}
