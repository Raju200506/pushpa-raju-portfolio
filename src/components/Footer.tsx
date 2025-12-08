import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Clock, Mail, Phone } from "lucide-react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const quickResponseInfo = [
    { label: "Email Response", time: "Within 24 hours" },
    { label: "Phone Response", time: "Within 2 hours" },
    { label: "Project Discussion", time: "Flexible scheduling" },
  ];

  return (
    <footer className="py-12 border-t border-border/50 relative" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Quick Response Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto mb-12"
        >
          <h3 className="font-display text-lg font-semibold text-center mb-6 flex items-center justify-center gap-2">
            <Clock size={18} className="text-primary" />
            Quick Response Time
          </h3>
          <div className="glass-card rounded-xl overflow-hidden">
            <table className="w-full">
              <tbody>
                {quickResponseInfo.map((item, index) => (
                  <tr
                    key={item.label}
                    className={index !== quickResponseInfo.length - 1 ? "border-b border-border/50" : ""}
                  >
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      {item.label}
                    </td>
                    <td className="py-3 px-4 text-sm text-right font-medium text-primary">
                      {item.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Contact Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 mb-8"
        >
          <a
            href="mailto:pushparaju200506@gmail.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <Mail size={16} />
            pushparaju200506@gmail.com
          </a>
          <a
            href="tel:8639895359"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
          >
            <Phone size={16} />
            +91 8639895359
          </a>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-border/30 my-8" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
            © {new Date().getFullYear()} Pushpa Raju. Made with{" "}
            <Heart size={14} className="text-red-500 fill-red-500" /> in India
          </p>
          <p className="text-muted-foreground/50 text-xs mt-2">
            All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
