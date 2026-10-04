import React, { useState, useRef, useEffect } from "react";
import { Terminal, Copy, Check, Play, Trash2, Sparkles, CornerDownLeft } from "lucide-react";
import { TERMINAL_COMMANDS } from "../data/portfolioData";
import { playCyberClick, playHoverBlip, playCyberSuccess } from "../utils/soundFX";

export default function CyberTerminal() {
  const [history, setHistory] = useState([
    {
      command: "welcome",
      output: "Khởi tạo hệ thống Xuankiendev Cyber Terminal v2.0...\nNhập 'help' hoặc bấm các nút bên dưới để bắt đầu tương tác."
    }
  ]);
  const [inputVal, setInputVal] = useState("");
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const quickCommands = ["help", "whoami", "skills", "projects", "stats", "donate", "contact", "clear"];

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    playCyberClick(900);

    if (trimmed === "clear") {
      setHistory([]);
      setInputVal("");
      return;
    }

    const output =
      TERMINAL_COMMANDS[trimmed] ||
      `Lệnh '${trimmed}' không hợp lệ. Nhập 'help' để xem các lệnh được hỗ trợ.`;

    setHistory((prev) => [...prev, { command: trimmed, output }]);
    setInputVal("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
  };

  const handleCopyHistory = () => {
    playCyberSuccess();
    const textToCopy = history
      .map((h) => `$ ${h.command}\n${h.output}`)
      .join("\n\n");
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <section id="terminal" className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-8">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 font-mono text-xs font-semibold mb-3">
          <Terminal className="w-3.5 h-3.5" />
          <span>03 // INTERACTIVE CLI</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Hacker <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-orange-400 to-cyan-400">Terminal</span> Simulator.
        </h2>
        <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl">
          Tương tác trực tiếp với hồ sơ cá nhân qua giao diện dòng lệnh. Gõ lệnh hoặc bấm nút lệnh nhanh để chạy tức thì.
        </p>
      </div>

      {/* Terminal Container Box */}
      <div className="rounded-3xl bg-black/50 border border-white/10 shadow-[0_20px_70px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl">
        {/* Terminal Header Bar */}
        <div className="px-4 py-3 bg-[#130d22] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-2 font-mono text-xs text-zinc-400 font-medium">
              bash — xuankiendev@vps: ~
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyHistory}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white text-xs font-mono transition-colors"
              title="Sao chép toàn bộ nội dung terminal"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copied ? "Đã chép" : "Chép log"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCommand("clear")}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-red-400 text-xs transition-colors"
              title="Xóa terminal"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="p-4 sm:p-6 font-mono text-xs sm:text-sm text-zinc-300 min-h-[300px] max-h-[460px] overflow-y-auto space-y-4 cursor-text"
        >
          {history.map((item, idx) => (
            <div key={idx} className="space-y-1.5">
              <div className="flex items-center gap-2 text-orange-400 font-bold">
                <span>➜</span>
                <span className="text-cyan-400">~/xuankiendev</span>
                <span className="text-zinc-500">$</span>
                <span className="text-white">{item.command}</span>
              </div>
              <pre className="text-zinc-300 whitespace-pre-wrap font-mono text-xs sm:text-sm pl-4 border-l border-white/10 leading-relaxed">
                {item.output}
              </pre>
            </div>
          ))}

          {/* Prompt Input Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
            <span className="text-orange-400 font-bold">➜</span>
            <span className="text-cyan-400 font-bold">~/xuankiendev</span>
            <span className="text-zinc-500">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="gõ 'help', 'whoami', 'projects'..."
              className="flex-1 bg-transparent text-white font-mono outline-none border-none text-xs sm:text-sm placeholder-zinc-600"
            />
            <button
              type="submit"
              className="text-zinc-400 hover:text-orange-400 p-1"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>

          <div ref={bottomRef} />
        </div>

        {/* Quick Command Action Bar (evondev inspired) */}
        <div className="p-3 bg-[#0d0818] border-t border-white/5 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-mono text-zinc-400 mr-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-orange-400" />
            Quick Run:
          </span>
          {quickCommands.map((cmd) => (
            <button
              key={cmd}
              type="button"
              onClick={() => handleCommand(cmd)}
              onMouseEnter={playHoverBlip}
              className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-orange-500/20 hover:text-orange-300 border border-white/5 text-[11px] font-mono text-zinc-300 transition-all hover:scale-105"
            >
              /{cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
