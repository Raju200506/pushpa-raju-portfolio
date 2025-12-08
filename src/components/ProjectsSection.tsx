import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Play, Image, Palette } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: typeof Palette;
  gradient: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Logo Design Portfolio",
    category: "Logo Design",
    description:
      "Collection of minimalist and modern logo designs for various brands and startups.",
    icon: Palette,
    gradient: "from-primary to-accent",
  },
  {
    id: 2,
    title: "Photo Retouching Work",
    category: "Photo Editing",
    description:
      "Professional photo retouching and enhancement work showcasing color grading and restoration.",
    icon: Image,
    gradient: "from-accent to-primary",
  },
  {
    id: 3,
    title: "Short Form Films",
    category: "Video Editing",
    description:
      "Creative short films and reels edited with professional transitions and effects.",
    icon: Play,
    gradient: "from-primary to-accent",
  },
];

const ProjectCard = ({
  project,
  index,
  isInView,
}: {
  project: Project;
  index: number;
  isInView: boolean;
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = (e.clientY - rect.top - rect.height / 2) / 10;
    setTilt({ x: -y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      className="group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="glass-card-hover p-6 h-full relative overflow-hidden">
        {/* Background gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        />

        {/* Icon */}
        <div className="relative mb-6">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${project.gradient} p-0.5`}
          >
            <div className="w-full h-full rounded-2xl bg-card flex items-center justify-center">
              <project.icon className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <span className="text-primary text-xs font-medium uppercase tracking-wider">
            {project.category}
          </span>
          <h3 className="font-display text-xl font-semibold mt-2 mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* View Project Link */}
        <motion.div
          className="mt-6 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
        >
          <span>View Project</span>
          <ExternalLink size={14} />
        </motion.div>

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div
            className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${project.gradient} opacity-10 rounded-bl-full`}
          />
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            My Work
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            Featured Projects
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            A showcase of my creative journey in visual design and video
            production.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* More Projects Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground text-sm">
            More projects coming soon...
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
