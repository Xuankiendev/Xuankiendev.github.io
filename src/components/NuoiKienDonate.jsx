import React, { useState } from "react";
import { Coffee, Copy, Check, QrCode, Heart, Sparkles, Shield, CreditCard, ExternalLink } from "lucide-react";
import { BANK_INFO, PERSONAL_INFO } from "../data/portfolioData";
import { playCyberClick, playCyberSuccess } from "../utils/soundFX";
import confetti from "canvas-confetti";

export default function NuoiKienDonate() {
  const [copiedField, setCopiedField] = useState(null);
  const [selectedCaffeine, setSelectedCaffeine] = useState(BANK_INFO.caffeineOptions[0]);
  const [showQrModal, setShowQrModal] = useState(false);

  const handleCopy = (text, fieldName) => {
    playCyberSuccess();
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    });
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleBurstConfetti = () => {
    playCyberSuccess();
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="donate" className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 font-mono text-xs font-semibold mb-3">
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
          <span>04 // NUÔI KIÊN FUND</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Quỹ “<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500">Nuôi Kiên</span>”.
        </h2>
        <p className="mt-3 text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Góc quyên góp hoàn toàn nghiêm túc về mặt kỹ thuật, nhưng hơi không nghiêm túc về mặt câu chữ. Mỗi lượt donate là thêm caffeine tinh thần để Kiên tiếp tục build, fix bug và giả vờ rằng "em không thức tới 2 giờ sáng đâu".
        </p>
      </div>

      {/* 2-Column Donation Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Cyber Bank Card & Caffeine Meter (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Cyber Bank Card (ATM Style) */}
          <div className="relative rainbow-border p-7 shadow-[0_20px_70px_rgba(255,224,68,0.25)] overflow-hidden group">
            {/* Background Hologram Mesh */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-yellow-500/25 via-pink-500/20 to-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-orange-400" />
                  <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
                    NuoiKien Virtual Card
                  </span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Instant Support
                </span>
              </div>

              {/* Account Number */}
              <div className="mt-8">
                <span className="text-xs font-mono text-zinc-400 block mb-1">
                  Số tài khoản nhận donate
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-2xl sm:text-3xl font-black font-mono tracking-wider text-white">
                    {BANK_INFO.accountNumber}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(BANK_INFO.accountNumber, "stk")}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-500/20 hover:bg-orange-500/40 border border-orange-500/40 text-orange-300 font-mono text-xs font-bold transition-all hover:scale-105"
                  >
                    {copiedField === "stk" ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedField === "stk" ? "Đã chép STK" : "Chép STK"}</span>
                  </button>
                </div>
              </div>

              {/* Account Name & Note */}
              <div className="mt-6 pt-5 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-xs font-mono text-zinc-400 block">Chủ tài khoản</span>
                  <strong className="text-sm font-bold text-white uppercase mt-0.5 block">
                    {BANK_INFO.accountName}
                  </strong>
                </div>

                <div>
                  <span className="text-xs font-mono text-zinc-400 block">Nội dung chuyển khoản</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-mono text-zinc-200 truncate">
                      {BANK_INFO.defaultNote}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(BANK_INFO.defaultNote, "note")}
                      className="text-orange-400 hover:text-orange-300 p-1"
                      title="Chép nội dung"
                    >
                      {copiedField === "note" ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Caffeine Meter Selector */}
          <div className="rounded-3xl p-6 bg-[#110c1f]/80 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs text-orange-400 font-bold uppercase flex items-center gap-1.5">
                <Coffee className="w-4 h-4" />
                Caffeine Tier Calculator
              </span>
              <span className="text-xs font-mono text-zinc-400">Chọn mức tiếp tế</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {BANK_INFO.caffeineOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => {
                    playCyberClick(800);
                    setSelectedCaffeine(opt);
                  }}
                  className={`p-3 rounded-2xl border text-left font-mono transition-all ${
                    selectedCaffeine.label === opt.label
                      ? "bg-orange-500/20 border-orange-500 text-white shadow-[0_0_15px_rgba(250,93,25,0.3)] scale-105"
                      : "bg-white/[0.03] border-white/10 text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span className="block text-xs font-bold truncate">{opt.label}</span>
                  <span className="block text-sm font-black text-orange-400 mt-1">
                    {opt.amount}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-zinc-400 flex items-center justify-between">
              <span>Hiệu quả: <strong className="text-white">{selectedCaffeine.desc}</strong></span>
              <button
                type="button"
                onClick={handleBurstConfetti}
                className="text-pink-400 hover:text-pink-300 font-bold underline"
              >
                Gửi tim ❤️
              </button>
            </div>
          </div>

          {/* Fun Disclaimer Note */}
          <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/20 text-xs font-mono text-orange-300 leading-relaxed">
            💡 <strong>Ghi chú vui:</strong> Donate không đảm bảo bug biến mất ngay, nhưng chắc chắn giúp tác giả bớt hoang mang khi bug xuất hiện.
          </div>
        </div>

        {/* Right: QR Code Visual Card (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl p-7 bg-[#110c1f]/85 border border-white/10 hover:border-orange-500/40 shadow-2xl backdrop-blur-xl flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-4">
            <QrCode className="w-4 h-4 text-orange-400" />
            <span>QUÉT MÃ TIẾP TẾ “NUÔI KIÊN”</span>
          </div>

          {/* QR Image Box */}
          <div
            onClick={() => setShowQrModal(true)}
            className="relative p-3 rounded-2xl bg-white shadow-[0_0_35px_rgba(255,255,255,0.15)] group cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={PERSONAL_INFO.legacyQrUrl}
              alt="Mã QR quyên góp Nuôi Kiên"
              referrerPolicy="no-referrer"
              className="w-52 h-52 object-contain rounded-lg"
              onError={(e) => {
                // Fallback nếu link zdn bị chặn trên môi trường
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
            {/* Fallback QR Card */}
            <div
              style={{ display: "none" }}
              className="w-52 h-52 bg-zinc-900 rounded-lg flex-col items-center justify-center p-4 text-zinc-300 font-mono text-xs gap-2"
            >
              <QrCode className="w-12 h-12 text-orange-400" />
              <span>STK: 0345864723</span>
              <span>Vũ Xuân Kiên</span>
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-mono text-xs font-bold">
              Nhấp để phóng to QR
            </div>
          </div>

          <p className="mt-5 text-xs text-zinc-400 max-w-xs font-mono leading-relaxed">
            Nếu scan xong mà ví hơi nhẹ đi một chút, đó là dấu hiệu hệ thống đang hoạt động hoàn toàn bình thường.
          </p>

          <button
            type="button"
            onClick={handleBurstConfetti}
            className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-mono text-xs font-bold shadow-[0_0_20px_rgba(250,93,25,0.35)] hover:scale-105 transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>Tung hoa giấy cảm ơn</span>
          </button>
        </div>
      </div>

      {/* QR Zoom Modal */}
      {showQrModal && (
        <div
          onClick={() => setShowQrModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="p-6 rounded-3xl bg-[#130b24] border border-orange-500/40 text-center max-w-sm w-full"
          >
            <h4 className="text-white font-bold text-lg mb-4">Mã QR Nuôi Kiên</h4>
            <div className="p-3 bg-white rounded-2xl inline-block shadow-2xl">
              <img
                src={PERSONAL_INFO.legacyQrUrl}
                alt="QR Nuôi Kiên"
                referrerPolicy="no-referrer"
                className="w-64 h-64 object-contain rounded-lg"
              />
            </div>
            <p className="mt-3 font-mono text-xs text-orange-400">STK: 0345864723 — Vũ Xuân Kiên</p>
            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="mt-5 px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold"
            >
              Đóng lại
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
