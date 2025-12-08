import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WaterCursor from "@/components/WaterCursor";

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleEnterPortfolio = () => {
    setShowWelcome(false);
  };

  return (
    <>
      <WaterCursor />

      {showWelcome ? (
        <WelcomeScreen onEnter={handleEnterPortfolio} />
      ) : (
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Index;
