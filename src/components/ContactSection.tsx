import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Download,
  Mail,
  Youtube,
  Instagram,
  Phone,
  Send,
  CheckCircle,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [inquiry, setInquiry] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiry.trim()) {
      toast({
        title: "Please enter your inquiry",
        description: "The inquiry field cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setInquiry("");
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon!",
      });
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

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
    {
      icon: Phone,
      href: "tel:+918639895359",
      label: "Phone",
      color: "hover:text-green-500",
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
            Let's Work Together
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's create something amazing.
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

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-card p-8 rounded-2xl mb-12"
          >
            <h3 className="font-display text-xl font-semibold mb-6 text-center">
              Creative Collaboration Inquiry
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Textarea
                placeholder="Tell me about your project idea, requirements, timeline, and how we can collaborate..."
                value={inquiry}
                onChange={(e) => setInquiry(e.target.value)}
                className="min-h-[150px] bg-secondary/50 border-border/50 focus:border-primary/50 resize-none"
              />
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  disabled={isSubmitting || isSubmitted}
                  className="min-w-[180px]"
                >
                  {isSubmitted ? (
                    <>
                      <CheckCircle size={18} />
                      Sent!
                    </>
                  ) : isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </Button>
                <Button variant="glass" size="lg" asChild>
                  <a href="mailto:pushparaju200506@gmail.com">
                    <Mail size={18} />
                    Email Directly
                  </a>
                </Button>
              </div>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-muted-foreground text-sm mb-4">
              Follow me on social media
            </p>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`p-3 glass-card rounded-xl ${social.color} transition-colors duration-300`}
                >
                  <social.icon size={24} />
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
