import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/portfolio";

export default function Projects() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      if (titleRef.current) titleRef.current.style.opacity = '0';
      if (containerRef.current) containerRef.current.style.opacity = '0';
    }
  }, []);

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 
          ref={titleRef}
          className="projects-title text-3xl sm:text-4xl lg:text-5xl font-light text-center mb-8 sm:mb-12 lg:mb-16 text-accent"
        >
          Featured Projects
        </h2>
        
        {/* Horizontal Scrollable Projects */}
        <div className="overflow-x-auto pb-6 -mx-4 sm:mx-0">
          <div 
            ref={containerRef}
            className="projects-container flex space-x-4 sm:space-x-6 lg:space-x-8 min-w-max px-4 sm:px-0"
          >
            {projects.map((project, index) => (
              <div 
                key={index}
                className="project-card glassmorphic rounded-2xl p-4 sm:p-6 lg:p-8 w-72 sm:w-80 flex-shrink-0 hover:scale-105 transition-transform duration-500"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-40 sm:h-48 object-cover rounded-xl mb-4 sm:mb-6"
                />
                <h3 className="text-xl sm:text-2xl font-light mb-3 sm:mb-4 text-accent">{project.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 font-light">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className={`px-3 py-1 rounded-full text-sm ${tech.color}`}
                    >
                      {tech.name}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2 sm:gap-4">
                  <Button
                    variant="outline"
                    className="px-3 sm:px-4 py-2 glassmorphic rounded-lg hover:bg-primary transition-colors font-light border-0 text-xs sm:text-sm flex-1"
                    onClick={() => window.open(project.downloadLink, '_blank')}
                  >
                    <i className="ph-download-simple mr-1 sm:mr-2"></i>
                    <span className="hidden sm:inline">Download</span>
                    <span className="sm:hidden">Get</span>
                  </Button>
                  <Button
                    className="px-3 sm:px-4 py-2 bg-primary rounded-lg hover:bg-secondary transition-colors font-light text-xs sm:text-sm flex-1"
                    onClick={() => window.open(project.liveDemo, '_blank')}
                  >
                    <i className="ph-eye mr-1 sm:mr-2"></i>
                    <span className="hidden sm:inline">Live Demo</span>
                    <span className="sm:hidden">Demo</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="glassmorphic px-8 py-4 rounded-full font-light hover:bg-primary transition-all duration-300 btn-glow border-0"
            onClick={() => window.open('https://github.com/prince62058/Online-Reservation-Using-JDBC-IN-JAVA', '_blank')}
          >
            <i className="ph-github-logo mr-2"></i>
            View All on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
