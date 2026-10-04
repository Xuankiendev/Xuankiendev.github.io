import React, { useState, useRef } from "react";
import { Code2, ExternalLink, Sparkles, CheckCircle2, Star, Eye, Layers, Filter } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { PROJECTS } from "../data/portfolioData";
import { playCyberClick, playHoverBlip } from "../utils/soundFX";

export default function ProjectsShowcase() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: "all", label: "Tất cả dự án" },
    { id: "bot", label: "Bot & Automation" },
    { id: "web", label: "Web & 3D UI" },
    { id: "game", label: "Mini Games & Tools" },
    { id: "api", label: "API Utilities" }
  ];

  const filteredProjects =
    activeCategory === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-semibold mb-3 w-fit">
            <Code2 className="w-3.5 h-3.5" />
            <span>02 // PROJECT ARCHIVES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Những gì đang được <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-orange-400">xây dựng</span>.
          </h2>
          <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl">
            Không chia chế độ LITE hay FULL — tất cả đều được render ở mức độ chi tiết và hiệu ứng 3D thị giác cao nhất.
          </p>
        </div>

        {/* Filter Segmented Control (evondev UI style) */}
        <div className="flex flex-wrap gap-1 p-1.5 rounded-2xl bg-[#140e24]/90 border border-white/10 backdrop-blur-md self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                playCyberClick(700);
                setActiveCategory(cat.id);
              }}
              onMouseEnter={playHoverBlip}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-[0_0_15px_rgba(250,93,25,0.4)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid with 3D Tilt Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={() => setSelectedProject(project)}
          />
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}

// 3D Tilt Card Component
function ProjectCard({ project, onSelect }) {
  const cardRef = useRef(null);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

    // Calculate glare coordinate %
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.15
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative rounded-3xl p-6 sm:p-7 bg-[#100720]/90 border transition-all duration-200 ease-out flex flex-col justify-between group overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        borderColor: `${project.accentColor}50`,
        boxShadow: `0 15px 45px -10px ${project.accentColor}30`
      }}
    >
      {/* Dynamic Colored Ambient Corner Glow */}
      <div
        className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-30 transition-opacity group-hover:opacity-60"
        style={{ background: project.accentColor }}
      />

      {/* Holographic Mouse Glare Layer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,${glarePos.opacity}) 0%, transparent 60%)`
        }}
      />

      {/* Top Banner & Badge */}
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3 pb-4 border-b border-white/10">
          <span
            className="px-3 py-1 rounded-xl font-mono text-xs font-black border shadow-sm"
            style={{
              background: `${project.accentColor}20`,
              borderColor: `${project.accentColor}60`,
              color: project.accentColor
            }}
          >
            ✦ {project.badge}
          </span>
          <span className="font-mono text-xs text-zinc-300 font-semibold">
            {project.language}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="mt-5 text-xl sm:text-2xl font-black text-white group-hover:text-yellow-300 transition-colors flex items-center justify-between">
          <span className="tracking-tight">{project.title}</span>
          <Star className="w-5 h-5 text-yellow-400 shrink-0 group-hover:rotate-45 group-hover:scale-125 transition-transform" />
        </h3>

        {/* Description */}
        <p className="mt-2 text-zinc-400 text-sm leading-relaxed">
          {project.desc}
        </p>

        {/* Highlights List */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          {project.highlights.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="truncate">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="relative z-10 mt-7 pt-5 border-t border-white/5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => {
            playCyberClick(850);
            onSelect();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-mono font-semibold text-zinc-200 transition-all hover:scale-105"
        >
          <Eye className="w-3.5 h-3.5 text-orange-400" />
          <span>Chi tiết kiến trúc</span>
        </button>

        <div className="flex items-center gap-2">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCyberClick(700)}
            title="Xem GitHub Repo"
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-zinc-300 hover:text-white transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playCyberClick(750)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-mono text-xs font-bold shadow-[0_0_15px_rgba(250,93,25,0.3)] hover:scale-105 transition-all"
          >
            <span>Live Link</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

// Modal Inspector
function ProjectModal({ project, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 bg-[#130b24] border border-orange-500/40 shadow-[0_25px_80px_rgba(0,0,0,0.9)] max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-zinc-300 font-mono text-xs grid place-items-center transition-colors"
        >
          ✕
        </button>

        <div className="flex items-center gap-2 text-xs font-mono text-orange-400">
          <Layers className="w-4 h-4" />
          <span>PROJECT_INSPECTOR_V2</span>
        </div>

        <h3 className="mt-2 text-2xl font-bold text-white">{project.title}</h3>
        <p className="mt-1 text-xs font-mono text-cyan-400">{project.language}</p>

        <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
          {project.desc}
        </p>

        <div className="mt-6 p-4 rounded-2xl bg-black/60 border border-white/10">
          <h4 className="font-mono text-xs font-bold text-white mb-2 uppercase tracking-wider">
            Đặc tả kỹ thuật nổi bật
          </h4>
          <ul className="space-y-2 text-xs font-mono text-zinc-300">
            {project.highlights.map((h, i) => (
              <li key={i} className="flex items-center gap-2">
                <span className="text-orange-400">●</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300"
          >
            Đóng
          </button>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-mono font-bold"
          >
            <GithubIcon className="w-4 h-4" />
            <span>Mở GitHub Repo</span>
          </a>
        </div>
      </div>
    </div>
  );
}
