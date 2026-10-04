import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animationFrameId;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07060b, 0.0018);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 42);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 3. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const orangeLight = new THREE.PointLight(0xfa5d19, 4, 70);
    orangeLight.position.set(20, 20, 20);
    scene.add(orangeLight);

    const cyanLight = new THREE.PointLight(0x00f2fe, 4, 70);
    cyanLight.position.set(-20, -15, 15);
    scene.add(cyanLight);

    const pinkLight = new THREE.PointLight(0xff2a85, 3.5, 60);
    pinkLight.position.set(0, 25, -10);
    scene.add(pinkLight);

    // 4. Hero Cyber Core: Torus Knot + Wireframe Cage
    const coreGroup = new THREE.Group();
    coreGroup.position.set(16, 2, -5); // Đặt lệch phải để phối hợp với Hero text bên trái

    // Outer Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(6.5, 1.8, 128, 32, 2, 3);
    const knotMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x160f29,
      emissive: 0x24083a,
      roughness: 0.15,
      metalness: 0.9,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false
    });
    const torusKnot = new THREE.Mesh(knotGeometry, knotMaterial);
    coreGroup.add(torusKnot);

    // Torus Knot Neon Wireframe Overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xfa5d19,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const wireKnot = new THREE.Mesh(knotGeometry, wireMat);
    wireKnot.scale.set(1.02, 1.02, 1.02);
    coreGroup.add(wireKnot);

    // Outer Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(12, 0.08, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.45
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(13.5, 0.06, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff2a85,
      transparent: true,
      opacity: 0.4
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 2.5;
    coreGroup.add(ring2);

    scene.add(coreGroup);

    // 5. Interactive Particle Constellation (2000 particles)
    const particleCount = 2000;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color("#fa5d19"), // heat orange
      new THREE.Color("#00f2fe"), // cyan
      new THREE.Color("#ff2a85"), // pink
      new THREE.Color("#ffe044"), // yellow
      new THREE.Color("#a766ff")  // violet
    ];

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Phân bổ hạt trong khối cầu elip rộng
      const r = 25 + Math.random() * 55;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.65;
      const z = (r * Math.cos(phi)) - 10;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      originalPositions[idx] = x;
      originalPositions[idx + 1] = y;
      originalPositions[idx + 2] = z;

      const col = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material với điểm sáng tròn
    const particleCanvas = document.createElement("canvas");
    particleCanvas.width = 16;
    particleCanvas.height = 16;
    const pctx = particleCanvas.getContext("2d");
    const pgrad = pctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    pgrad.addColorStop(0, "rgba(255,255,255,1)");
    pgrad.addColorStop(0.35, "rgba(255,255,255,0.7)");
    pgrad.addColorStop(1, "rgba(255,255,255,0)");
    pctx.fillStyle = pgrad;
    pctx.fillRect(0, 0, 16, 16);
    const particleTex = new THREE.CanvasTexture(particleCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.65,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 6. Floating Cyber Horizon Wireframe Grid at bottom
    const gridHelper = new THREE.GridHelper(120, 48, 0xfa5d19, 0x1f1730);
    gridHelper.position.set(0, -22, 0);
    scene.add(gridHelper);

    // 7. Mouse & Scroll interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) * 0.001;
      mouseY = (e.clientY - windowHalfY) * 0.001;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      
      // Responsive vị trí core 3D
      if (width < 860) {
        coreGroup.position.set(0, 10, -12);
        coreGroup.scale.set(0.68, 0.68, 0.68);
      } else {
        coreGroup.position.set(16, 2, -5);
        coreGroup.scale.set(1, 1, 1);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // 8. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Xoay 3D Core
      torusKnot.rotation.x = elapsedTime * 0.35 + targetY * 2;
      torusKnot.rotation.y = elapsedTime * 0.45 + targetX * 2;
      wireKnot.rotation.x = torusKnot.rotation.x;
      wireKnot.rotation.y = torusKnot.rotation.y;

      ring1.rotation.z = elapsedTime * 0.25;
      ring2.rotation.x = -elapsedTime * 0.3;

      // Chuyển động lượn sóng của particle
      const posAttr = particleGeo.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const ox = originalPositions[idx];
        const oy = originalPositions[idx + 1];
        const oz = originalPositions[idx + 2];

        // Sóng không gian
        const wave = Math.sin(elapsedTime * 1.2 + ox * 0.08) * 0.8;
        posAttr.array[idx + 1] = oy + wave;

        // Phản ứng nhẹ với chuột
        posAttr.array[idx] = ox + targetX * 12;
      }
      posAttr.needsUpdate = true;

      // Xoay nhẹ cả hệ thống hạt
      particleSystem.rotation.y = elapsedTime * 0.035;

      // Camera parallax nhẹ
      camera.position.x += (targetX * 8 - camera.position.x) * 0.04;
      camera.position.y += (-targetY * 6 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      knotGeometry.dispose();
      knotMaterial.dispose();
      wireMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}
