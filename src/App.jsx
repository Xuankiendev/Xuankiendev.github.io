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
    <div className="relative min-h-screen text-[#f6f0ff] selection:bg-[#ff007f] selection:text-white bg-[#06020c]">
      {/* 3D WebGL Holographic Sculpture & Starfield */}
      <ThreeScene />

      {/* Laser Crosshair Cursor */}
      <CustomCursor />

      {/* Dynamic Aurora Plasma Light Blobs (Multi-color Ambient Glow) */}
      <div className="aurora-plasma-bg" aria-hidden="true">
        <div className="aurora-blob blob-1" />
        <div className="aurora-blob blob-2" />
        <div className="aurora-blob blob-3" />
      </div>

      {/* Tech Matrix Grid */}
      <div className="cyber-matrix-grid" aria-hidden="true" />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <main className="flex-1 space-y-16">
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
