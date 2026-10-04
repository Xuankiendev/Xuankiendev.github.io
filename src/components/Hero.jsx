import React, { useState, useEffect } from "react";
import { ArrowRight, Coffee, MessageSquare, Sparkles, RotateCw, Zap } from "lucide-react";
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

  const handleCoffeeClick = () => {
    playCyberClick(900);
    confetti({
      particleCount: 80,
      spread: 90,
      origin: { y: 0.6 }
    });
    const donateSection = document.getElementById("donate");
    if (donateSection) donateSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative z-10 pt-16 pb-28 px-4 sm:px-6 max-w-6xl mx-auto w-full min-h-[75vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
        {/* Left Column: Vibrant Typography & Laser Actions */}
        <div className="lg:col-span-7 flex flex-col items-start">
          {/* Status Badge with Neon Border */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-pink-500/50 text-pink-300 font-mono text-xs font-bold shadow-[0_0_25px_rgba(255,0,128,0.45)] mb-6 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="tracking-wider">ZALO BOT ARCHITECT • THREE.JS 3D</span>
          </div>

          {/* Hero Name with Animated Rainbow Text Flow */}
          <h1
            onMouseEnter={triggerScramble}
            className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight leading-[0.95] text-white cursor-pointer select-none"
          >
            <span className="block text-zinc-400 text-xl sm:text-2xl font-mono font-medium mb-2">
              Xin chào, tôi là
            </span>
            <span className="block rainbow-text-flow font-black">
              {scrambleName}
            </span>
            <span className="block text-white text-4xl sm:text-6xl mt-2 tracking-tight">
              Xuankiendev.
            </span>
          </h1>

          {/* Rotating Punchline */}
          <div className="mt-6 min-h-[44px] flex items-center font-mono text-base sm:text-lg text-zinc-200 bg-black/60 px-4 py-2.5 rounded-2xl border border-cyan-500/30 backdrop-blur-xl shadow-[0_0_20px_rgba(0,242,254,0.15)]">
            <span className="text-pink-400 mr-2 font-black">&gt;&gt;</span>
            <span className="text-yellow-300 font-semibold">{displayText}</span>
            <span className="w-2.5 h-5 bg-cyan-400 ml-1 inline-block animate-pulse shadow-[0_0_12px_#00f2fe]" />
          </div>

          {/* Action Buttons with High-Quality Glow */}
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <a
              href="#projects"
              onClick={() => playCyberClick(700)}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl neon-btn-primary text-black font-black text-sm tracking-wide transition-all"
            >
              <span>Xem các dự án</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </a>

            <button
              type="button"
              onClick={handleCoffeeClick}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/60 text-cyan-200 font-bold text-sm shadow-[0_0_25px_rgba(0,242,254,0.35)] hover:scale-105 transition-all"
            >
              <Coffee className="w-4 h-4 text-yellow-300" />
              <span>Nuôi Kiên Cafe</span>
            </button>

            <a
              href={SOCIAL_LINKS.zalo.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCyberClick(800)}
              className="px-5 py-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 text-zinc-200 hover:text-white font-mono text-xs font-bold transition-all shadow-sm"
            >
              Zalo: 0913288691 ↗
            </a>
          </div>
        </div>

        {/* Right Column: Left completely open to showcase the glowing 3D Holographic Core */}
        <div className="lg:col-span-5 hidden lg:flex flex-col items-end justify-center pointer-events-none select-none">
          <div className="p-4 rounded-2xl bg-black/60 border border-pink-500/40 backdrop-blur-xl text-right font-mono text-xs text-zinc-300 shadow-[0_0_30px_rgba(255,0,128,0.25)]">
            <span className="flex items-center justify-end gap-1.5 text-yellow-300 font-bold mb-1">
              <RotateCw className="w-3.5 h-3.5 animate-spin" />
              <span>3D Hologram Sculpture</span>
            </span>
            <span className="text-zinc-400">Rê chuột để đổi góc phản chiếu ánh sáng</span>
          </div>
        </div>
      </div>
    </section>
  );
}
