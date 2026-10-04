import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Sparkles, Terminal, Code2, Heart, MessageSquare } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../data/portfolioData";
import { toggleAudio, getAudioState, playCyberClick } from "../utils/soundFX";

export default function Navbar() {
  const [isAudioActive, setIsAudioActive] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAudioToggle = () => {
    const state = toggleAudio();
    setIsAudioActive(state);
  };

  const navLinks = [
    { label: "Bản sắc", href: "#identity", icon: Sparkles },
    { label: "Dự án", href: "#projects", icon: Code2 },
    { label: "Terminal", href: "#terminal", icon: Terminal },
    { label: "Nuôi Kiên", href: "#donate", icon: Heart },
    { label: "Liên hệ", href: "#contact", icon: MessageSquare }
  ];

  return (
    <header className="sticky top-4 z-50 px-4 sm:px-6 max-w-6xl mx-auto w-full transition-all duration-300">
      <nav
        className={`flex items-center justify-between gap-3 px-4 py-2.5 rounded-full border transition-all duration-300 ${
          isScrolled
            ? "bg-[#0b0814]/90 border-orange-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.6)] backdrop-blur-xl"
            : "bg-[#0f0b1a]/70 border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md"
        }`}
      >
        {/* Brand Logo & Avatar */}
        <a
          href="#"
          onClick={() => playCyberClick(700)}
          className="flex items-center gap-3 group outline-none"
        >
          <div className="relative w-9 h-9 rounded-full p-[2px] bg-gradient-to-tr from-orange-500 via-pink-500 to-cyan-400 group-hover:scale-105 transition-transform">
            <img
              src={PERSONAL_INFO.avatarUrl}
              alt={PERSONAL_INFO.name}
              className="w-full h-full object-cover rounded-full bg-[#171021]"
              onError={(e) => {
                e.target.src = "https://avatars.githubusercontent.com/Xuankiendev";
              }}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-[#090511] rounded-full animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-[15px] tracking-tight text-white group-hover:text-orange-400 transition-colors">
                {PERSONAL_INFO.handle}
              </span>
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                v2.0 3D
              </span>
            </div>
            <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline-block">
              {PERSONAL_INFO.name}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/5">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => playCyberClick(600)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-all duration-150"
              >
                <Icon className="w-3.5 h-3.5 text-orange-400" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Sound Synthesizer Button */}
          <button
            type="button"
            onClick={handleAudioToggle}
            title={isAudioActive ? "Tắt âm thanh hiệu ứng" : "Bật âm thanh không gian Cyber"}
            className={`p-2 rounded-full border transition-all duration-200 ${
              isAudioActive
                ? "bg-orange-500/20 border-orange-500/60 text-orange-400 shadow-[0_0_15px_rgba(250,93,25,0.4)]"
                : "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
            }`}
          >
            {isAudioActive ? (
              <Volume2 className="w-4 h-4 animate-bounce" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* GitHub CTA */}
          <a
            href={SOCIAL_LINKS.github.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCyberClick(800)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(250,93,25,0.35)] hover:shadow-[0_0_25px_rgba(250,93,25,0.6)] hover:scale-105 transition-all"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300"
          >
            <span className="text-xs font-mono font-bold">MENU</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-3 rounded-2xl bg-[#0b0814]/95 border border-orange-500/30 backdrop-blur-xl shadow-2xl flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  playCyberClick(600);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-zinc-200 hover:bg-white/10 hover:text-orange-400 transition-colors"
              >
                <Icon className="w-4 h-4 text-orange-400" />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
