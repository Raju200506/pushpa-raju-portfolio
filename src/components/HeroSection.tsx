import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import profileImage from "@/assets/profile.jpg";
import { useRef } from "react";

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Mouse tracking for parallax tilt
  const profileRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!profileRef.current) return;
    const rect = profileRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Parallax Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
      </motion.div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <motion.div style={{ opacity }} className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Image with Ring Effect */}
          <motion.div
            ref={profileRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            style={{ 
              rotateX, 
              rotateY,
              transformStyle: "preserve-3d",
              perspective: 1000,
            }}
            className="relative w-40 h-40 md:w-52 md:h-52 mx-auto mb-8 cursor-pointer"
          >
            {/* Outer Glow Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-8px] rounded-full"
              style={{
                background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)/0.3), hsl(var(--primary)))",
                filter: "blur(2px)",
              }}
            />
            
            {/* Inner Animated Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-4px] rounded-full"
              style={{
                background: "conic-gradient(from 180deg, transparent, hsl(var(--primary)), transparent, hsl(var(--accent)), transparent)",
              }}
            />
            
            {/* Pulsing Glow */}
            <motion.div
              animate={{ 
                boxShadow: [
                  "0 0 20px 5px hsl(var(--primary)/0.3)",
                  "0 0 40px 10px hsl(var(--primary)/0.5)",
                  "0 0 20px 5px hsl(var(--primary)/0.3)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />
            
            {/* Image Container */}
            <div className="absolute inset-[3px] rounded-full overflow-hidden bg-background border-2 border-primary/30">
              <img 
                src={profileImage} 
                alt="Pushpa Raju"
                className="w-full h-full object-cover object-top scale-110 translate-y-1"
              />
            </div>
            
            {/* Top Pop-out Effect Overlay */}
            <div 
              className="absolute inset-[3px] rounded-full pointer-events-none"
              style={{
                background: "linear-gradient(to bottom, transparent 60%, hsl(var(--background)) 100%)",
                maskImage: "radial-gradient(circle, transparent 70%, black 100%)",
              }}
            />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8"
          >
            <Sparkles size={16} />
            <span>Available for freelance work</span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            Hey, I'm{" "}
            <span className="gradient-text glow-text">Pushpa Raju</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-4"
          >
            <span className="text-primary">Photo Editing</span> |{" "}
            <span className="text-accent">Video Editing</span> |{" "}
            <span className="text-primary">Logo Design</span> |{" "}
            <span className="text-accent">Thumbnail Editing</span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Transforming ideas into stunning visuals. Let's create something amazing together.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="hero"
              size="lg"
              onClick={() => scrollToSection("#contact")}
            >
              Hire Me
              <ArrowDown className="ml-2 rotate-[-90deg]" size={18} />
            </Button>
            <Button
              variant="heroOutline"
              size="lg"
              onClick={() => scrollToSection("#projects")}
            >
              View Work
            </Button>
            <motion.button
              onClick={() => scrollToSection("#about")}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors ml-2"
            >
              <ArrowDown size={20} />
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16"
          >
            {[
              { value: "1+", label: "Years Experience" },
              { value: "5+", label: "Projects Completed" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-display font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
};

export default HeroSection;
