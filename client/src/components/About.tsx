import { useRef, useEffect } from "react";
import profileImage from "@assets/Adobe Express - file (1)_1754473684966.png";

export default function About() {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'MongoDB', percentage: 85 },
    { name: 'Express.js', percentage: 90 },
    { name: 'React.js', percentage: 95 },
    { name: 'Node.js', percentage: 88 }
  ];

  const stats = [
    { value: '3+', label: 'Projects' },
    { value: '8.56', label: 'GPA' },
    { value: '5+', label: 'Technologies' },
    { value: '4+', label: 'Certifications' }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      if (imageRef.current) {
        imageRef.current.style.opacity = '0';
        imageRef.current.style.transform = 'translateY(150px) scale(0.8)';
        imageRef.current.style.filter = 'blur(15px)';
      }
      if (contentRef.current) {
        contentRef.current.style.opacity = '0';
        contentRef.current.style.transform = 'translateY(80px)';
        contentRef.current.style.filter = 'blur(8px)';
      }
    }
  }, []);

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div ref={imageRef} className="about-image">
            <img 
              src={profileImage} 
              alt="Prince Kumar Profile" 
              className="w-64 sm:w-72 md:w-80 h-64 sm:h-72 md:h-80 object-contain mx-auto hover:scale-105 transition-all duration-500 rounded-2xl shadow-2xl border border-accent/20"
            />
          </div>
          
          <div ref={contentRef} className="about-content">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light mb-4 sm:mb-6 text-accent text-center md:text-left">About Me</h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 font-light text-center md:text-left">
              I'm a MERN Stack Developer and Computer Science Engineering student at Technocrats Institute of Technology, 
              specializing in Artificial Intelligence and Machine Learning. With expertise in MongoDB, Express.js, React.js, 
              and Node.js, I build comprehensive full-stack web applications that deliver seamless user experiences.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="glassmorphic p-3 sm:p-4 rounded-xl text-center">
                  <div className="text-2xl sm:text-3xl font-light text-accent">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* MERN Stack Skills Preview */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-light text-accent mb-4 text-center md:text-left">Core Technologies</h3>
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <div className="flex justify-between mb-2">
                    <span className="font-light">{skill.name}</span>
                    <span className="text-accent">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="skill-bar h-2 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${skill.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
