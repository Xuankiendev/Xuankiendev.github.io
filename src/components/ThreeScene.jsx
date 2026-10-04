import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let animId;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // 1. Scene & Cinematic Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090d, 0.015);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 32);

    // 2. High-performance Antialiased Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 3. Cinematic Studio Lighting (Warm Key + Cold Rim)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Warm Heat Accent Light (evondev / linear style)
    const keyLight = new THREE.DirectionalLight(0xff6b22, 2.5);
    keyLight.position.set(20, 20, 25);
    scene.add(keyLight);

    // Soft Cyan/Platinum Fill Light
    const fillLight = new THREE.DirectionalLight(0xa5c9ff, 1.8);
    fillLight.position.set(-20, -10, 20);
    scene.add(fillLight);

    // Deep Backlight for Rim Highlights
    const backLight = new THREE.PointLight(0xffffff, 2.0, 60);
    backLight.position.set(0, 0, -15);
    scene.add(backLight);

    // 4. HERO 3D SCULPTURE: Precision Gyroscopic Tech Orb (Titanium & Frosted Glass)
    const sculptureGroup = new THREE.Group();
    sculptureGroup.position.set(13, 0, 0);

    // Outer Precision Titanium Ring
    const outerRingGeo = new THREE.TorusGeometry(8.5, 0.22, 32, 160);
    const titaniumMat = new THREE.MeshPhysicalMaterial({
      color: 0x222530,
      roughness: 0.18,
      metalness: 0.92,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1
    });
    const outerRing = new THREE.Mesh(outerRingGeo, titaniumMat);
    sculptureGroup.add(outerRing);

    // Middle Gyroscope Ring (Accent Heat Orange)
    const midRingGeo = new THREE.TorusGeometry(7.2, 0.18, 32, 160);
    const orangeAnodizedMat = new THREE.MeshPhysicalMaterial({
      color: 0xfa5d19,
      emissive: 0x5a1800,
      roughness: 0.25,
      metalness: 0.85,
      clearcoat: 0.5
    });
    const midRing = new THREE.Mesh(midRingGeo, orangeAnodizedMat);
    midRing.rotation.x = Math.PI / 3;
    sculptureGroup.add(midRing);

    // Inner Gyroscope Ring (Platinum)
    const innerRingGeo = new THREE.TorusGeometry(5.8, 0.14, 32, 160);
    const platinumMat = new THREE.MeshPhysicalMaterial({
      color: 0xd8e0ee,
      roughness: 0.12,
      metalness: 0.95
    });
    const innerRing = new THREE.Mesh(innerRingGeo, platinumMat);
    innerRing.rotation.y = Math.PI / 2.5;
    sculptureGroup.add(innerRing);

    // Core: Geometric Icosahedron with Wireframe Crown
    const coreGeo = new THREE.IcosahedronGeometry(3.2, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f1118,
      roughness: 0.1,
      metalness: 0.9,
      clearcoat: 1.0,
      transmission: 0.35,
      transparent: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sculptureGroup.add(coreMesh);

    // Thin Elegant Laser Wireframe on Core
    const coreWire = new THREE.Mesh(
      coreGeo,
      new THREE.MeshBasicMaterial({ color: 0xfa5d19, wireframe: true, transparent: true, opacity: 0.35 })
    );
    coreWire.scale.set(1.02, 1.02, 1.02);
    sculptureGroup.add(coreWire);

    scene.add(sculptureGroup);

    // 5. Cinematic Ambient Dust Particles (Inertia Floating)
    // 600 hạt vi lượng tinh xảo thay cho 3000 hạt lòe loẹt
    const particleCount = 650;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleAlphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 80;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 40 - 5;
      particleAlphas[i] = 0.2 + Math.random() * 0.6;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));

    // Canvas Texture for Soft Round Glow Particles
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pctx = pCanvas.getContext("2d");
    const pgrad = pctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pgrad.addColorStop(0, "rgba(255,255,255,1)");
    pgrad.addColorStop(0.3, "rgba(255,180,120,0.6)");
    pgrad.addColorStop(1, "rgba(0,0,0,0)");
    pctx.fillStyle = pgrad;
    pctx.fillRect(0, 0, 32, 32);
    const pTex = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.75,
      map: pTex,
      color: 0xffe8dc,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const dustParticles = new THREE.Points(particleGeo, particleMat);
    scene.add(dustParticles);

    // 6. Smooth Mouse Parallax (Damped Physics)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Handle Responsive
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;

      if (width < 960) {
        sculptureGroup.position.set(0, 12, -8);
        sculptureGroup.scale.set(0.68, 0.68, 0.68);
      } else {
        sculptureGroup.position.set(13, 0, 0);
        sculptureGroup.scale.set(1.0, 1.0, 1.0);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    onResize();
    window.addEventListener("resize", onResize);

    // 7. Smooth 60fps Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Damped mouse smoothing
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Gyroscopic Rotations (Precision Craftsmanship)
      outerRing.rotation.z = elapsed * 0.15;
      outerRing.rotation.x = targetY * 1.5;
      outerRing.rotation.y = targetX * 1.5;

      midRing.rotation.x = elapsed * 0.2 + targetY * 2.0;
      midRing.rotation.y = elapsed * 0.25 + targetX * 2.0;

      innerRing.rotation.y = -elapsed * 0.35 + targetX * 2.2;
      innerRing.rotation.z = elapsed * 0.22;

      coreMesh.rotation.x = -elapsed * 0.3;
      coreMesh.rotation.y = elapsed * 0.4;
      coreWire.rotation.x = coreMesh.rotation.x;
      coreWire.rotation.y = coreMesh.rotation.y;

      // Subtle breath floating
      sculptureGroup.position.y = (width < 960 ? 12 : 0) + Math.sin(elapsed * 1.2) * 0.6;

      // Dust gentle drift
      dustParticles.rotation.y = elapsed * 0.015;
      dustParticles.rotation.x = elapsed * 0.008;

      // Camera micro-parallax
      camera.position.x += (targetX * 8 - camera.position.x) * 0.04;
      camera.position.y += (-targetY * 6 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      outerRingGeo.dispose();
      midRingGeo.dispose();
      innerRingGeo.dispose();
      coreGeo.dispose();
      particleGeo.dispose();
      titaniumMat.dispose();
      orangeAnodizedMat.dispose();
      platinumMat.dispose();
      coreMat.dispose();
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
