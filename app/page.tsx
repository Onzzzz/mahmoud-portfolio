"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SpeedDial from "@/components/layout/SpeedDial";
import CursorGlow from "@/components/effects/CursorGlow";
import NoiseOverlay from "@/components/effects/NoiseOverlay";
import ScrollProgress from "@/components/ui/ScrollProgress";
import AIChatbot from "@/components/ui/AIChatbot";
import WhatsAppWidget from "@/components/ui/WhatsAppWidget";
import AppointmentScheduler from "@/components/ui/AppointmentScheduler";
import PersonaBar from "@/components/ui/PersonaBar";
import Hero from "@/components/sections/Hero";
import Impact from "@/components/sections/Impact";
import About from "@/components/sections/About";
import CareerMap from "@/components/sections/CareerMap";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import CaseStudies from "@/components/sections/CaseStudies";
import Skills from "@/components/sections/Skills";
import Gallery from "@/components/sections/Gallery";
import Flowcharts from "@/components/sections/Flowcharts";
import Services from "@/components/sections/Services";
import Thoughts from "@/components/sections/Thoughts";
import Certifications from "@/components/sections/Certifications";
import ROICalculator from "@/components/sections/ROICalculator";
import SkillsQuiz from "@/components/sections/SkillsQuiz";
import Demos from "@/components/sections/Demos";
import DailyTools from "@/components/sections/DailyTools";
import GoalTracker from "@/components/sections/GoalTracker";
import KanbanBoard from "@/components/sections/KanbanBoard";
import VisitorGlobe from "@/components/sections/VisitorGlobe";
import SocialFeed from "@/components/sections/SocialFeed";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <NoiseOverlay />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Impact />
        <About />
        <CareerMap />
        <Experience />
        <Projects />
        <CaseStudies />
        <Skills />
        <Gallery />
        <Flowcharts />
        <Services />
        <Thoughts />
        <Certifications />
        <ROICalculator />
        <SkillsQuiz />
        <DailyTools />
        <GoalTracker />
        <KanbanBoard />
        <VisitorGlobe />
        <SocialFeed />
        <Testimonials />
        <AppointmentScheduler inline />
        <Contact />
      </main>
      <Footer />
      <SpeedDial />
      <AIChatbot />
      <WhatsAppWidget />
    </>
  );
}
