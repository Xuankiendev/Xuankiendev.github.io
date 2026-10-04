import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Coffee, MessageSquare, Sparkles, ShieldCheck, Flame, GitFork, Star, Zap, Cpu, Box } from "lucide-react";
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
    }, 25);
  };

  // Typing effect cho punchlines
  useEffect(() => {
    const currentPunchline = PERSONAL_INFO.punchlines[punchlineIndex];
    const typingSpeed = isDeleting ? 25 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPunchline.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 >= currentPunchline.length) {
          setTimeout(() => setIsDeleting(true), 2200);
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
    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  const handleCoffeeClick = () => {
    playCyberClick(900);
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.7 }
    });
    const donateSection = document.getElementById("donate");
    if (donateSection) donateSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative z-10 pt-10 pb-20 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headlines & Actions */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Status Pill with Rainbow Glow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-pink-500/50 text-pink-300 text-xs font-mono font-bold shadow-[0_0_20px_rgba(255,0,128,0.4)] mb-6 backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
            </span>
            <span className="tracking-wide">CYBER ARCHITECT • 3D INTERACTIVE SYSTEM</span>
          </div>

          {/* Main Title with Scramble Hacker Decrypt & Neon Glow */}
          <h1
            onMouseEnter={triggerScramble}
            className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight leading-[1.05] text-white cursor-pointer select-none"
          >
            <span className="block text-zinc-400 text-2xl sm:text-3xl font-mono font-medium mb-1">
              Hi, I'm
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-300 to-cyan-400 drop-shadow-[0_0_35px_rgba(255,0,128,0.6)] neon-glow-pink">
              {scrambleName}
            </span>
            <span className="block text-white text-3xl sm:text-5xl mt-1 tracking-tight">
              Xuankiendev.
            </span>
          </h1>

          {/* Typing Subtitle */}
          <div className="mt-5 min-h-[40px] flex items-center font-mono text-base sm:text-lg text-zinc-200 bg-black/40 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md">
            <span className="text-pink-400 mr-2 font-black">&gt;&gt;</span>
            <span className="text-yellow-300 font-semibold">{displayText}</span>
            <span className="w-2.5 h-5 bg-cyan-400 ml-1 inline-block animate-pulse shadow-[0_0_8px_#00f2fe]" />
          </div>

          {/* Short Bio */}
          <p className="mt-5 text-zinc-300 text-sm sm:text-base leading-relaxed max-w-xl">
            {PERSONAL_INFO.bio}
          </p>

          {/* Action Button Row */}
          <div className="mt-8 flex flex-wrap gap-3.5 items-center w-full">
            <a
              href="#projects"
              onClick={() => playCyberClick(700)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 text-black font-black text-sm shadow-[0_0_30px_rgba(255,0,128,0.6)] hover:shadow-[0_0_45px_rgba(255,0,128,0.9)] hover:scale-105 active:scale-95 transition-all"
            >
              <span>KHÁM PHÁ DỰ ÁN</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </a>

            <button
              type="button"
              onClick={handleCoffeeClick}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-400/50 text-cyan-200 font-bold text-sm shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:scale-105 transition-all"
            >
              <Coffee className="w-4 h-4 text-yellow-300" />
              <span>Nuôi Kiên Cafe</span>
            </button>

            <a
              href={SOCIAL_LINKS.zalo.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCyberClick(800)}
              className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-200 font-bold text-sm shadow-[0_0_20px_rgba(255,0,128,0.3)] transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 text-pink-400" />
              <span>Zalo 0913288691</span>
            </a>
          </div>

          {/* Floating Sticker Chips */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2.5 items-center">
            <span className="text-xs font-mono font-bold text-pink-400 mr-1 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-yellow-300" /> ARSENAL:
            </span>
            {[
              { name: "Node.js", col: "text-emerald-300 border-emerald-500/40 bg-emerald-500/10" },
              { name: "Three.js 3D", col: "text-cyan-300 border-cyan-500/40 bg-cyan-500/10" },
              { name: "Zalo Protocol", col: "text-blue-300 border-blue-500/40 bg-blue-500/10" },
              { name: "React 19", col: "text-pink-300 border-pink-500/40 bg-pink-500/10" },
              { name: "SQLite Atomic", col: "text-yellow-300 border-yellow-500/40 bg-yellow-500/10" },
              { name: "Automation", col: "text-purple-300 border-purple-500/40 bg-purple-500/10" }
            ].map((tech) => (
              <span
                key={tech.name}
                className={`px-3 py-1 rounded-xl border text-xs font-mono font-bold shadow-sm hover:scale-110 transition-transform ${tech.col}`}
              >
                {tech.name}
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
            className="w-full max-w-md rainbow-border p-6 shadow-[0_20px_70px_rgba(255,0,128,0.35)] backdrop-blur-2xl transition-transform duration-150 ease-out relative group overflow-hidden"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Profile Header */}
            <div className="flex items-center gap-4 pb-5 border-b border-white/10 relative z-10">
              <div className="relative w-16 h-16 rounded-2xl p-1 bg-gradient-to-tr from-pink-500 via-yellow-400 to-cyan-400 shadow-[0_0_30px_rgba(255,0,128,0.7)] animate-pulse">
                <img
                  src={PERSONAL_INFO.avatarUrl}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover rounded-xl bg-zinc-950"
                  onError={(e) => {
                    e.target.src = "https://avatars.githubusercontent.com/Xuankiendev";
                  }}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-white text-lg truncate">
                    {PERSONAL_INFO.name}
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                </div>
                <p className="text-xs font-mono font-bold text-yellow-300">
                  @{PERSONAL_INFO.handle}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] text-zinc-300 font-mono">
                    Cluster Active • 99.9%
                  </span>
                </div>
              </div>
            </div>

            {/* Telemetry Stats Grid with Multi-Color Glow */}
            <div className="grid grid-cols-3 gap-3 my-5 relative z-10">
              <div className="p-3 rounded-2xl bg-pink-500/10 border border-pink-500/30 text-center shadow-[0_0_15px_rgba(255,0,128,0.2)]">
                <span className="block text-2xl font-black font-mono text-pink-400">41+</span>
                <span className="text-[11px] text-zinc-300 font-mono">Public Repos</span>
              </div>
              <div className="p-3 rounded-2xl bg-yellow-500/10 border border-yellow-500/30 text-center shadow-[0_0_15px_rgba(255,224,68,0.2)]">
                <span className="block text-2xl font-black font-mono text-yellow-300">24/7</span>
                <span className="text-[11px] text-zinc-300 font-mono">Bot Uptime</span>
              </div>
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-center shadow-[0_0_15px_rgba(0,242,254,0.2)]">
                <span className="block text-2xl font-black font-mono text-cyan-300">100%</span>
                <span className="text-[11px] text-zinc-300 font-mono">Self-Built</span>
              </div>
            </div>

            {/* Terminal Preview Code Block */}
            <div className="p-4 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs text-zinc-200 space-y-1.5 relative z-10 shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px]">
                <span className="text-yellow-300 font-bold">developer_manifest.json</span>
                <span className="text-emerald-400 font-bold">● ONLINE</span>
              </div>
              <p><span className="text-pink-400">"role"</span>: <span className="text-cyan-300">"Bot & System Engineer"</span>,</p>
              <p><span className="text-pink-400">"speciality"</span>: <span className="text-yellow-300">"Zalo Bot, Reverse Eng, Node.js"</span>,</p>
              <p><span className="text-pink-400">"motto"</span>: <span className="text-emerald-300">"Code sạch, bot khỏe, người vui"</span></p>
            </div>

            {/* Footer Quote Badge */}
            <div className="mt-4 pt-3 flex items-center justify-between text-[11px] font-mono text-zinc-300 relative z-10">
              <span className="flex items-center gap-1.5 text-yellow-300 font-bold">
                <Flame className="w-4 h-4 text-orange-400 animate-bounce" />
                Caffeine-driven dev
              </span>
              <a
                href={SOCIAL_LINKS.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 flex items-center gap-1 font-bold"
              >
                <span>GitHub Org</span>
                <GitFork className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
