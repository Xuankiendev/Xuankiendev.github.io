import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Chỉ kích hoạt trên desktop (có chuột)
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Kiểm tra xem phần tử dưới chuột có click được không
      const target = e.target;
      const clickable = target.closest("a, button, input, [role='button'], .clickable");
      setIsPointer(!!clickable);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);

    const render = () => {
      // Lerp ring position
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center Laser Dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ${
          isPointer
            ? "w-2.5 h-2.5 bg-cyan-400 shadow-[0_0_12px_#00f2fe]"
            : "w-2 h-2 bg-orange-500 shadow-[0_0_10px_#fa5d19]"
        }`}
      />
      {/* Outer Hologram Ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-500/50 transition-all duration-150 ease-out ${
          isPointer
            ? "w-11 h-11 border-cyan-400/80 bg-cyan-400/10 scale-110"
            : isClicked
            ? "w-7 h-7 border-pink-500 bg-pink-500/20 scale-90"
            : "w-9 h-9 border-orange-500/40"
        }`}
      >
        {/* Tiny crosshair markings */}
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-orange-400/70" />
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-1 bg-orange-400/70" />
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-1 bg-orange-400/70" />
        <span className="absolute right-0 top-1/2 -translate-y-1/2 h-0.5 w-1 bg-orange-400/70" />
      </div>
    </>
  );
}
