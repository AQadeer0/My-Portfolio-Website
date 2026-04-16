import React, { useState, useRef, useEffect } from "react";
import profileImg from "../profile image.jpeg";
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from "motion/react";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ExternalLink, 
  Code2, 
  Database, 
  BrainCircuit, 
  Sparkles,
  ChevronRight,
  Menu,
  X
} from "lucide-react";

// --- Components ---

const TiltCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateY,
        rotateX,
        transformStyle: "preserve-3d",
      }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(50px)" }} className="h-full w-full">
        {children}
      </div>
    </motion.div>
  );
};

const SectionHeading = ({ label, title }: { label: string; title: string }) => (
  <div className="mb-12">
    <motion.p 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-accent text-xs font-bold tracking-[0.3em] uppercase mb-2"
    >
      {label}
    </motion.p>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-4xl md:text-5xl font-bold tracking-tight"
    >
      {title}
    </motion.h2>
  </div>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  const skills = [
    { name: "Python", icon: <Code2 className="w-6 h-6" />, desc: "Core language for scripting & ML", level: 85 },
    { name: "Machine Learning", icon: <BrainCircuit className="w-6 h-6" />, desc: "MediaPipe, Scikit-Learn, Models", level: 70 },
    { name: "Data Analysis", icon: <Database className="w-6 h-6" />, desc: "Pandas, NumPy, Statistics", level: 75 },
    { name: "Prompt Engineering", icon: <Sparkles className="w-6 h-6" />, desc: "LLM Optimization & Automation", level: 80 },
  ];

  const projects = [
    {
      title: "PSL Sign Language Translator",
      tag: "ML · Computer Vision",
      desc: "Real-time gesture recognition using MediaPipe. Translates Pakistan Sign Language live via webcam.",
      link: "https://github.com/AQadeer0/PSL-Sign-Language-Translator-Web-App-Real-Time-Gesture-Recognition-using-ML-MediaPipe-.git"
    },
    {
      title: "A/B Test Analysis",
      tag: "Data Analysis · Stats",
      desc: "Statistical analysis comparing pricing strategies. Includes hypothesis testing and visual insights.",
      link: "https://github.com/AQadeer0/.A-B-Test-Analysis-Flat-Price-vs.-Discounted.git"
    },
    {
      title: "Card Memory Game",
      tag: "Python · Logic",
      desc: "Logic-based card memory game built in Python. Tests pattern matching gameplay mechanics.",
      link: "https://github.com/AQadeer0/python-logic-card-memory-game-.git"
    },
    {
      title: "Fibonacci Generator",
      tag: "Python · Algorithms",
      desc: "Clean Python implementation with multiple generation approaches and performance comparison.",
      link: "https://github.com/AQadeer0/Fibonacci-series-in-python-.git"
    }
  ];

  return (
    <div className="min-h-screen bg-bg text-white selection:bg-accent selection:text-bg">
      {/* Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-bg/80 backdrop-blur-md border-b border-white/5 py-4" : "py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <motion.a 
            href="#" 
            className="text-xl font-bold tracking-tighter flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-accent">&lt;</span>
            AQ
            <span className="text-accent">/&gt;</span>
          </motion.a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-sm font-medium text-white/60 hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            <motion.a 
              href="#contact" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-accent text-bg font-bold rounded-full text-sm"
            >
              Let's Talk
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-3xl font-bold hover:text-accent"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center pt-20">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-bold mb-6">
                <span className="w-2 h-2 bg-accent rounded-full animate-ping" />
                Available for opportunities
              </div>
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                Abdul <br />
                <span className="text-accent">Qadeer</span>
              </h1>
              <p className="text-lg text-white/60 max-w-md mb-10 leading-relaxed">
                Software Engineering student passionate about <span className="text-white font-medium">Data Science & Machine Learning</span>. 
                Building real-world ML projects with Python and MediaPipe.
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.a 
                  href="#projects"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-accent text-bg font-bold rounded-xl flex items-center gap-2"
                >
                  View Projects <ChevronRight className="w-4 h-4" />
                </motion.a>
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white/5 border border-white/10 font-bold rounded-xl hover:bg-white/10 transition-colors"
                >
                  Contact Me
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex justify-center relative"
            >
              {/* Profile Background Glow */}
              <div className="absolute inset-0 bg-accent/20 blur-[60px] rounded-full scale-75 animate-pulse" />
              
              <TiltCard className="w-64 h-64 md:w-80 md:h-80 relative z-10">
                <div className="relative w-full h-full rounded-full p-2 border-2 border-accent/30 overflow-hidden bg-bg-alt shadow-[0_0_50px_rgba(0,229,160,0.1)] hover:border-accent transition-colors duration-500 group">
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-accent/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <img 
                    src={profileImg} 
                    alt="Abdul Qadeer" 
                    className="w-full h-full object-cover rounded-full grayscale hover:grayscale-0 transition-all duration-700 scale-105 hover:scale-100"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://picsum.photos/seed/abdul/800/800";
                    }}
                  />
                  <div className="absolute inset-0 bg-accent/5 mix-blend-overlay pointer-events-none" />
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading label="Expertise" title="Skills & Technologies" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skills.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TiltCard className="h-full">
                    <div className="glass p-8 rounded-2xl h-full flex flex-col group hover:border-accent/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                        {skill.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{skill.name}</h3>
                      <p className="text-sm text-white/50 mb-6 flex-grow">{skill.desc}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs font-bold text-white/40">
                          <span>Proficiency</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-accent"
                          />
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 bg-bg-alt">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading label="Portfolio" title="Featured Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <TiltCard>
                    <div className="glass p-8 rounded-3xl h-full flex flex-col hover:border-accent/30 transition-colors">
                      <div className="flex justify-between items-start mb-6">
                        <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider">
                          {project.tag}
                        </span>
                        <a href={project.link} target="_blank" className="text-white/40 hover:text-accent transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                      <p className="text-white/50 leading-relaxed mb-8 flex-grow">
                        {project.desc}
                      </p>
                      <a 
                        href={project.link} 
                        target="_blank"
                        className="inline-flex items-center gap-2 text-accent text-sm font-bold hover:gap-3 transition-all"
                      >
                        Source Code <ChevronRight className="w-4 h-4" />
                      </a>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading label="Background" title="Education" />
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <div className="relative pl-8 border-l-2 border-accent/30">
                <div className="absolute top-0 left-[-9px] w-4 h-4 rounded-full bg-accent shadow-[0_0_15px_rgba(0,229,160,0.5)]" />
                <div className="mb-2 flex items-center gap-4">
                  <h3 className="text-2xl font-bold">BS Software Engineering</h3>
                  <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold text-white/40 uppercase">2022 — 2025</span>
                </div>
                <p className="text-accent font-medium mb-4">Sindh University of Jamshoro</p>
                <p className="text-white/50 leading-relaxed">
                  Focusing on core computer science fundamentals, software development methodologies, 
                  algorithms, and data-driven technologies. Actively exploring Machine Learning 
                  and Data Science applications.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-bg-alt relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <SectionHeading label="Connect" title="Get in Touch" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Email", value: "mainidea27@gmail.com", icon: <Mail />, href: "mailto:mainidea27@gmail.com" },
                { label: "Phone", value: "0311 3948553", icon: <Phone />, href: "tel:03113948553" },
                { label: "GitHub", value: "AQadeer0", icon: <Github />, href: "https://github.com/AQadeer0" },
                { label: "LinkedIn", value: "abdul-qadeer", icon: <Linkedin />, href: "https://www.linkedin.com/in/abdul-qadeer-074b0239b" },
              ].map((item, i) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="glass p-6 rounded-2xl flex items-center gap-4 hover:border-accent/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-sm font-medium truncate max-w-[150px]">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 text-center">
        <p className="text-white/30 text-xs font-medium tracking-widest uppercase">
          Designed & Built by Abdul Qadeer · 2024
        </p>
      </footer>
    </div>
  );
}
