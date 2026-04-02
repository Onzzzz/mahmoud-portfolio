"use client";

import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Certifications } from "@/components/sections/Certifications";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { BookCall } from "@/components/sections/BookCall";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import AIChatbot from "@/components/ui/AIChatbot";
import { PageLoader } from "@/components/effects/PageLoader";
import { Industries } from "@/components/sections/Industries";

export default function Home() {
  return (
    <>
      <PageLoader />
      {/* Under Development Banner */}
      <div
        className="fixed top-0 left-0 right-0 z-[60] text-center py-2 px-4 text-sm font-medium tracking-wide"
        style={{
          background: "var(--gradient-accent)",
          color: "#1A1814",
        }}
      >
        This website is currently under development — check back soon for the full experience.
      </div>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Industries />
        <Projects />
        <Skills />
        <Certifications />
        <Services />
        <Testimonials />
        <BookCall />
        <Contact />
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
}
