import * as THREE from 'three';
import { progress } from '../state/progress';
import { smooth as sm, zFor } from './math';
import { createLaptop } from './laptop';
import { createParticles, createWorld } from './world';

/** Owns the renderer, camera path and render loop. Scroll progress drives everything. */
export class SceneController {
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera = new THREE.PerspectiveCamera(45, 1, 0.05, 300);
  private laptop = createLaptop();
  private world: ReturnType<typeof createWorld>;
  private particles: THREE.Points;
  private floor: THREE.Mesh;
  private rim = new THREE.PointLight(0x2f7bff, 0, 20);
  private rim2 = new THREE.PointLight(0x38e1ff, 0, 20);
  private screenLight = new THREE.PointLight(0x38e1ff, 0, 8);
  private aspect = 1;
  private raf = 0;
  private look = new THREE.Vector3();

  constructor(canvas: HTMLCanvasElement) {
    const mobile = innerWidth < 700;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: innerWidth > 800, powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 800 ? 1.5 : 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping; this.renderer.toneMappingExposure = 1.1;

    this.scene.background = new THREE.Color(0x01040e);
    this.scene.fog = new THREE.FogExp2(0x01040e, 0.022);
    this.scene.add(new THREE.AmbientLight(0x4466aa, 0.35));
    this.rim.position.set(-4, 2, -3); this.rim2.position.set(4, 1.5, -2); this.screenLight.position.set(0, 1.1, -0.6);
    this.scene.add(this.rim, this.rim2, this.screenLight, this.laptop.group);

    this.floor = new THREE.Mesh(new THREE.CircleGeometry(14, 64), new THREE.MeshStandardMaterial({ color: 0x050a16, metalness: 0.9, roughness: 0.22 }));
    this.floor.rotation.x = -Math.PI / 2; this.floor.position.y = -0.4; this.scene.add(this.floor);

    this.particles = createParticles(mobile ? 500 : 1400); this.scene.add(this.particles);
    this.world = createWorld(mobile ? 0 : 2.8); this.world.group.visible = false; this.scene.add(this.world.group);

    addEventListener('resize', this.resize); this.resize();
    progress.introStart = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  private resize = () => {
    this.aspect = innerWidth / innerHeight;
    this.renderer.setSize(innerWidth, innerHeight, false);
    this.camera.aspect = this.aspect; this.camera.updateProjectionMatrix();
  };

  private frame = (now: number) => {
    const t = (now - progress.introStart) / 1000;
    progress.p += (progress.target - progress.p) * 0.09;
    const p = progress.p, cam = this.camera, intro = Math.min(1, t / 2.4);

    const open = sm(0.12, 0.3, p); // laptop opens with scroll
    this.laptop.setOpen(open);
    this.laptop.group.position.y = (Math.sin(t * 0.8) * 0.03 + 0.15) * (1 - open);
    this.laptop.drawScreen(sm(0.3, 0.44, p));
    this.rim.intensity = 60 * intro * (1 - sm(0.4, 0.5, p) * 0.5); this.rim2.intensity = 40 * intro; this.screenLight.intensity = 14 * open;

    // Camera: orbit → approach screen → pass through → travel the world
    const orbitR = Math.max(6, 5.4 / this.aspect), a0 = 0.9 * (1 - sm(0, 0.3, p));
    const approach = sm(0.28, 0.45, p), through = sm(0.45, 0.53, p);
    const d = Math.max(2.5, 1.7 / (0.414 * this.aspect));
    const orbitPos = new THREE.Vector3(Math.sin(a0) * orbitR, 1.9 - sm(0, 0.3, p) * 0.6, Math.cos(a0) * orbitR * (1 - sm(0, 0.3, p) * 0.35));
    const near = new THREE.Vector3(0, 1.02, -1.37 + d);
    const pos = new THREE.Vector3().lerpVectors(near, orbitPos, 1 - approach).lerp(new THREE.Vector3(0, 1.1, -3), through);
    if (p > 0.53) pos.set(Math.sin(t * 0.2) * 0.25, 1.1 + Math.cos(t * 0.17) * 0.1, zFor(p));
    cam.position.copy(pos);

    this.look.set(0, 0.2 + 0.85 * approach, 0).lerp(new THREE.Vector3(0, 1.02, -1.37), approach);
    if (p > 0.5) this.look.set(Math.sin(t * 0.2) * 0.2, 1.2, pos.z - 10);
    cam.lookAt(this.look);
    cam.fov = 45 + Math.sin(through * Math.PI) * 28; cam.updateProjectionMatrix();

    this.laptop.group.visible = this.floor.visible = p < 0.54;
    this.world.group.visible = p > 0.48;
    (this.scene.fog as THREE.FogExp2).density = p > 0.5 ? 0.035 : 0.022;
    this.world.update(t); this.particles.rotation.y = t * 0.01;

    this.renderer.render(this.scene, cam);
    this.raf = requestAnimationFrame(this.frame);
  };

  dispose() {
    cancelAnimationFrame(this.raf);
    removeEventListener('resize', this.resize);
    this.scene.traverse((o) => {
      const m = o as THREE.Mesh;
      m.geometry?.dispose();
      const mat = m.material as THREE.Material | THREE.Material[] | undefined;
      (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
    });
    this.renderer.dispose();
  }
}
