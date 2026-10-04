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
    <div className="relative min-h-screen text-[#ededf0] selection:bg-[#fa5d19] selection:text-white bg-[#090a0f]">
      {/* 3D WebGL Titanium Gyroscope & Floating Dust */}
      <ThreeScene />

      {/* Subtle Laser Cursor */}
      <CustomCursor />

      {/* Subtle Ambient Light & Tech Grid */}
      <div className="ambient-subtle-glow" aria-hidden="true" />
      <div className="precision-grid" aria-hidden="true" />

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
