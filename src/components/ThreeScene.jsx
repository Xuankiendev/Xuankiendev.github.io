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
    scene.fog = new THREE.FogExp2(0x06030c, 0.0015);

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
    renderer.toneMappingExposure = 1.6;
    container.appendChild(renderer.domElement);

    // 3. Dynamic Colorful Neon Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const neonPink = new THREE.PointLight(0xff007f, 8, 80);
    neonPink.position.set(-20, 20, 20);
    scene.add(neonPink);

    const neonCyan = new THREE.PointLight(0x00f2fe, 8, 80);
    neonCyan.position.set(22, -15, 20);
    scene.add(neonCyan);

    const neonYellow = new THREE.PointLight(0xffe044, 7, 70);
    neonYellow.position.set(0, 25, 10);
    scene.add(neonYellow);

    const neonPurple = new THREE.PointLight(0xa855f7, 6, 70);
    neonPurple.position.set(20, 20, -15);
    scene.add(neonPurple);

    // 4. Hero Cyber Core Group: Hyper Torus Knot + Quantum Inner Cube + Orbit Rings
    const coreGroup = new THREE.Group();
    coreGroup.position.set(16, 2, -4);

    // Outer Chrome Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(7, 1.9, 140, 36, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x1f0b35,
      emissive: 0x440a5e,
      roughness: 0.08,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0
    });
    const torusKnot = new THREE.Mesh(knotGeo, knotMat);
    coreGroup.add(torusKnot);

    // Glowing Neon Wireframe Layer
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const wireKnot = new THREE.Mesh(knotGeo, wireMat);
    wireKnot.scale.set(1.025, 1.025, 1.025);
    coreGroup.add(wireKnot);

    // Quantum Core: Inner glowing Icosahedron
    const coreInnerGeo = new THREE.IcosahedronGeometry(3.2, 1);
    const coreInnerMat = new THREE.MeshBasicMaterial({
      color: 0xff007f,
      wireframe: true
    });
    const coreInner = new THREE.Mesh(coreInnerGeo, coreInnerMat);
    coreGroup.add(coreInner);

    // Multi-color Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(13.5, 0.12, 16, 120);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xff007f, transparent: true, opacity: 0.7 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(15, 0.09, 16, 120);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.65 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 2.3;
    coreGroup.add(ring2);

    const ringGeo3 = new THREE.TorusGeometry(16.5, 0.07, 16, 120);
    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0xffe044, transparent: true, opacity: 0.6 });
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.z = Math.PI / 4;
    coreGroup.add(ring3);

    scene.add(coreGroup);

    // 5. Floating Cyber Crystals at left and background
    const crystalGroup = new THREE.Group();
    const crystalGeo = new THREE.OctahedronGeometry(2.5, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f2fe,
      emissive: 0x003366,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.6,
      transparent: true,
      opacity: 0.8
    });

    const crystals = [];
    const crystalCoords = [
      [-26, 12, -10],
      [-32, -8, -15],
      [-20, -18, -8],
      [28, 18, -12],
      [-10, 24, -14]
    ];

    crystalCoords.forEach((coord, i) => {
      const cMesh = new THREE.Mesh(crystalGeo, crystalMat);
      cMesh.position.set(...coord);
      cMesh.scale.setScalar(0.7 + Math.random() * 0.8);
      crystalGroup.add(cMesh);
      crystals.push({
        mesh: cMesh,
        speedX: 0.2 + Math.random() * 0.4,
        speedY: 0.3 + Math.random() * 0.4,
        initialY: coord[1]
      });
    });
    scene.add(crystalGroup);

    // 6. Interactive Particle Spiral Galaxy (3,200 particles)
    const particleCount = 3200;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color("#ff007f"), // hot pink
      new THREE.Color("#00f2fe"), // cyan
      new THREE.Color("#ffe044"), // laser yellow
      new THREE.Color("#a855f7"), // purple
      new THREE.Color("#00ff66"), // lime green
      new THREE.Color("#fa5d19")  // heat orange
    ];

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Galaxy Spiral Arms distribution
      const arms = 3;
      const angle = (i % arms) * ((2 * Math.PI) / arms);
      const distance = Math.pow(Math.random(), 0.7) * 65 + 8;
      const spiralAngle = distance * 0.25;

      const x = Math.cos(angle + spiralAngle) * distance + (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 24;
      const z = Math.sin(angle + spiralAngle) * distance + (Math.random() - 0.5) * 8 - 10;

      positions[idx] = x;
      positions[idx + 1] = y;
      positions[idx + 2] = z;

      originalPositions[idx] = x;
      originalPositions[idx + 1] = y;
      originalPositions[idx + 2] = z;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Texture
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pctx = pCanvas.getContext("2d");
    const pgrad = pctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pgrad.addColorStop(0, "rgba(255,255,255,1)");
    pgrad.addColorStop(0.2, "rgba(255,255,255,0.9)");
    pgrad.addColorStop(0.6, "rgba(255,0,128,0.4)");
    pgrad.addColorStop(1, "rgba(0,0,0,0)");
    pctx.fillStyle = pgrad;
    pctx.fillRect(0, 0, 32, 32);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 0.9,
      map: pTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 7. Click Shockwave Wavefront
    const shockwaves = [];
    const shockGeo = new THREE.RingGeometry(0.1, 0.6, 64);

    const triggerShockwave = (x, y) => {
      const shockMat = new THREE.MeshBasicMaterial({
        color: palette[Math.floor(Math.random() * palette.length)],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.9
      });
      const shockMesh = new THREE.Mesh(shockGeo, shockMat);
      shockMesh.position.set(x, y, 15);
      scene.add(shockMesh);
      shockwaves.push({ mesh: shockMesh, scale: 1, opacity: 0.9 });
    };

    const handleWindowClick = (e) => {
      // Calculate normalized 3D coords
      const vec = new THREE.Vector3(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      const distance = -camera.position.z / vec.z;
      const pos = camera.position.clone().add(vec.multiplyScalar(distance));
      triggerShockwave(pos.x, pos.y);
    };

    window.addEventListener("click", handleWindowClick);

    // 8. Cyber Horizon Grid with Animated Waves
    const gridHelper = new THREE.GridHelper(160, 50, 0xff007f, 0x1f1730);
    gridHelper.position.set(0, -22, 0);
    scene.add(gridHelper);

    // 9. Mouse & Resize Controls
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;

      if (width < 860) {
        coreGroup.position.set(0, 10, -12);
        coreGroup.scale.set(0.68, 0.68, 0.68);
      } else {
        coreGroup.position.set(16, 2, -4);
        coreGroup.scale.set(1.05, 1.05, 1.05);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 10. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      // Xoay 3D Hero Core
      torusKnot.rotation.x = time * 0.45 + targetY * 2.5;
      torusKnot.rotation.y = time * 0.55 + targetX * 2.5;
      wireKnot.rotation.x = torusKnot.rotation.x;
      wireKnot.rotation.y = torusKnot.rotation.y;

      coreInner.rotation.x = -time * 0.9;
      coreInner.rotation.z = time * 0.8;

      ring1.rotation.z = time * 0.4;
      ring2.rotation.x = -time * 0.45;
      ring3.rotation.y = time * 0.35;

      // Floating crystals
      crystals.forEach((c) => {
        c.mesh.rotation.x += c.speedX * 0.02;
        c.mesh.rotation.y += c.speedY * 0.02;
        c.mesh.position.y = c.initialY + Math.sin(time * 1.5 + c.speedX * 10) * 1.5;
      });

      // Animate shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.scale += 1.8;
        sw.opacity -= 0.022;
        sw.mesh.scale.set(sw.scale, sw.scale, 1);
        sw.mesh.material.opacity = Math.max(0, sw.opacity);

        if (sw.opacity <= 0) {
          scene.remove(sw.mesh);
          sw.mesh.geometry.dispose();
          sw.mesh.material.dispose();
          shockwaves.splice(i, 1);
        }
      }

      // Galaxy Spiral Particles wave motion
      const pos = particleGeo.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const ox = originalPositions[idx];
        const oy = originalPositions[idx + 1];
        const oz = originalPositions[idx + 2];

        // Cosmic wave
        const wave = Math.sin(time * 1.8 + ox * 0.06 + oz * 0.06) * 1.2;
        pos.array[idx + 1] = oy + wave;
        pos.array[idx] = ox + targetX * 16;
      }
      pos.needsUpdate = true;
      particleSystem.rotation.y = time * 0.05;

      // Lights motion
      neonPink.position.x = Math.sin(time * 1.5) * 22;
      neonPink.position.y = Math.cos(time * 1.2) * 22;
      neonCyan.position.x = -Math.sin(time * 1.3) * 22;
      neonCyan.position.z = Math.cos(time * 1.4) * 22;

      // Camera motion
      camera.position.x += (targetX * 10 - camera.position.x) * 0.05;
      camera.position.y += (-targetY * 8 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("click", handleWindowClick);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      knotGeo.dispose();
      knotMat.dispose();
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
