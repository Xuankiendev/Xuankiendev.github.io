import React from "react";
import ThreeScene from "./components/ThreeScene";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import IdentityBento from "./components/IdentityBento";
import ProjectsShowcase from "./components/ProjectsShowcase";
import CyberTerminal from "./components/CyberTerminal";
import NuoiKienDonate from "./components/NuoiKienDonate";
import ContactFooter from "./components/ContactFooter";

export default function App() {
  return (
    <div className="relative min-h-screen text-[#f1e9f8] selection:bg-[#fa5d19] selection:text-white">
      {/* Three.js 3D WebGL Canvas Interactive Background */}
      <ThreeScene />

      {/* Cyber Laser Cursor (Desktop only) */}
      <CustomCursor />

      {/* Background Cyber Matrix Grid & Ambient Glow */}
      <div className="cyber-bg-grid" aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />

      {/* Main Page Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 space-y-12">
          <Hero />
          <IdentityBento />
          <ProjectsShowcase />
          <CyberTerminal />
          <NuoiKienDonate />
        </main>

        <ContactFooter />
      </div>
    </div>
  );
}
