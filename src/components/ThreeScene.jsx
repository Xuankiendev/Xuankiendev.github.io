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

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05020a, 0.002);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 5, 38);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.8;
    container.appendChild(renderer.domElement);

    // 3. Dynamic Colorful Point Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const lightPink = new THREE.PointLight(0xff007f, 12, 100);
    lightPink.position.set(-25, 25, 25);
    scene.add(lightPink);

    const lightCyan = new THREE.PointLight(0x00f2fe, 12, 100);
    lightCyan.position.set(25, -15, 25);
    scene.add(lightCyan);

    const lightYellow = new THREE.PointLight(0xffe044, 10, 80);
    lightYellow.position.set(0, 30, 15);
    scene.add(lightYellow);

    // 4. MAIN BACKGROUND EFFECT: 3D Animated Cyber Wave Terrain Mesh
    // Tạo lưới sóng 3D nhấp nhô cuồn cuộn với màu neon gradient rực lửa
    const gridCols = 70;
    const gridRows = 70;
    const planeGeo = new THREE.PlaneGeometry(160, 160, gridCols, gridRows);
    planeGeo.rotateX(-Math.PI / 2.2);
    planeGeo.translate(0, -14, -10);

    const planePos = planeGeo.attributes.position;
    const baseZ = new Float32Array(planePos.count);
    for (let i = 0; i < planePos.count; i++) {
      baseZ[i] = planePos.getY(i);
    }

    // Material lưới sóng phát sáng
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const waveMesh = new THREE.Mesh(planeGeo, waveMat);
    scene.add(waveMesh);

    // Lớp đỉnh hạt sáng lung linh trên các mút sóng
    const wavePointsMat = new THREE.PointsMaterial({
      color: 0xff007f,
      size: 0.65,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending
    });
    const wavePoints = new THREE.Points(planeGeo, wavePointsMat);
    scene.add(wavePoints);

    // 5. HERO 3D OBJECT: Massive Floating Holographic Torus Knot with Inner Plasma Core
    const hero3DGroup = new THREE.Group();
    hero3DGroup.position.set(15, 2, 2);

    const torusGeo = new THREE.TorusKnotGeometry(7.2, 2.1, 140, 32, 2, 3);
    const torusMat = new THREE.MeshPhysicalMaterial({
      color: 0x1b082e,
      emissive: 0x550a7a,
      roughness: 0.05,
      metalness: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      reflectivity: 1.0
    });
    const heroTorus = new THREE.Mesh(torusGeo, torusMat);
    hero3DGroup.add(heroTorus);

    // Neon Wireframe Overlay on Torus
    const torusWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const heroTorusWire = new THREE.Mesh(torusGeo, torusWireMat);
    heroTorusWire.scale.set(1.03, 1.03, 1.03);
    hero3DGroup.add(heroTorusWire);

    // Inner Glowing Core (Plasma Diamond)
    const innerGeo = new THREE.OctahedronGeometry(3.5, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffe044,
      wireframe: true
    });
    const heroInner = new THREE.Mesh(innerGeo, innerMat);
    hero3DGroup.add(heroInner);

    // 3 Animated Glowing Orbital Rings
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(13, 0.12, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xff007f, transparent: true, opacity: 0.85 })
    );
    ring1.rotation.x = Math.PI / 3;
    hero3DGroup.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(14.8, 0.1, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0x00f2fe, transparent: true, opacity: 0.8 })
    );
    ring2.rotation.y = Math.PI / 2.2;
    hero3DGroup.add(ring2);

    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(16.5, 0.08, 16, 100),
      new THREE.MeshBasicMaterial({ color: 0xffe044, transparent: true, opacity: 0.75 })
    );
    ring3.rotation.z = Math.PI / 3.5;
    hero3DGroup.add(ring3);

    scene.add(hero3DGroup);

    // 6. Floating Polyhedral Cyber Diamonds in the air
    const floatingCrystals = [];
    const crystalGeo = new THREE.IcosahedronGeometry(2.2, 0);
    const crystalColors = [0xff007f, 0x00f2fe, 0xffe044, 0xa855f7, 0x00ff66];

    for (let i = 0; i < 9; i++) {
      const col = crystalColors[i % crystalColors.length];
      const cMat = new THREE.MeshPhysicalMaterial({
        color: col,
        emissive: col,
        emissiveIntensity: 0.35,
        roughness: 0.1,
        metalness: 0.9,
        wireframe: i % 2 === 0
      });
      const cMesh = new THREE.Mesh(crystalGeo, cMat);

      // Phân bổ rải rác 2 bên màn hình
      const x = i % 2 === 0 ? -22 - Math.random() * 18 : 22 + Math.random() * 18;
      const y = -15 + Math.random() * 38;
      const z = -5 + Math.random() * 15;
      cMesh.position.set(x, y, z);
      scene.add(cMesh);

      floatingCrystals.push({
        mesh: cMesh,
        speedX: (Math.random() - 0.5) * 0.02,
        speedY: (Math.random() - 0.5) * 0.02,
        rotSpeedX: 0.01 + Math.random() * 0.02,
        rotSpeedY: 0.01 + Math.random() * 0.02,
        initY: y
      });
    }

    // 7. Interactive Warp Particles (1.800 hạt sao lấp lánh phản xạ chuột)
    const starCount = 1800;
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const starPalette = [
      new THREE.Color("#ff007f"),
      new THREE.Color("#00f2fe"),
      new THREE.Color("#ffe044"),
      new THREE.Color("#ffffff"),
      new THREE.Color("#a855f7")
    ];

    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 140;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const c = starPalette[Math.floor(Math.random() * starPalette.length)];
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }

    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    const starMat = new THREE.PointsMaterial({
      size: 1.1,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 8. Shockwave Ring on Click
    const shockwaves = [];
    const shockGeo = new THREE.RingGeometry(0.2, 0.9, 64);

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
        color: starPalette[Math.floor(Math.random() * starPalette.length)],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
      });
      const swMesh = new THREE.Mesh(shockGeo, swMat);
      swMesh.position.set(pos.x, pos.y, 10);
      scene.add(swMesh);
      shockwaves.push({ mesh: swMesh, scale: 1, opacity: 1 });
    };

    window.addEventListener("click", handleWindowClick);

    // 9. Mouse Lerp
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;

      if (width < 900) {
        hero3DGroup.position.set(0, 14, -10);
        hero3DGroup.scale.set(0.65, 0.65, 0.65);
      } else {
        hero3DGroup.position.set(16, 2, 2);
        hero3DGroup.scale.set(1.1, 1.1, 1.1);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // 10. Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.07;
      targetY += (mouseY - targetY) * 0.07;

      // Animate 3D Cyber Wave Terrain
      const pos = planeGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = i % (gridCols + 1);
        const v = Math.floor(i / (gridCols + 1));
        const wave =
          Math.sin(time * 2.2 + u * 0.28) * 3.2 +
          Math.cos(time * 1.8 + v * 0.25) * 2.8 +
          Math.sin(time * 1.2 + (u + v) * 0.15) * 2.0;

        pos.setY(i, baseZ[i] + wave);
      }
      pos.needsUpdate = true;

      // Rotate Hero 3D Object
      heroTorus.rotation.x = time * 0.5 + targetY * 3;
      heroTorus.rotation.y = time * 0.6 + targetX * 3;
      heroTorusWire.rotation.x = heroTorus.rotation.x;
      heroTorusWire.rotation.y = heroTorus.rotation.y;

      heroInner.rotation.x = -time * 1.2;
      heroInner.rotation.z = time * 1.1;

      ring1.rotation.z = time * 0.5;
      ring2.rotation.x = -time * 0.55;
      ring3.rotation.y = time * 0.45;

      // Animate floating crystals
      floatingCrystals.forEach((c, idx) => {
        c.mesh.rotation.x += c.rotSpeedX;
        c.mesh.rotation.y += c.rotSpeedY;
        c.mesh.position.y = c.initY + Math.sin(time * 1.5 + idx) * 2.2;
      });

      // Animate shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.scale += 2.2;
        sw.opacity -= 0.025;
        sw.mesh.scale.set(sw.scale, sw.scale, 1);
        sw.mesh.material.opacity = Math.max(0, sw.opacity);

        if (sw.opacity <= 0) {
          scene.remove(sw.mesh);
          sw.mesh.geometry.dispose();
          sw.mesh.material.dispose();
          shockwaves.splice(i, 1);
        }
      }

      // Starfield gentle rotation
      starField.rotation.y = time * 0.03;
      starField.rotation.x = time * 0.015;

      // Point lights dynamic movement
      lightPink.position.x = Math.sin(time * 1.5) * 25;
      lightPink.position.y = Math.cos(time * 1.2) * 25;
      lightCyan.position.x = -Math.sin(time * 1.3) * 25;
      lightCyan.position.z = Math.cos(time * 1.4) * 25;

      // Camera parallax
      camera.position.x += (targetX * 12 - camera.position.x) * 0.05;
      camera.position.y += (-targetY * 8 - camera.position.y) * 0.05;
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
      planeGeo.dispose();
      waveMat.dispose();
      wavePointsMat.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      starGeo.dispose();
      starMat.dispose();
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
