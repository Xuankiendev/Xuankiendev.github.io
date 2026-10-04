import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, RotateCw, Zap, Eye, Box, Sliders, RefreshCw, Flame, Layers } from "lucide-react";
import { playCyberClick, playCyberSuccess, playHoverBlip } from "../utils/soundFX";
import confetti from "canvas-confetti";

export default function CyberLab3D() {
  const mountRef = useRef(null);
  const [modelType, setModelType] = useState("torus"); // torus, diamond, saturn, helix, icosa
  const [materialStyle, setMaterialStyle] = useState("chrome"); // chrome, neon, glass, points
  const [autoRotate, setAutoRotate] = useState(true);
  const [stats, setStats] = useState({ vertices: 1240, fps: 60 });
  const sceneRef = useRef(null);
  const currentMeshGroupRef = useRef(null);

  const models = [
    { id: "torus", label: "Torus Singularity", icon: "🔮" },
    { id: "diamond", label: "Cyber Diamond", icon: "💎" },
    { id: "saturn", label: "Quantum Saturn", icon: "🪐" },
    { id: "helix", label: "DNA Helix Matrix", icon: "🧬" },
    { id: "icosa", label: "Cyber 20-Face Core", icon: "⚛️" }
  ];

  const materials = [
    { id: "chrome", label: "Rainbow Chrome", desc: "Kim loại lỏng phản chiếu 7 màu" },
    { id: "neon", label: "Hyper Neon Wire", desc: "Lưới laser phát quang cực đại" },
    { id: "glass", label: "Prism Glass", desc: "Kính tán sắc ánh ngọc" },
    { id: "points", label: "Particle Cloud", desc: "1.200 hạt nguyên tử phát sáng" }
  ];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Dynamic Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const light1 = new THREE.PointLight(0xff007f, 6, 50);
    light1.position.set(15, 15, 15);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x00f2fe, 6, 50);
    light2.position.set(-15, -15, 12);
    scene.add(light2);

    const light3 = new THREE.PointLight(0xffaa00, 5, 40);
    light3.position.set(0, 20, -10);
    scene.add(light3);

    const meshGroup = new THREE.Group();
    scene.add(meshGroup);
    currentMeshGroupRef.current = meshGroup;

    // Mouse drag rotation controls
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      meshGroup.rotation.y += deltaX * 0.01;
      meshGroup.rotation.x += deltaY * 0.01;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => (isDragging = false);

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch support for mobile
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMouseX = e.touches[0].clientX;
        prevMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMouseX;
      const deltaY = e.touches[0].clientY - prevMouseY;
      meshGroup.rotation.y += deltaX * 0.012;
      meshGroup.rotation.x += deltaY * 0.012;
      prevMouseX = e.touches[0].clientX;
      prevMouseY = e.touches[0].clientY;
    };
    const onTouchEnd = () => (isDragging = false);

    renderer.domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Render loop
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate && !isDragging) {
        meshGroup.rotation.y += delta * 0.7;
        meshGroup.rotation.x += delta * 0.35;
      }

      // Lights oscillation
      const time = clock.getElapsedTime();
      light1.position.x = Math.sin(time * 1.5) * 16;
      light1.position.y = Math.cos(time * 1.2) * 16;
      light2.position.x = -Math.sin(time * 1.3) * 16;
      light2.position.z = Math.cos(time * 1.4) * 16;

      renderer.render(scene, camera);

      // FPS Counter
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setStats((prev) => ({ ...prev, fps: Math.round((frameCount * 1000) / (now - lastTime)) }));
        frameCount = 0;
        lastTime = now;
      }
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      if (container && renderer.domElement) {
        container.innerHTML = "";
      }
      renderer.dispose();
    };
  }, [autoRotate]);

  // Update 3D Geometry and Material when state changes
  useEffect(() => {
    const group = currentMeshGroupRef.current;
    if (!group) return;

    // Clear old children
    while (group.children.length > 0) {
      const obj = group.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
      group.remove(obj);
    }

    // 1. Create Geometry based on modelType
    let mainGeo;
    let extraGeo = null;

    if (modelType === "torus") {
      mainGeo = new THREE.TorusKnotGeometry(4.2, 1.2, 120, 24, 2, 3);
    } else if (modelType === "diamond") {
      mainGeo = new THREE.OctahedronGeometry(4.8, 2);
    } else if (modelType === "saturn") {
      mainGeo = new THREE.SphereGeometry(3.6, 32, 32);
      extraGeo = new THREE.RingGeometry(4.8, 7.5, 48);
    } else if (modelType === "helix") {
      mainGeo = new THREE.TorusGeometry(4.5, 0.9, 20, 100);
      extraGeo = new THREE.TorusGeometry(4.5, 0.9, 20, 100);
    } else {
      mainGeo = new THREE.IcosahedronGeometry(4.6, 1);
    }

    // 2. Create Material based on materialStyle
    let mainMat;
    let extraMat = null;

    if (materialStyle === "chrome") {
      mainMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        emissive: 0x330044,
        roughness: 0.05,
        metalness: 0.95,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 1.0
      });
      extraMat = new THREE.MeshPhysicalMaterial({
        color: 0x00f2fe,
        emissive: 0x003366,
        roughness: 0.1,
        metalness: 0.9,
        side: THREE.DoubleSide
      });
    } else if (materialStyle === "neon") {
      mainMat = new THREE.MeshBasicMaterial({
        color: 0xff007f,
        wireframe: true
      });
      extraMat = new THREE.MeshBasicMaterial({
        color: 0x00f2fe,
        wireframe: true,
        side: THREE.DoubleSide
      });
    } else if (materialStyle === "glass") {
      mainMat = new THREE.MeshPhysicalMaterial({
        color: 0xffe044,
        emissive: 0x111100,
        roughness: 0.15,
        metalness: 0.1,
        transmission: 0.92,
        ior: 1.6,
        transparent: true,
        opacity: 0.85
      });
      extraMat = new THREE.MeshPhysicalMaterial({
        color: 0xff007f,
        transmission: 0.88,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
    } else {
      // Points / Particle Cloud
      mainMat = new THREE.PointsMaterial({
        color: 0x00f2fe,
        size: 0.28,
        transparent: true,
        opacity: 0.95
      });
      extraMat = new THREE.PointsMaterial({
        color: 0xff007f,
        size: 0.24,
        transparent: true,
        opacity: 0.9
      });
    }

    // Add main mesh
    if (materialStyle === "points") {
      const points = new THREE.Points(mainGeo, mainMat);
      group.add(points);
    } else {
      const mesh = new THREE.Mesh(mainGeo, mainMat);
      group.add(mesh);

      // Add a thin glowing wireframe cage on top for extra cyber depth
      if (materialStyle === "chrome" || materialStyle === "glass") {
        const wire = new THREE.Mesh(
          mainGeo,
          new THREE.MeshBasicMaterial({ color: 0x00f2fe, wireframe: true, transparent: true, opacity: 0.2 })
        );
        wire.scale.set(1.02, 1.02, 1.02);
        group.add(wire);
      }
    }

    // Add extra mesh (e.g. Saturn ring, Helix cross)
    if (extraGeo && extraMat) {
      if (materialStyle === "points") {
        const extraPoints = new THREE.Points(extraGeo, extraMat);
        extraPoints.rotation.x = Math.PI / 2.3;
        group.add(extraPoints);
      } else {
        const extraMesh = new THREE.Mesh(extraGeo, extraMat);
        extraMesh.rotation.x = Math.PI / 2.3;
        group.add(extraMesh);
      }
    }

    // Outer orbital particles
    const orbitCount = 80;
    const orbitGeo = new THREE.BufferGeometry();
    const orbitPos = new Float32Array(orbitCount * 3);
    for (let i = 0; i < orbitCount; i++) {
      const angle = (i / orbitCount) * Math.PI * 2;
      const radius = 7.5 + Math.sin(i) * 1.5;
      orbitPos[i * 3] = Math.cos(angle) * radius;
      orbitPos[i * 3 + 1] = Math.sin(i * 3) * 1.2;
      orbitPos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    orbitGeo.setAttribute("position", new THREE.BufferAttribute(orbitPos, 3));
    const orbitMat = new THREE.PointsMaterial({
      color: 0xffaa00,
      size: 0.35,
      transparent: true,
      opacity: 0.9
    });
    const orbitPoints = new THREE.Points(orbitGeo, orbitMat);
    group.add(orbitPoints);

    setStats((prev) => ({
      ...prev,
      vertices: mainGeo.attributes.position ? mainGeo.attributes.position.count : 1500
    }));
  }, [modelType, materialStyle]);

  // Supernova Explosion Action
  const triggerSupernova = () => {
    playCyberSuccess();
    confetti({
      particleCount: 120,
      spread: 120,
      origin: { y: 0.5 }
    });

    const group = currentMeshGroupRef.current;
    if (!group) return;

    let scale = 1;
    let expanding = true;
    const interval = setInterval(() => {
      if (expanding) {
        scale += 0.08;
        group.scale.set(scale, scale, scale);
        group.rotation.y += 0.3;
        if (scale >= 1.6) expanding = false;
      } else {
        scale -= 0.06;
        group.scale.set(scale, scale, scale);
        if (scale <= 1) {
          group.scale.set(1, 1, 1);
          clearInterval(interval);
        }
      }
    }, 20);
  };

  return (
    <section id="lab3d" className="relative z-10 py-16 px-4 sm:px-6 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col items-start mb-8">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-cyan-500/20 border border-pink-500/40 text-pink-400 font-mono text-xs font-bold shadow-[0_0_20px_rgba(255,0,128,0.3)] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
          <span>CYBERNETIC 3D LAB // REALTIME WEBGL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Phòng Thí Nghiệm <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-400 to-cyan-400 animate-pulse">3D Không Gian</span>.
        </h2>
        <p className="mt-2 text-zinc-300 text-sm sm:text-base max-w-2xl leading-relaxed">
          Kéo thả chuột trực tiếp trên khung bên dưới để xoay góc nhìn 360 độ, đổi mô hình hình học, thay đổi vật liệu phản chiếu kim loại lỏng hoặc kích hoạt hiệu ứng nổ hạt siêu tân tinh!
        </p>
      </div>

      {/* Main 3D Lab Studio Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* 3D Viewport (8 cols) */}
        <div className="lg:col-span-8 rounded-3xl bg-gradient-to-b from-[#140b29] via-[#0d071a] to-[#07040e] border-2 border-pink-500/40 shadow-[0_0_50px_rgba(255,0,128,0.25)] relative overflow-hidden flex flex-col justify-between min-h-[440px] sm:min-h-[520px] group">
          {/* Cyber HUD Corner Overlays */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 font-mono text-xs text-cyan-300 bg-black/60 px-3 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>RENDER_MODE: WEBGL 2.0</span>
          </div>

          <div className="absolute top-4 right-4 z-20 flex items-center gap-3 font-mono text-xs text-zinc-400 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <span>Vertices: <strong className="text-yellow-400">{stats.vertices}</strong></span>
            <span>FPS: <strong className="text-emerald-400">{stats.fps}</strong></span>
          </div>

          {/* Three.js Interactive Canvas Container */}
          <div
            ref={mountRef}
            className="w-full flex-1 cursor-grab active:cursor-grabbing relative z-10"
            title="Nhấp và kéo chuột để xoay 3D 360 độ"
          />

          {/* Bottom HUD Hint & Action Toolbar */}
          <div className="relative z-20 p-4 bg-black/70 border-t border-white/10 backdrop-blur-xl flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-300">
              <RotateCw className="w-3.5 h-3.5 text-orange-400" />
              <span>Chạm / Kéo chuột để xoay 360°</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  playCyberClick(700);
                  setAutoRotate(!autoRotate);
                }}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold border transition-all ${
                  autoRotate
                    ? "bg-cyan-500/20 border-cyan-500 text-cyan-300 shadow-[0_0_12px_rgba(0,242,254,0.4)]"
                    : "bg-white/5 border-white/10 text-zinc-400"
                }`}
              >
                Auto-Rotate: {autoRotate ? "ON" : "OFF"}
              </button>

              <button
                type="button"
                onClick={triggerSupernova}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 text-white font-mono text-xs font-black shadow-[0_0_20px_rgba(255,0,128,0.5)] hover:scale-105 active:scale-95 transition-all"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>SUPERNOVA</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3D Control Rack (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl p-6 bg-[#120a22]/90 border border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col justify-between space-y-6">
          {/* Models Selector */}
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 font-mono text-xs font-bold text-yellow-400 uppercase tracking-wider">
              <Box className="w-4 h-4" />
              <span>1. Chọn Khối Hình Học 3D</span>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2">
              {models.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => {
                    playCyberClick(800);
                    setModelType(m.id);
                  }}
                  onMouseEnter={playHoverBlip}
                  className={`flex items-center justify-between p-3 rounded-2xl border font-mono text-xs font-bold transition-all ${
                    modelType === m.id
                      ? "bg-gradient-to-r from-pink-500/30 to-purple-500/20 border-pink-500 text-white shadow-[0_0_18px_rgba(255,0,128,0.35)] scale-[1.02]"
                      : "bg-white/[0.03] border-white/5 text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-base">{m.icon}</span>
                    <span>{m.label}</span>
                  </span>
                  {modelType === m.id && <span className="text-pink-400 text-xs">● ACTIVE</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Materials Selector */}
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-white/10 font-mono text-xs font-bold text-cyan-400 uppercase tracking-wider">
              <Sliders className="w-4 h-4" />
              <span>2. Chọn Hiệu Ứng Vật Liệu</span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {materials.map((mat) => (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => {
                    playCyberClick(900);
                    setMaterialStyle(mat.id);
                  }}
                  onMouseEnter={playHoverBlip}
                  className={`p-2.5 rounded-xl border text-left font-mono transition-all ${
                    materialStyle === mat.id
                      ? "bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.3)] scale-105"
                      : "bg-white/[0.03] border-white/5 text-zinc-400 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <span className="block text-xs font-bold truncate">{mat.label}</span>
                  <span className="block text-[10px] text-zinc-500 mt-0.5 line-clamp-1">{mat.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Info Box */}
          <div className="p-3.5 rounded-2xl bg-black/60 border border-white/5 font-mono text-[11px] text-zinc-400 leading-relaxed">
            <span className="text-yellow-400 font-bold block mb-1">⚡ GPU Hardware Acceleration:</span>
            Mọi bóng đổ và ánh sáng phản xạ kim loại đều được xử lý bằng shader Three.js ACES Filmic trên card đồ họa với tốc độ 60fps mượt mà!
          </div>
        </div>
      </div>
    </section>
  );
}
