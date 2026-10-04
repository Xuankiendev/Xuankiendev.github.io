import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Coffee, MessageSquare, Terminal, Sparkles, CheckCircle2, ShieldCheck, Flame, GitFork, Star } from "lucide-react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "../data/portfolioData";
import { playCyberClick, playHoverBlip } from "../utils/soundFX";
import confetti from "canvas-confetti";

export default function Hero() {
  const [displayText, setDisplayText] = useState("");
  const [punchlineIndex, setPunchlineIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  // Hacker Text Decrypt Effect cho tên
  const [scrambleName, setScrambleName] = useState(PERSONAL_INFO.name);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

  const triggerScramble = () => {
    playHoverBlip();
    let iteration = 0;
    const target = PERSONAL_INFO.name;
    const interval = setInterval(() => {
      setScrambleName(
        target
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return target[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= target.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2;
    }, 30);
  };

  // Typing effect cho punchlines
  useEffect(() => {
    const currentPunchline = PERSONAL_INFO.punchlines[punchlineIndex];
    const typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPunchline.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 >= currentPunchline.length) {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        setDisplayText(currentPunchline.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex - 1 <= 0) {
          setIsDeleting(false);
          setPunchlineIndex((prev) => (prev + 1) % PERSONAL_INFO.punchlines.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, punchlineIndex]);

  // Card 3D Tilt effect
  const cardRef = useRef(null);
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  const handleCoffeeClick = () => {
    playCyberClick(900);
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 }
    });
    const donateSection = document.getElementById("donate");
    if (donateSection) donateSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative z-10 pt-12 pb-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headlines & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium shadow-[0_0_15px_rgba(16,185,129,0.2)] mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Available for Bot & Automation Projects</span>
          </div>

          {/* Main Title with Scramble Hacker Decrypt */}
          <h1
            onMouseEnter={triggerScramble}
            className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] text-white cursor-pointer select-none"
          >
            <span className="block text-zinc-400 text-2xl sm:text-3xl font-mono font-medium mb-1">
              Hi, I'm
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-cyan-400 drop-shadow-[0_0_25px_rgba(250,93,25,0.3)]">
              {scrambleName}
            </span>
            <span className="block text-white text-3xl sm:text-5xl mt-1 tracking-tight">
              Xuankiendev.
            </span>
          </h1>

          {/* Typing Subtitle */}
          <div className="mt-5 min-h-[36px] flex items-center font-mono text-base sm:text-lg text-zinc-300">
            <span className="text-orange-400 mr-2 font-bold">&gt;</span>
            <span className="text-orange-200">{displayText}</span>
            <span className="w-2 h-5 bg-orange-400 ml-1 inline-block animate-pulse" />
          </div>

          {/* Short Bio */}
          <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
            {PERSONAL_INFO.bio}
          </p>

          {/* Action Button Row */}
          <div className="mt-8 flex flex-wrap gap-3 items-center w-full">
            <a
              href="#projects"
              onClick={() => playCyberClick(700)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(250,93,25,0.4)] hover:shadow-[0_0_35px_rgba(250,93,25,0.7)] hover:scale-105 transition-all"
            >
              <span>Xem các dự án</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={handleCoffeeClick}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-zinc-200 font-semibold text-sm hover:border-orange-500/40 transition-all hover:scale-105"
            >
              <Coffee className="w-4 h-4 text-orange-400" />
              <span>Nuôi Kiên Cafe</span>
            </button>

            <a
              href={SOCIAL_LINKS.zalo.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCyberClick(800)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-semibold text-sm transition-all"
            >
              <MessageSquare className="w-4 h-4 text-cyan-400" />
              <span>Zalo 0913288691</span>
            </a>
          </div>

          {/* Tech Badges Row */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-mono text-zinc-400 mr-2">CORE:</span>
            {["Node.js", "Zalo Bot", "React 19", "Three.js", "SQLite", "Automation"].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-300 hover:border-orange-500/40 hover:text-orange-300 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: 3D Holographic Profile Telemetry Card */}
        <div className="lg:col-span-5 flex justify-center">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full max-w-md rounded-3xl p-6 bg-gradient-to-b from-[#181126]/90 to-[#0e0917]/95 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-transform duration-150 ease-out relative group overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Top Accent Glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-cyan-400" />

            {/* Profile Header */}
            <div className="flex items-center gap-4 pb-5 border-b border-white/10">
              <div className="relative w-16 h-16 rounded-2xl p-1 bg-gradient-to-tr from-orange-500 to-pink-500 shadow-[0_0_25px_rgba(250,93,25,0.4)]">
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover rounded-xl bg-zinc-900"
                  onError={(e) => {
                    e.target.src = "https://avatars.githubusercontent.com/Xuankiendev";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-white text-lg truncate">
                    {PERSONAL_INFO.name}
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                </div>
                <p className="text-xs font-mono text-orange-400">
                  @{PERSONAL_INFO.handle}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] text-zinc-400 font-mono">
                    Cluster Active • 99.9%
                  </span>
                </div>
              </div>
            </div>

            {/* Telemetry Stats Grid */}
            <div className="grid grid-cols-3 gap-3 my-5">
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                <span className="block text-2xl font-black font-mono text-white">41+</span>
                <span className="text-[11px] text-zinc-400 font-mono">Public Repos</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                <span className="block text-2xl font-black font-mono text-orange-400">24/7</span>
                <span className="text-[11px] text-zinc-400 font-mono">Bot Uptime</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 text-center">
                <span className="block text-2xl font-black font-mono text-cyan-400">100%</span>
                <span className="text-[11px] text-zinc-400 font-mono">Self-Built</span>
              </div>
            </div>

            {/* Terminal Preview Code Block */}
            <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-300 space-y-1.5">
              <div className="flex items-center justify-between pb-2 border-b border-white/5 text-zinc-400 text-[11px]">
                <span>developer_manifest.json</span>
                <span className="text-emerald-400">● live</span>
              </div>
              <p><span className="text-pink-400">"role"</span>: <span className="text-yellow-300">"Bot & System Engineer"</span>,</p>
              <p><span className="text-pink-400">"speciality"</span>: <span className="text-cyan-300">"Zalo Bot, Reverse Eng, Node.js"</span>,</p>
              <p><span className="text-pink-400">"motto"</span>: <span className="text-orange-300">"Code sạch, bot khỏe, người vui"</span></p>
            </div>

            {/* Footer Quote Badge */}
            <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                Caffeine-driven dev
              </span>
              <a
                href={SOCIAL_LINKS.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-orange-400 hover:text-orange-300 underline underline-offset-2 flex items-center gap-1"
              >
                <span>GitHub Org</span>
                <GitFork className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
