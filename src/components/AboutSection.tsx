import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award, Briefcase, MapPin } from "lucide-react";
import profileImage from "@/assets/profile.jpg";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    {
      icon: GraduationCap,
      title: "B.Tech Student",
      description: "Pursuing at DIET, Anakapalle",
    },
    {
      icon: Award,
      title: "Award Winner",
      description: "Published books & editing achievements",
    },
    {
      icon: Briefcase,
      title: "Internship Experience",
      description: "Samsung, HPCL, TRANSCO & more",
    },
    {
      icon: MapPin,
      title: "Location",
      description: "Visakhapatnam, India",
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            About Me
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            Get to Know Me
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />

              <div className="relative glass-card p-3 rounded-3xl overflow-hidden">
                <img
                  src={profileImage}
                  alt="Pushpa Raju"
                  className="w-full aspect-square object-cover rounded-2xl"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent rounded-2xl" />

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-sm font-medium">
                      Open to Opportunities
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="font-display text-2xl md:text-3xl font-semibold">
              A Passionate{" "}
              <span className="gradient-text">Creative Designer</span> & B.Tech
              Student
            </h3>

            <p className="text-muted-foreground leading-relaxed">
              I'm Adari Pushpa Raju, a B.Tech student at Dadi Institute of
              Engineering and Technology with a strong passion for visual
              creativity. My journey in design started with simple edits and has
              evolved into a comprehensive skill set spanning photo editing,
              video production, logo design, and thumbnail creation.
            </p>

            <p className="text-muted-foreground leading-relaxed">
              I've had the privilege of publishing two books at DIET Anakapalle
              — the Drop Book and I² Book — showcasing my editing capabilities.
              When I'm not designing, I'm exploring new technologies through
              internships at companies like Samsung, HPCL, and TRANSCO.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="glass-card p-4 rounded-xl group hover:border-primary/50 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
