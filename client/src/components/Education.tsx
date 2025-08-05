import { Calendar, MapPin, GraduationCap, Star } from "lucide-react";

export default function Education() {
  const educationData = [
    {
      level: "Graduate",
      degree: "B.Tech in CSE (AI & ML)",
      institution: "Technocrats Institute of Technology",
      duration: "August 2021 - June 2025",
      location: "Bhopal, MP",
      gpa: "7.30",
      status: "Current"
    },
    {
      level: "Completed",
      degree: "12th Standard",
      institution: "Subhash Public School",
      duration: "June 2020 - April 2021",
      location: "Giridih, Jharkhand",
      gpa: "76",
      status: "Completed"
    }
  ];

  

  return (
    <section id="education" className="py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
            Education Journey
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            My academic path and continuous learning journey in technology and computer science.
          </p>
        </div>

        <div className="education-timeline relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-cyan-500 to-purple-500 opacity-30"></div>

          {educationData.map((item, index) => (
            <div key={index} className={`education-item flex items-center mb-16 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Content Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <div className="glassmorphic p-8 rounded-2xl border border-blue-500/20 hover:border-cyan-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-400/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      item.status === 'Current' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {item.level}
                    </span>
                    <div className="flex items-center text-cyan-400 font-bold text-lg">
                      <Star className="w-5 h-5 mr-2" />
                      {item.gpa}{item.status === 'Current' ? ' GPA' : ' Percentage'}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {item.degree}
                  </h3>
                  
                  <div className="flex items-center text-gray-300 mb-3">
                    <GraduationCap className="w-5 h-5 mr-2 text-purple-400" />
                    <span className="text-lg">{item.institution}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{item.duration}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-400">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              {/* Timeline Node */}
              <div className="w-2/12 flex justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full border-4 border-gray-900 shadow-lg shadow-cyan-400/30 relative z-10">
                  <div className="w-full h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Empty space for alternating layout */}
              <div className="w-5/12"></div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}