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
      icon: 'ph-envelope',
      href: 'mailto:princekumar5252@gmail.com',
      label: 'Email'
    }
  ];

  return (
    <footer className="py-12 relative z-10 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-2xl font-light text-accent mb-6 md:mb-0">Prince Kumar</div>
          
          <div className="flex space-x-8 mb-6 md:mb-0">
            {navigationLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-muted-foreground hover:text-accent transition-colors font-light"
              >
                {link.label}
              </button>
            ))}
          </div>
          
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <Button
                key={index}
                variant="outline"
                size="icon"
                className="glassmorphic border-0 hover:bg-primary transition-colors"
                onClick={() => window.open(social.href, '_blank')}
              >
                <i className={`${social.icon} text-xl`}></i>
                <span className="sr-only">{social.label}</span>
              </Button>
            ))}
          </div>
        </div>
        
        <div className="text-center text-muted-foreground mt-8 font-light">
          © 2024 Prince Kumar. Crafted with passion and code.
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
