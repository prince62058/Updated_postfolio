import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 p-3 sm:p-6 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md' : ''}`}>
      <div className="glassmorphic max-w-6xl mx-auto rounded-2xl px-4 sm:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-light text-accent cursor-pointer text-left" onClick={() => scrollToSection('home')}>PRINCE</div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {[
              { label: 'Home', id: 'home' },
              { label: 'About', id: 'about' },
              { label: 'Tech Stack', id: 'tech-stack' },
              { label: 'Education', id: 'education' },
              { label: 'Projects', id: 'projects' },
              { label: 'Contact', id: 'contact' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-accent transition-colors font-light text-foreground text-sm lg:text-base whitespace-nowrap"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground min-h-[44px] min-w-[44px]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className={`ph-${isMenuOpen ? 'x' : 'list'} text-xl sm:text-2xl`}></i>
          </Button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-glass-border">
            <div className="flex flex-col space-y-3">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About', id: 'about' },
                { label: 'Tech Stack', id: 'tech-stack' },
                { label: 'Education', id: 'education' },
                { label: 'Projects', id: 'projects' },
                { label: 'Contact', id: 'contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left hover:text-accent transition-colors font-light text-foreground py-2 px-1 min-h-[44px] flex items-center"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
