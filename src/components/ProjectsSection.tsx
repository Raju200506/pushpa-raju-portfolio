import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import { ExternalLink, Play, Image, Palette, X, ZoomIn, ZoomOut, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";

// Import work images
import samLogo from "@/assets/works/sam-logo.png";
import thumbnail1 from "@/assets/works/thumbnail-1.jpg";
import thumbnail2 from "@/assets/works/thumbnail-2.jpg";
import thumbnail3 from "@/assets/works/thumbnail-3.jpg";
import thumbnail4 from "@/assets/works/thumbnail-4.jpg";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: typeof Palette;
  gradient: string;
  image: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "SAM Logo Design",
    category: "Logo Design",
    description:
      "Modern logo design for Software Ammayi Muchatlu - clean illustration with bold typography.",
    icon: Palette,
    gradient: "from-primary to-accent",
    image: samLogo,
  },
  {
    id: 2,
    title: "AI Agent Thumbnail",
    category: "Thumbnail Design",
    description:
      "Eye-catching YouTube thumbnail featuring futuristic AI robot design with dynamic cityscape.",
    icon: Image,
    gradient: "from-accent to-primary",
    image: thumbnail1,
  },
  {
    id: 3,
    title: "AI Agent Course Banner",
    category: "Thumbnail Design",
    description:
      "Horizontal banner design for AI development course with vibrant colors and 3D elements.",
    icon: Image,
    gradient: "from-primary to-accent",
    image: thumbnail2,
  },
  {
    id: 4,
    title: "Why I Stopped - Telugu",
    category: "Thumbnail Design",
    description:
      "Engaging Telugu YouTube thumbnail with 3D character and dramatic text effects.",
    icon: Play,
    gradient: "from-accent to-primary",
    image: thumbnail3,
  },
  {
    id: 5,
    title: "The Truth Behind YouTube",
    category: "Thumbnail Design",
    description:
      "Thought-provoking thumbnail design with bilingual text and cinematic character styling.",
    icon: Play,
    gradient: "from-primary to-accent",
    image: thumbnail4,
  },
];

const ImageLightbox = ({
  project,
  onClose,
  onPrevious,
  onNext,
  currentIndex,
  totalCount,
  allProjects,
  onSelectProject,
}: {
  project: Project;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
  allProjects: Project[];
  onSelectProject: (index: number) => void;
}) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const thumbnailStripRef = useRef<HTMLDivElement>(null);
  
  // Touch swipe state
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.5, 4));
  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };
  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      setZoom((prev) => Math.min(prev + 0.2, 4));
    } else {
      setZoom((prev) => {
        const newZoom = Math.max(prev - 0.2, 1);
        if (newZoom === 1) setPosition({ x: 0, y: 0 });
        return newZoom;
      });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleImageClick = () => {
    if (zoom === 1) {
      setZoom(2);
    }
  };

  // Touch swipe handlers
  const minSwipeDistance = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (zoom > 1) return;
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (zoom > 1) return;
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd || zoom > 1) return;
    
    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);
    
    if (isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        handleReset();
        onNext();
      } else {
        handleReset();
        onPrevious();
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleThumbnailClick = (index: number) => {
    handleReset();
    onSelectProject(index);
  };

  // Scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailStripRef.current) {
      const activeThumb = thumbnailStripRef.current.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          handleReset();
          onPrevious();
          break;
        case "ArrowRight":
          handleReset();
          onNext();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrevious, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm p-4"
      onClick={onClose}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative max-w-4xl w-full max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
            onPrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-muted-foreground hover:text-foreground transition-colors glass-card rounded-full z-10"
          title="Previous (←)"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleReset();
            onNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-muted-foreground hover:text-foreground transition-colors glass-card rounded-full z-10"
          title="Next (→)"
        >
          <ChevronRight size={24} />
        </button>

        {/* Controls */}
        <div className="absolute -top-12 right-0 flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors glass-card rounded-lg"
            title="Zoom Out"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-muted-foreground text-sm min-w-[3rem] text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={handleZoomIn}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors glass-card rounded-lg"
            title="Zoom In"
          >
            <ZoomIn size={20} />
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors glass-card rounded-lg"
            title="Reset"
          >
            <RotateCcw size={20} />
          </button>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors glass-card rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        <div className="glass-card overflow-hidden rounded-2xl">
          <div
            ref={imageRef}
            className="relative overflow-hidden cursor-zoom-in"
            style={{ cursor: zoom > 1 ? (isDragging ? "grabbing" : "grab") : "zoom-in" }}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onClick={handleImageClick}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-[60vh] object-contain transition-transform duration-200"
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              }}
              draggable={false}
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="font-display text-xl font-semibold">{project.title}</h3>
            <p className="text-muted-foreground text-sm mt-1">
              {project.category} • {currentIndex + 1} of {totalCount}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Thumbnail Strip */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.1 }}
        className="mt-4 max-w-4xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          ref={thumbnailStripRef}
          className="flex gap-2 overflow-x-auto py-2 px-1 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
        >
          {allProjects.map((proj, index) => (
            <button
              key={proj.id}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 relative rounded-lg overflow-hidden transition-all duration-200 ${
                index === currentIndex
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={proj.image}
                alt={proj.title}
                className="w-16 h-12 md:w-20 md:h-14 object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
        <p className="text-muted-foreground/60 text-xs text-center mt-2">
          ← → Navigate • Esc Close • Swipe or click thumbnails
        </p>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({
  project,
  index,
  isInView,
  onViewDetails,
}: {
  project: Project;
  index: number;
  isInView: boolean;
  onViewDetails: (project: Project) => void;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
      className="group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onViewDetails(project)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      <div className="glass-card-hover h-full relative overflow-hidden rounded-2xl">
        {/* Project Image */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${project.gradient} text-background`}>
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* View Project Link */}
          <motion.div
            className="mt-4 flex items-center gap-2 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          >
            <span>View Details</span>
            <ExternalLink size={14} />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  const handlePrevious = useCallback(() => {
    setSelectedProjectIndex((prev) => 
      prev !== null ? (prev - 1 + projects.length) % projects.length : null
    );
  }, []);

  const handleNext = useCallback(() => {
    setSelectedProjectIndex((prev) => 
      prev !== null ? (prev + 1) % projects.length : null
    );
  }, []);

  const selectedProject = selectedProjectIndex !== null ? projects[selectedProjectIndex] : null;

  return (
    <>
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
              A showcase of my creative journey in logo design and thumbnail creation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
                onViewDetails={() => setSelectedProjectIndex(index)}
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

      <AnimatePresence>
        {selectedProject && selectedProjectIndex !== null && (
          <ImageLightbox
            project={selectedProject}
            onClose={() => setSelectedProjectIndex(null)}
            onPrevious={handlePrevious}
            onNext={handleNext}
            currentIndex={selectedProjectIndex}
            totalCount={projects.length}
            allProjects={projects}
            onSelectProject={setSelectedProjectIndex}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectsSection;
