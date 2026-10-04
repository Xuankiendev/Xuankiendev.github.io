import React, { useState, useEffect } from "react";
import { MessageSquare, Mail, ArrowUp, Clock, Globe, Shield, Terminal, Heart } from "lucide-react";
import { GithubIcon, FacebookIcon, ZaloIcon } from "./SocialIcons";
import { SOCIAL_LINKS, PERSONAL_INFO } from "../data/portfolioData";
import { playCyberClick } from "../utils/soundFX";

export default function ContactFooter() {
  const [vietnamTime, setVietnamTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      }).format(now);
      setVietnamTime(timeStr);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    playCyberClick(900);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const contactCards = [
    {
      label: "Zalo Official",
      sub: "Kênh liên hệ chính & phản hồi nhanh nhất",
      value: SOCIAL_LINKS.zalo.value,
      url: SOCIAL_LINKS.zalo.url,
      icon: ZaloIcon,
      color: "text-cyan-400",
      btnText: "Mở Zalo chat"
    },
    {
      label: "GitHub Profile",
      sub: "Mã nguồn mở, bot repositories & PRs",
      value: SOCIAL_LINKS.github.value,
      url: SOCIAL_LINKS.github.url,
      icon: GithubIcon,
      color: "text-orange-400",
      btnText: "Ghé thăm GitHub"
    },
    {
      label: "Facebook",
      sub: "Tài khoản mạng xã hội cá nhân",
      value: SOCIAL_LINKS.facebook.value,
      url: SOCIAL_LINKS.facebook.url,
      icon: FacebookIcon,
      color: "text-blue-400",
      btnText: "Kết nối Facebook"
    },
    {
      label: "Email Liên Hệ",
      sub: "Hợp tác dự án & trao đổi kỹ thuật",
      value: SOCIAL_LINKS.email.value,
      url: SOCIAL_LINKS.email.url,
      icon: Mail,
      color: "text-pink-400",
      btnText: "Soạn thư điện tử"
    }
  ];

  return (
    <footer id="contact" className="relative z-10 pt-20 pb-12 border-t border-white/10 bg-[#07050d]/90 backdrop-blur-2xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs font-semibold mb-3 w-fit">
              <Globe className="w-3.5 h-3.5" />
              <span>05 // DIRECT TRANSMISSION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Kết nối với <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Xuankiendev</span>.
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-xl">
              Zalo là kênh liên hệ chính. GitHub là nơi xem những gì tôi đang xây. Đô nét là nơi thể hiện bạn tin vào tương lai no bụng của dev này!
            </p>
          </div>

          {/* Telemetry Clock Badge */}
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-xs text-zinc-300">
            <Clock className="w-4 h-4 text-emerald-400 animate-spin" />
            <div>
              <span className="text-zinc-500 block text-[10px]">HÀ NỘI (GMT+7)</span>
              <span className="font-bold text-emerald-400 text-sm">{vietnamTime || "00:00:00"}</span>
            </div>
          </div>
        </div>

        {/* 4 Contact Channels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactCards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playCyberClick(700)}
                className="p-5 rounded-2xl bg-[#110c1f]/80 border border-white/5 hover:border-orange-500/40 hover:bg-white/[0.05] transition-all hover:scale-105 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <Icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-xs font-mono text-zinc-500 group-hover:text-white transition-colors">↗</span>
                  </div>
                  <h4 className="mt-4 font-bold text-white text-base">{item.label}</h4>
                  <p className="mt-1 text-xs text-zinc-400 leading-relaxed">{item.sub}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 font-mono text-xs font-semibold text-orange-400">
                  {item.btnText}
                </div>
              </a>
            );
          })}
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span>© 2026 {PERSONAL_INFO.name} ({PERSONAL_INFO.handle}). All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-zinc-400">
              Build with <Heart className="w-3 h-3 text-pink-500 fill-pink-500" /> React 19 & Three.js
            </span>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-orange-500/20 hover:text-orange-300 border border-white/10 text-zinc-300 transition-colors"
              title="Cuộn lên đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
