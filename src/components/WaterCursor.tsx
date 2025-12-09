import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Drop {
  id: number;
  x: number;
  y: number;
}

interface TrailPoint {
  id: number;
  x: number;
  y: number;
}

const WaterCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [drops, setDrops] = useState<Drop[]>([]);
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const trailIdRef = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
    
    // Add trail point
    const newTrailPoint: TrailPoint = {
      id: trailIdRef.current++,
      x: e.clientX,
      y: e.clientY,
    };
    
    setTrail((prev) => {
      const newTrail = [...prev, newTrailPoint].slice(-8); // Keep last 8 points
      return newTrail;
    });

    // Remove trail point after delay
    setTimeout(() => {
      setTrail((prev) => prev.filter((point) => point.id !== newTrailPoint.id));
    }, 300);
  }, []);

  const handleMouseEnter = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target.closest("button") ||
      target.closest("a") ||
      target.closest('[role="button"]')
    ) {
      setIsHovering(true);
      // Create water drop effect
      const newDrop: Drop = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setDrops((prev) => [...prev, newDrop]);
      setTimeout(() => {
        setDrops((prev) => prev.filter((drop) => drop.id !== newDrop.id));
      }, 600);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* Trail echo effect */}
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            className="fixed pointer-events-none z-[9997] hidden md:block"
            initial={{ 
              x: point.x - 4, 
              y: point.y - 4, 
              opacity: 0.6,
              scale: 1 
            }}
            animate={{ 
              opacity: 0,
              scale: 0.3 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div 
              className="w-2 h-2 rounded-full bg-primary/60"
              style={{
                opacity: (index + 1) / trail.length * 0.5,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePos.x - 10,
          y: mousePos.y - 10,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 800, 
          damping: 35,
          mass: 0.5
        }}
      >
        <div className="w-5 h-5 rounded-full bg-primary/80" />
      </motion.div>

      {/* Outer ring that follows with delay */}
      <motion.div
        className="fixed pointer-events-none z-[9998] hidden md:block"
        animate={{
          x: mousePos.x - 16,
          y: mousePos.y - 16,
          scale: isHovering ? 1.3 : 1,
        }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25,
          mass: 0.8
        }}
      >
        <div className="w-8 h-8 rounded-full border border-primary/30" />
      </motion.div>

      {/* Water drop effects */}
      <AnimatePresence>
        {drops.map((drop) => (
          <motion.div
            key={drop.id}
            className="fixed pointer-events-none z-[9996] hidden md:block"
            initial={{ x: drop.x - 20, y: drop.y - 20, scale: 0.5, opacity: 1 }}
            animate={{ scale: 2.5, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-10 h-10 rounded-full border-2 border-primary/50" />
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
};

export default WaterCursor;
