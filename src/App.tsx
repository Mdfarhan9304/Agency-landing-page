import { useEffect, useRef } from 'react';
import { animate, inView, stagger } from 'motion';
import Aurora from './Aurora';
import NumberTicker from './components/NumberTicker';
import ProcessCards from './components/ProcessCards';

// Project Images Placeholder
const projects = [
  { title: "Built-in AI That Works For You!", color: "from-blue-500/20" },
  { title: "Get Seen, Get Heard, Get Results", color: "from-purple-500/20" },
  { title: "Fill your pipeline with proposals", color: "from-orange-500/20" },
  { title: "Built for the Next Era", color: "from-green-500/20" },
  { title: "Marketing that Drives Results", color: "from-pink-500/20" },
  // Duplicate for infinite scroll
  { title: "Built-in AI That Works For You!", color: "from-blue-500/20" },
  { title: "Get Seen, Get Heard, Get Results", color: "from-purple-500/20" },
  { title: "Fill your pipeline with proposals", color: "from-orange-500/20" },
];

function App() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Infinite Scroll Animation for Projects
    if (carouselRef.current) {
      animate(
        carouselRef.current,
        { transform: "translateX(-50%)" },
        { duration: 40, repeat: Infinity, easing: "linear" }
      );
    }

    // Reveal animations for sections
    inView('.reveal-up', ({ target }) => {
      animate(
        target,
        { opacity: [0, 1], transform: ["translateY(50px)", "translateY(0)"] },
        { duration: 0.8, easing: [0.17, 0.55, 0.55, 1] }
      );
    });

    // Staggered lists
    inView('.stagger-list', ({ target }) => {
      const items = target.querySelectorAll('.stagger-item');
      animate(
        items,
        { opacity: [0, 1], transform: ["translateY(30px)", "translateY(0)"] },
        { delay: stagger(0.1), duration: 0.6, easing: [0.17, 0.55, 0.55, 1] }
      );
    });

  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans selection:bg-brand-gold selection:text-black overflow-x-hidden pb-40">

      {/* Aurora Background */}
      <div className="fixed top-0 left-0 right-0 h-[80vh] pointer-events-none z-0">
        <Aurora
          colorStops={["#19535F", "#0B7A75", "#D7C9AA"]}
          amplitude={1.2}
          speed={0.5}
          blend={1.5}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 flex flex-col items-center justify-center min-h-[90vh]">

        {/* Badge */}
        <div className="flex items-center gap-2 bg-[#1A1A1A] border border-white/10 px-4 py-2 rounded-full mb-12 shadow-2xl backdrop-blur-sm animate-pulse">
          <div className="w-5 h-5 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(255,215,0,0.5)]">
            <span className="text-[10px] text-black font-bold">✦</span>
          </div>
          <span className="text-gray-300 text-sm font-medium tracking-wide">Open for new projects</span>
        </div>

        {/* Massive Headline - Bebas Neue Font (Exact Styling) */}
        <h1 className="hero-heading mb-8 drop-shadow-2xl">
          THE WEB TEAM YOUR AGENCY<br />
          <span className="text-white/90">NEVER HAD TO HIRE</span>
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 text-center max-w-2xl text-lg md:text-xl leading-relaxed mb-12 px-6 font-medium font-sans">
          We deliver premium websites for your clients under your brand, so you can
          scale services, keep margins high, and skip in-house hiring.
        </p>

        {/* CTA Button */}
        <button className="bg-white text-black px-10 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] mb-8">
          Join Waitlist
        </button>

        {/* Availability Indicator */}
        <div className="flex items-center gap-2 text-sm text-gray-400 font-medium tracking-wide">
          <span className="w-2 h-2 bg-[#FFD700] rounded-full shadow-[0_0_8px_#FFD700] animate-pulse"></span>
          0 slots Available for January
        </div>

      </section>

      {/* Infinite Project Carousel - Bottom of Hero */}
      <div className="w-full overflow-hidden mt-10 relative z-10">
        <div className="flex gap-6 w-max" ref={carouselRef}>
          {projects.map((project, i) => (
            <div
              key={i}
              className="w-[300px] h-[200px] md:w-[450px] md:h-[300px] rounded-2xl relative overflow-hidden group cursor-pointer border border-white/5 bg-[#0F0F0F] hover:border-white/20 transition-colors"
            >
              {/* Card Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} to-transparent opacity-30 group-hover:opacity-50 transition-opacity`}></div>

              {/* Proper "App" looking UI inside the card */}
              <div className="absolute inset-4 bg-black/40 backdrop-blur-md rounded-xl border border-white/5 p-6 flex flex-col justify-end">
                <div className="text-white font-display text-2xl uppercase tracking-wide leading-none mb-2">{project.title}</div>
                <div className="flex items-center gap-2 mt-auto">
                  <div className="w-2 h-2 rounded-full bg-white/50"></div>
                  <div className="text-xs text-white/50 font-sans">APP INTERFACE</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24 reveal-up">
          <h2 className="font-display text-[8vw] md:text-7xl uppercase text-white mb-6">WHAT KEEPS US DIFFERENT</h2>
          <p className="text-gray-400 text-lg">We don't just build websites, we create digital experiences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 stagger-list">
          {[
            { icon: "⚡", title: "FAST DELIVERY", desc: "Projects delivered in weeks, not months." },
            { icon: "💰", title: "FIXED PRICING", desc: "No surprises. One flat monthly rate." },
            { icon: "🎯", title: "TOP QUALITY", desc: "Premium design from experienced pros." }
          ].map((item, i) => (
            <div key={i} className="stagger-item bg-[#0F0F0F] border border-white/5 p-10 rounded-3xl hover:border-white/20 transition-all hover:bg-[#141414] group">
              <div className="text-5xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">{item.icon}</div>
              <h3 className="font-display text-3xl mb-4 text-white uppercase">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 px-6 border-y border-white/5 bg-[#080808] relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center stagger-list">
          {[
            { num: "200+", label: "Projects Delivered" },
            { num: "98%", label: "Client Satisfaction" },
            { num: "50+", label: "Happy Clients" },
          ].map((stat, i) => (
            <div key={i} className="stagger-item">
              <div className="font-display text-8xl text-white mb-2">
                <NumberTicker value={stat.num} delay={0.2 * i} />
              </div>
              <div className="text-brand-gold font-sans uppercase tracking-widest text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section - GSAP Stacking Cards */}
      <section className="bg-black relative z-10">
        <ProcessCards />
      </section>

      {/* Footer CTA */}
      <section className="py-40 text-center px-6 relative z-10">
        <div className="reveal-up">
          <h2 className="font-display text-[9vw] leading-[0.85] uppercase text-white mb-12">
            READY TO SCALE<br /><span className="text-white/50">YOUR AGENCY?</span>
          </h2>
          <button className="bg-white text-black px-12 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.15)]">
            See Pricing Plans
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 text-center text-gray-600 font-sans text-xs relative z-10 mb-20 animate-pulse">
        © 2026 TITAN STUDIO. ALL RIGHTS RESERVED.
      </footer>

      {/* Floating Bottom Dock Navigation - Exact match to reference */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4 pointer-events-none">
        <nav className="nav-glass px-2 py-2 rounded-2xl flex items-center gap-1 shadow-2xl pointer-events-auto">

          {/* Logo Item */}
          <a href="#" className="px-5 py-3 rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2 group">
            <div className="w-5 h-5 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded sm flex items-center justify-center group-hover:shadow-[0_0_10px_#FFD700] transition-shadow">
              <span className="text-black text-[10px] font-bold">T</span>
            </div>
            <span className="font-bold text-white tracking-tight">TitanStudio</span>
          </a>

          <div className="hidden md:block w-[1px] h-6 bg-white/10 mx-1"></div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-1">
            <a href="#" className="px-5 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all">Home</a>
            <a href="#" className="px-5 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all">Work process</a>
            <a href="#" className="px-5 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-all">Services</a>
          </div>

          {/* CTA Item */}
          <a href="#" className="ml-1 px-6 py-3 bg-white text-black rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors">
            Work With me
          </a>
        </nav>
      </div>

    </div>
  );
}

export default App;
