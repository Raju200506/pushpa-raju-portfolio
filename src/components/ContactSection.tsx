import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Download, Youtube, Instagram } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    {
      icon: Youtube,
      href: "https://youtube.com/@skill_store_official?si=Yfn_EwXmtF6BqeDB",
      label: "YouTube",
      color: "hover:text-[#FF0000]",
    },
    {
      icon: Instagram,
      href: "https://www.instagram.com/skill_store_official?igsh=aW9sMnlyNXBsY3Uz",
      label: "Instagram",
      color: "hover:text-[#E4405F]",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 md:py-32 relative overflow-hidden bg-secondary/20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest">
            Get In Touch
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mt-3">
            Let's Connect
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Follow me on social media to see my latest work and updates.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Resume Download */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <Button variant="heroOutline" size="lg" asChild>
              <a href="/resume.pdf" download="Pushpa_Raju_Resume.pdf">
                <Download size={18} />
                Download Resume
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <p className="text-muted-foreground text-sm mb-6">
              Follow me on social media
            </p>
            <div className="flex justify-center gap-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`p-4 glass-card rounded-xl ${social.color} transition-colors duration-300 flex items-center gap-3`}
                >
                  <social.icon size={28} />
                  <span className="font-medium">{social.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
