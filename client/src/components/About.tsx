import { useRef, useEffect } from "react";
import profileImage from "@assets/IMG_8367_1754392069275.jpg";

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
        imageRef.current.style.transform = 'translateY(100px)';
        imageRef.current.style.filter = 'blur(10px)';
      }
      if (contentRef.current) {
        contentRef.current.style.opacity = '0';
        contentRef.current.style.transform = 'translateY(80px)';
        contentRef.current.style.filter = 'blur(8px)';
      }
    }
  }, []);

  return (
    <section id="about" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div ref={imageRef} className="about-image">
            <img 
              src={profileImage} 
              alt="Prince Kumar Profile" 
              className="w-80 h-80 object-cover rounded-full glassmorphic p-2 mx-auto hover:scale-105 transition-transform duration-500"
            />
          </div>
          
          <div ref={contentRef} className="about-content">
            <h2 className="text-5xl font-light mb-6 text-accent">About Me</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-light">
              I'm a MERN Stack Developer and Computer Science Engineering student at Technocrats Institute of Technology, 
              specializing in Artificial Intelligence and Machine Learning. With expertise in MongoDB, Express.js, React.js, 
              and Node.js, I build comprehensive full-stack web applications that deliver seamless user experiences.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="glassmorphic p-4 rounded-xl text-center">
                  <div className="text-3xl font-light text-accent">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* MERN Stack Skills */}
            <div className="space-y-4">
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
