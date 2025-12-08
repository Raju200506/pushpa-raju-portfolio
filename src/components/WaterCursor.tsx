import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Drop {
  id: number;
  x: number;
  y: number;
}

const WaterCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [drops, setDrops] = useState<Drop[]>([]);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
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
      {/* Main cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{
          x: mousePos.x - 10,
          y: mousePos.y - 10,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="w-5 h-5 rounded-full bg-primary/80" />
      </motion.div>

      {/* Water drop effects */}
      <AnimatePresence>
        {drops.map((drop) => (
          <motion.div
            key={drop.id}
            className="fixed pointer-events-none z-[9998] hidden md:block"
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
