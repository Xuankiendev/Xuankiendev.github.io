import React from "react";
import ThreeScene from "./components/ThreeScene";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CyberLab3D from "./components/CyberLab3D";
import IdentityBento from "./components/IdentityBento";
import ProjectsShowcase from "./components/ProjectsShowcase";
import CyberTerminal from "./components/CyberTerminal";
import NuoiKienDonate from "./components/NuoiKienDonate";
import ContactFooter from "./components/ContactFooter";

export default function App() {
  return (
    <div className="relative min-h-screen text-[#f8f2ff] selection:bg-[#ff007f] selection:text-white bg-[#06030d]">
      {/* Three.js 3D WebGL Canvas Interactive Background */}
      <ThreeScene />

      {/* Cyber Laser Cursor (Desktop only) */}
      <CustomCursor />

      {/* Dynamic Aurora Borealis Mesh Glow Orbs */}
      <div className="aurora-mesh" aria-hidden="true">
        <div className="aurora-orb orb-pink" />
        <div className="aurora-orb orb-cyan" />
        <div className="aurora-orb orb-yellow" />
      </div>

      {/* Background Cyber Matrix Grid */}
      <div className="cyber-bg-grid" aria-hidden="true" />

      {/* Main Page Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 space-y-16">
          <Hero />
          <CyberLab3D />
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
