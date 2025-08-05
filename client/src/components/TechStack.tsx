import { useRef, useEffect } from "react";

export default function TechStack() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      if (titleRef.current) titleRef.current.style.opacity = '0';
      if (contentRef.current) contentRef.current.style.opacity = '0';
    }
  }, []);

  const mernStack = [
    {
      name: 'MongoDB',
      category: 'Database',
      description: 'NoSQL database for flexible, scalable data storage',
      percentage: 85,
      color: 'bg-green-500'
    },
    {
      name: 'Express.js',
      category: 'Backend Framework',
      description: 'Fast, minimalist web framework for Node.js',
      percentage: 90,
      color: 'bg-gray-500'
    },
    {
      name: 'React.js',
      category: 'Frontend Library',
      description: 'Component-based UI library for building interactive interfaces',
      percentage: 95,
      color: 'bg-blue-500'
    },
    {
      name: 'Node.js',
      category: 'Runtime Environment',
      description: 'JavaScript runtime for building scalable server applications',
      percentage: 88,
      color: 'bg-green-600'
    }
  ];

  const supportingTech = [
    { name: 'JavaScript (ES6+)', icon: '🟨' },
    { name: 'TypeScript', icon: '🔷' },
    { name: 'HTML5/CSS3', icon: '🎨' },
    { name: 'Git/GitHub', icon: '🔀' },
    { name: 'JWT Authentication', icon: '🔐' },
    { name: 'RESTful APIs', icon: '🔗' },
    { name: 'Mongoose ODM', icon: '🍃' },
    { name: 'Socket.io', icon: '⚡' }
  ];

  const developmentTools = [
    { name: 'VS Code', category: 'IDE' },
    { name: 'Postman', category: 'API Testing' },
    { name: 'MongoDB Compass', category: 'Database GUI' },
    { name: 'Netlify/Vercel', category: 'Deployment' },
    { name: 'Heroku', category: 'Cloud Platform' },
    { name: 'npm/yarn', category: 'Package Manager' }
  ];

  const capabilities = [
    'End-to-end application development',
    'RESTful API design and implementation',
    'Database modeling and optimization',
    'User authentication and authorization',
    'Responsive UI/UX development',
    'Cloud deployment and DevOps'
  ];

  const architectureFlow = [
    { step: '1', title: 'React Frontend', description: 'User Interface' },
    { step: '2', title: 'Express API', description: 'Server Logic' },
    { step: '3', title: 'Node.js Runtime', description: 'Server Environment' },
    { step: '4', title: 'MongoDB', description: 'Data Storage' }
  ];

  return (
    <section id="tech-stack" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="tech-stack-title text-5xl font-light mb-6 text-accent"
          >
            MERN Stack Expertise
          </h2>
          <p className="text-xl text-muted-foreground font-light max-w-4xl mx-auto">
            Full-stack development using MongoDB, Express.js, React.js, and Node.js - building scalable, 
            modern web applications from database to deployment.
          </p>
        </div>

        <div ref={contentRef} className="tech-stack-content">
          {/* MERN Stack Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {mernStack.map((tech, index) => (
              <div key={index} className="glassmorphic p-6 rounded-2xl hover:scale-105 transition-all duration-500">
                <h3 className="text-2xl font-light text-accent mb-2">{tech.name}</h3>
                <p className="text-sm text-primary mb-3">{tech.category}</p>
                <p className="text-muted-foreground mb-4 font-light text-sm">{tech.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Proficiency</span>
                    <span className="text-accent text-sm">{tech.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`${tech.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${tech.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Supporting Technologies */}
          <div className="glassmorphic p-8 rounded-2xl mb-16">
            <h3 className="text-3xl font-light text-accent mb-8 text-center">Supporting Technologies</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {supportingTech.map((tech, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 hover:bg-muted/30 rounded-lg transition-all">
                  <span className="text-2xl">{tech.icon}</span>
                  <span className="font-light">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Development Tools */}
          <div className="glassmorphic p-8 rounded-2xl mb-16">
            <h3 className="text-3xl font-light text-accent mb-8 text-center">Development Tools</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {developmentTools.map((tool, index) => (
                <div key={index} className="text-center p-4">
                  <h4 className="text-lg font-light text-accent mb-1">{tool.name}</h4>
                  <p className="text-sm text-muted-foreground">{tool.category}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Full-Stack Capabilities */}
          <div className="glassmorphic p-8 rounded-2xl mb-16">
            <h3 className="text-3xl font-light text-accent mb-8 text-center">Full-Stack Capabilities</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {capabilities.map((capability, index) => (
                <div key={index} className="flex items-center space-x-3 p-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="font-light">{capability}</span>
                </div>
              ))}
            </div>
          </div>

          {/* MERN Stack Architecture Flow */}
          <div className="glassmorphic p-8 rounded-2xl">
            <h3 className="text-3xl font-light text-accent mb-8 text-center">MERN Stack Architecture Flow</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {architectureFlow.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-light text-background">{item.step}</span>
                  </div>
                  <h4 className="text-lg font-light text-accent mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}