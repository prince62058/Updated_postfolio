export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="orb absolute w-64 h-64 rounded-full top-20 left-10 floating-animation"></div>
      <div className="orb absolute w-48 h-48 rounded-full top-1/2 right-10 floating-animation" style={{ animationDelay: '-2s' }}></div>
      <div className="orb absolute w-32 h-32 rounded-full bottom-20 left-1/3 floating-animation" style={{ animationDelay: '-4s' }}></div>
      <div className="orb absolute w-40 h-40 rounded-full top-1/4 right-1/4 floating-animation" style={{ animationDelay: '-1s' }}></div>
      <div className="orb absolute w-24 h-24 rounded-full bottom-1/3 right-1/3 floating-animation" style={{ animationDelay: '-5s' }}></div>
    </div>
  );
}
