import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const skills = [
  { name: "DaVinci Resolve", level: 75, color: "from-primary to-accent" },
  { name: "Alight Motion", level: 80, color: "from-primary to-accent" },
  { name: "Lightroom", level: 85, color: "from-primary to-accent" },
  { name: "CapCut", level: 90, color: "from-primary to-accent" },
  { name: "Canva", level: 95, color: "from-primary to-accent" },
];

const SkillBar = ({
  name,
  level,
  color,
  delay,
  isInView,
}: {
  name: string;
  level: number;
  color: string;
  delay: number;
  isInView: boolean;
}) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setAnimatedLevel(level);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, level, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <div className="flex justify-between items-center mb-3">
        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
          {name}
        </span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>
      <div className="skill-bar relative">
        <motion.div
          className={`skill-bar-fill bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${animatedLevel}%` }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        />
        {/* Glow effect on fill */}
        <motion.div
          className="absolute top-0 left-0 h-full rounded-full opacity-50 blur-sm bg-gradient-to-r from-primary to-accent"
          initial={{ width: 0 }}
          animate={{ width: `${animatedLevel}%` }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const otherSkills = [
    "Photo Retouching",
    "Color Grading",
    "Logo Design",
    "Thumbnail Design",
    "Motion Graphics",
    "Short Form Content",
    "Social Media Design",
    "Video Editing",
  ];

  return (
    <section
      id="skills"
      className="py-20 md:py-32 relative overflow-hidden bg-secondary/20"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            My Expertise
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            Skills & Tools
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Skill Bars */}
          <div className="space-y-8">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-xl font-semibold mb-8"
            >
              Software Proficiency
            </motion.h3>
            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                {...skill}
                delay={0.2 + index * 0.1}
                isInView={isInView}
              />
            ))}
          </div>

          {/* Other Skills Tags */}
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-xl font-semibold mb-8"
            >
              Creative Skills
            </motion.h3>
            <div className="flex flex-wrap gap-3">
              {otherSkills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-4 py-2 glass-card rounded-full text-sm font-medium cursor-default hover:border-primary/50 transition-all duration-300"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 glass-card p-6 rounded-2xl"
            >
              <h4 className="font-display text-lg font-semibold mb-3">
                Always Learning
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                I'm constantly expanding my skill set and staying updated with
                the latest design trends and software updates. Currently
                exploring advanced color grading techniques and motion graphics.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
