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

    // 1. Scene & Atmosphere
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06020c, 0.0016);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 36);

    // 2. High-Fidelity WebGL Renderer
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

    // 3. Multi-Colored Studio Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const lightPink = new THREE.PointLight(0xff007f, 7, 70);
    lightPink.position.set(-20, 20, 20);
    scene.add(lightPink);

    const lightCyan = new THREE.PointLight(0x00f2fe, 7, 70);
    lightCyan.position.set(22, -15, 20);
    scene.add(lightCyan);

    const lightGold = new THREE.PointLight(0xffe044, 6, 60);
    lightGold.position.set(0, 25, 15);
    scene.add(lightGold);

    const lightPurple = new THREE.PointLight(0x9d4edd, 5, 60);
    lightPurple.position.set(15, 20, -15);
    scene.add(lightPurple);

    // 4. HERO 3D SCULPTURE: Holographic Iridescent Chrome Torus with Plasma Core
    const sculptureGroup = new THREE.Group();
    sculptureGroup.position.set(14, 1, 0);

    // Outer Chrome Torus Knot
    const knotGeo = new THREE.TorusKnotGeometry(7, 2, 140, 36, 2, 3);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0x1f0b35,
      emissive: 0x44085e,
      emissiveIntensity: 0.6,
      roughness: 0.05,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0
    });
    const mainKnot = new THREE.Mesh(knotGeo, knotMat);
    sculptureGroup.add(mainKnot);

    // Neon Cyan Wireframe Skin
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const wireKnot = new THREE.Mesh(knotGeo, wireMat);
    wireKnot.scale.set(1.025, 1.025, 1.025);
    sculptureGroup.add(wireKnot);

    // Inner Glowing Plasma Core
    const coreGeo = new THREE.IcosahedronGeometry(3.3, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xff007f,
      wireframe: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    sculptureGroup.add(coreMesh);

    // 3 Radiant Orbital Rings (Pink, Cyan, Gold)
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(13.2, 0.12, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xff007f, transparent: true, opacity: 0.85 })
    );
    ring1.rotation.x = Math.PI / 3;
    sculptureGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(15, 0.1, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.8 })
    );
    ring2.rotation.y = Math.PI / 2.3;
    sculptureGroup.add(ring2);

    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(16.5, 0.08, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xffe044, transparent: true, opacity: 0.75 })
    );
    ring3.rotation.z = Math.PI / 3.8;
    sculptureGroup.add(ring3);

    // Satellites on Rings
    const satCount = 8;
    const satGeo = new THREE.OctahedronGeometry(0.65, 0);
    const satMat = new THREE.MeshBasicMaterial({ color: 0xffe044 });
    const satellites = [];

    for (let i = 0; i < satCount; i++) {
      const sat = new THREE.Mesh(satGeo, satMat);
      sculptureGroup.add(sat);
      satellites.push({
        mesh: sat,
        orbitRadius: 15,
        speed: 0.8 + i * 0.15,
        angle: (i / satCount) * Math.PI * 2
      });
    }

    scene.add(sculptureGroup);

    // 5. Floating Prismatic Crystals (2 bên không gian)
    const crystalGroup = new THREE.Group();
    const crystalGeo = new THREE.OctahedronGeometry(2, 0);
    const crystalColors = [0xff007f, 0x00f2fe, 0xffe044, 0x9d4edd];
    const crystals = [];

    const coords = [
      [-24, 14, -8],
      [-28, -10, -12],
      [-18, -18, -6],
      [28, 18, -10],
      [-12, 22, -10]
    ];

    coords.forEach((pos, idx) => {
      const col = crystalColors[idx % crystalColors.length];
      const cMesh = new THREE.Mesh(
        crystalGeo,
        new THREE.MeshPhysicalMaterial({
          color: col,
          emissive: col,
          emissiveIntensity: 0.4,
          roughness: 0.1,
          metalness: 0.9,
          wireframe: idx % 2 === 0
        })
      );
      cMesh.position.set(...pos);
      crystalGroup.add(cMesh);
      crystals.push({
        mesh: cMesh,
        speedX: 0.2 + idx * 0.1,
        speedY: 0.3 + idx * 0.1,
        initY: pos[1]
      });
    });
    scene.add(crystalGroup);

    // 6. Interactive Galaxy Particles (1.600 hạt ánh sáng đa sắc)
    const particleCount = 1600;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color("#ff007f"),
      new THREE.Color("#00f2fe"),
      new THREE.Color("#ffe044"),
      new THREE.Color("#9d4edd"),
      new THREE.Color("#00ff66")
    ];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 110;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 75;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60 - 5;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Texture with Glow
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pctx = pCanvas.getContext("2d");
    const pgrad = pctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pgrad.addColorStop(0, "rgba(255,255,255,1)");
    pgrad.addColorStop(0.3, "rgba(255,200,240,0.8)");
    pgrad.addColorStop(0.7, "rgba(0,242,254,0.3)");
    pgrad.addColorStop(1, "rgba(0,0,0,0)");
    pctx.fillStyle = pgrad;
    pctx.fillRect(0, 0, 32, 32);
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const particleMat = new THREE.PointsMaterial({
      size: 1.0,
      map: pTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // 7. Click Shockwave Wavefront
    const shockwaves = [];
    const shockGeo = new THREE.RingGeometry(0.2, 0.8, 64);

    const handleWindowClick = (e) => {
      const vec = new THREE.Vector3(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vec.unproject(camera);
      vec.sub(camera.position).normalize();
      const distance = -camera.position.z / vec.z;
      const pos = camera.position.clone().add(vec.multiplyScalar(distance));

      const swMat = new THREE.MeshBasicMaterial({
        color: palette[Math.floor(Math.random() * palette.length)],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.95
      });
      const swMesh = new THREE.Mesh(shockGeo, swMat);
      swMesh.position.set(pos.x, pos.y, 8);
      scene.add(swMesh);
      shockwaves.push({ mesh: swMesh, scale: 1, opacity: 0.95 });
    };

    window.addEventListener("click", handleWindowClick);

    // 8. Mouse Tracking & Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;

      if (width < 960) {
        sculptureGroup.position.set(0, 11, -8);
        sculptureGroup.scale.set(0.68, 0.68, 0.68);
      } else {
        sculptureGroup.position.set(14, 1, 0);
        sculptureGroup.scale.set(1.05, 1.05, 1.05);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 9. 60fps Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.06;
      targetY += (mouseY - targetY) * 0.06;

      // Rotate Main Sculpture
      mainKnot.rotation.x = time * 0.45 + targetY * 2.8;
      mainKnot.rotation.y = time * 0.55 + targetX * 2.8;
      wireKnot.rotation.x = mainKnot.rotation.x;
      wireKnot.rotation.y = mainKnot.rotation.y;

      coreMesh.rotation.x = -time * 1.1;
      coreMesh.rotation.z = time * 1.0;

      ring1.rotation.z = time * 0.4;
      ring2.rotation.x = -time * 0.45;
      ring3.rotation.y = time * 0.35;

      // Orbiting satellites
      satellites.forEach((s) => {
        const curAngle = s.angle + time * s.speed;
        s.mesh.position.x = Math.cos(curAngle) * s.orbitRadius;
        s.mesh.position.y = Math.sin(curAngle * 2) * 2;
        s.mesh.position.z = Math.sin(curAngle) * s.orbitRadius;
        s.mesh.rotation.x += 0.05;
        s.mesh.rotation.y += 0.05;
      });

      // Floating crystals
      crystals.forEach((c) => {
        c.mesh.rotation.x += c.speedX * 0.03;
        c.mesh.rotation.y += c.speedY * 0.03;
        c.mesh.position.y = c.initY + Math.sin(time * 1.4 + c.speedX * 5) * 1.8;
      });

      // Shockwaves animation
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.scale += 2.0;
        sw.opacity -= 0.024;
        sw.mesh.scale.set(sw.scale, sw.scale, 1);
        sw.mesh.material.opacity = Math.max(0, sw.opacity);

        if (sw.opacity <= 0) {
          scene.remove(sw.mesh);
          sw.mesh.geometry.dispose();
          sw.mesh.material.dispose();
          shockwaves.splice(i, 1);
        }
      }

      // Particle Field gentle rotation
      particleField.rotation.y = time * 0.02;
      particleField.rotation.x = time * 0.01;

      // Dynamic light movement
      lightPink.position.x = Math.sin(time * 1.4) * 22;
      lightPink.position.y = Math.cos(time * 1.1) * 22;
      lightCyan.position.x = -Math.sin(time * 1.2) * 22;
      lightCyan.position.z = Math.cos(time * 1.3) * 22;

      // Camera parallax
      camera.position.x += (targetX * 10 - camera.position.x) * 0.04;
      camera.position.y += (-targetY * 7 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
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
      coreGeo.dispose();
      coreMat.dispose();
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
