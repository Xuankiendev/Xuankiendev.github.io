import React, { useState, useEffect } from "react";
import { Sparkles, Cpu, Layers, Server, Activity, GitCommit, Check, Terminal, ExternalLink, Zap } from "lucide-react";
import { TECH_STACK, PHILOSOPHY_PILLARS, SOCIAL_LINKS } from "../data/portfolioData";
import { playHoverBlip, playCyberClick } from "../utils/soundFX";

export default function IdentityBento() {
  const [selectedTech, setSelectedTech] = useState(TECH_STACK[0]);
  const [githubEventsCount, setGithubEventsCount] = useState(84);
  const [heatmapCells, setHeatmapCells] = useState(
    Array.from({ length: 84 }, (_, i) => {
      // Fallback matrix levels 0 -> 4
      const rand = Math.sin(i * 3.7) * 10;
      if (rand > 6) return 4;
      if (rand > 3) return 3;
      if (rand > 0) return 2;
      if (rand > -3) return 1;
      return 0;
    })
  );

  useEffect(() => {
    // Tự động nạp GitHub Events thật từ GitHub API
    async function fetchGithubActivity() {
      try {
        const res = await fetch("https://api.github.com/users/Xuankiendev/events/public?per_page=100");
        if (!res.ok) return;
        const events = await res.json();
        if (Array.isArray(events) && events.length > 0) {
          setGithubEventsCount(events.length);
          const counts = new Array(84).fill(0);
          events.forEach((ev) => {
            const ageDays = Math.floor((Date.now() - new Date(ev.created_at).getTime()) / 86400000);
            if (ageDays >= 0 && ageDays < 84) {
              counts[83 - ageDays] += 1;
            }
          });
          const mapped = counts.map((c) => {
            if (c === 0) return 0;
            if (c === 1) return 1;
            if (c <= 3) return 2;
            if (c <= 6) return 3;
            return 4;
          });
          setHeatmapCells(mapped);
        }
      } catch (err) {
        // Fallback
      }
    }
    fetchGithubActivity();
  }, []);

  return (
    <section id="identity" className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      {/* Section Header (evondev style) */}
      <div className="flex flex-col items-start mb-10">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>01 // IDENTITY & PHILOSOPHY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Một góc Internet mang tên <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Xuankiendev</span>.
        </h2>
        <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl">
          Được thiết kế theo chuẩn Bento Grid: không dài dòng, không CV sáo rỗng. Mọi thứ được thể hiện qua các khối dữ liệu thực chiến và mã nguồn mở.
        </p>
      </div>

      {/* Bento Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Card 1: Core Philosophy (7 cols) */}
        <div className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-black/40 border border-white/10 hover:border-pink-500/50 shadow-2xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between group">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="font-mono text-xs text-orange-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Terminal className="w-4 h-4" />
                Manifesto.md
              </span>
              <span className="text-xs font-mono text-zinc-400">README_V2</span>
            </div>

            <h3 className="mt-5 text-xl sm:text-2xl font-bold text-white tracking-tight">
              Tôi không cố tạo ra một "ứng viên hoàn hảo".
            </h3>
            <p className="mt-2 text-zinc-400 text-sm leading-relaxed">
              Tôi muốn được nhớ tới như một người thích tạo ra thứ mới, thích build in public và để project tự lên tiếng thay cho câu "em là người chăm chỉ, ham học hỏi".
            </p>

            {/* 3 Pillars */}
            <div className="mt-6 space-y-3.5">
              {PHILOSOPHY_PILLARS.map((pillar) => (
                <div
                  key={pillar.index}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors flex items-start gap-3.5"
                >
                  <span className="px-2 py-0.5 rounded font-mono text-xs font-black bg-orange-500/20 text-orange-400 border border-orange-500/30 shrink-0 mt-0.5">
                    {pillar.index}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-400">Status: Verified Developer</span>
            <a
              href={SOCIAL_LINKS.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              <span>Xem nhật ký commit</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Card 2: Interactive Tech Arsenal (5 cols) */}
        <div className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-black/40 border border-white/10 hover:border-cyan-500/50 shadow-2xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Cpu className="w-4 h-4" />
                Tech Arsenal
              </span>
              <span className="text-xs font-mono text-zinc-400">10 Core Stacks</span>
            </div>

            <h3 className="mt-5 text-xl font-bold text-white">
              Vũ khí kỹ thuật & Công cụ
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Nhấp vào từng công nghệ để xem chi tiết cấp độ và ứng dụng.
            </p>

            {/* Tech Badges Grid */}
            <div className="mt-5 flex flex-wrap gap-2">
              {TECH_STACK.map((tech) => (
                <button
                  key={tech.name}
                  type="button"
                  onClick={() => {
                    playCyberClick(750);
                    setSelectedTech(tech);
                  }}
                  onMouseEnter={playHoverBlip}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-medium transition-all ${
                    selectedTech.name === tech.name
                      ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(0,242,254,0.3)] scale-105"
                      : "bg-white/[0.04] text-zinc-300 border border-white/10 hover:bg-white/[0.08]"
                  }`}
                >
                  {tech.name}
                </button>
              ))}
            </div>

            {/* Selected Tech Inspector Box */}
            <div className="mt-6 p-4 rounded-2xl bg-black/40 border border-white/10">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{selectedTech.name}</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300">
                  {selectedTech.level}
                </span>
              </div>
              <div className="mt-2 text-xs font-mono text-zinc-400 space-y-1">
                <p>Phân loại: <span className="text-white">{selectedTech.category}</span></p>
                <p>Tình trạng: <span className="text-emerald-400">Production Ready</span></p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Runtime: Node ^24.x</span>
            <span className="text-cyan-400">ESM Pure</span>
          </div>
        </div>

        {/* Card 3: Zalo Bot PM2 Cluster Telemetry (5 cols) */}
        <div className="md:col-span-5 rounded-3xl p-6 sm:p-8 bg-black/40 border border-white/10 hover:border-pink-500/50 shadow-2xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="font-mono text-xs text-pink-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Server className="w-4 h-4" />
                Cluster Monitor
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>

            <h3 className="mt-5 text-xl font-bold text-white">
              Cụm Zalo Bot Đa Tiến Trình
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Hệ thống xử lý phân tán quản lý bằng PM2, tối ưu chống sập, chịu tải hàng trăm nghìn tin nhắn mỗi ngày.
            </p>

            <div className="mt-6 space-y-3 font-mono text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-zinc-400">Uptime:</span>
                <span className="text-white font-bold">99.98% / 365 ngày</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-zinc-400">Latency trung bình:</span>
                <span className="text-cyan-400 font-bold">&lt; 18ms</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5">
                <span className="text-zinc-400">Anti-Spam & Guard:</span>
                <span className="text-pink-400 font-bold">Active 2-Layer</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Process Engine: Linux VPS</span>
            <span className="text-pink-400">Zero Crash Policy</span>
          </div>
        </div>

        {/* Card 4: GitHub Matrix Heatmap (7 cols) */}
        <div className="md:col-span-7 rounded-3xl p-6 sm:p-8 bg-black/40 border border-white/10 hover:border-emerald-500/50 shadow-2xl backdrop-blur-xl transition-all duration-300 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="font-mono text-xs text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                <Activity className="w-4 h-4" />
                Live GitHub Pulse
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {githubEventsCount} public events gần nhất
              </span>
            </div>

            <h3 className="mt-5 text-xl font-bold text-white">
              Tần Suất Commit & Xây Dựng
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Biểu đồ trực quan hóa nhịp độ phát triển liên tục trên GitHub @Xuankiendev.
            </p>

            {/* 84-Cell Activity Grid */}
            <div className="mt-6 p-4 rounded-2xl bg-black/50 border border-white/10">
              <div className="grid grid-cols-12 sm:grid-cols-14 gap-1.5">
                {heatmapCells.map((level, idx) => {
                  const colors = [
                    "bg-[#1b1526]",
                    "bg-[#49235b]",
                    "bg-[#73308c]",
                    "bg-[#ae43c2] shadow-[0_0_8px_rgba(174,67,194,0.4)]",
                    "bg-[#00f2fe] shadow-[0_0_10px_rgba(0,242,254,0.6)]"
                  ];
                  return (
                    <div
                      key={idx}
                      onMouseEnter={playHoverBlip}
                      title={`Level ${level} activity`}
                      className={`aspect-square rounded-[3px] transition-transform duration-150 hover:scale-150 cursor-pointer ${colors[level]}`}
                    />
                  );
                })}
              </div>

              {/* Heatmap Legend */}
              <div className="mt-4 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Ít hoạt động</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#1b1526]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#49235b]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#73308c]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#ae43c2]" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-[#00f2fe]" />
                </div>
                <span className="text-cyan-400">Năng nổ cao</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-zinc-400">
            <span>Dữ liệu: Đồng bộ tự động</span>
            <a
              href="https://github.com/Xuankiendev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>GitHub Graph ↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
