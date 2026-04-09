"use client";

import { Navbar } from "@/components/layout/Navbar";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Industries } from "@/components/sections/Industries";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import AIChatbot from "@/components/ui/AIChatbot";
import { PageLoader } from "@/components/effects/PageLoader";

export default function Home() {
  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Industries />
        <Projects />
        <Skills />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <AIChatbot />
    </>
  );
}
