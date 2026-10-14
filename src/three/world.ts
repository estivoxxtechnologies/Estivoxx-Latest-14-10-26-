import * as THREE from 'three';
import { zFor } from './math';
import { codePanel } from './textures';

const wire = (c: number) => new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.55 });

/** The digital world the camera travels through after the screen. One cluster per section. */
export function createWorld(offX: number) {
  const group = new THREE.Group();
  const spinners: THREE.Object3D[] = [];

  const grid = new THREE.GridHelper(220, 110, 0x2f7bff, 0x0d2a5a);
  grid.position.set(0, -2.2, -60);
  (grid.material as THREE.Material).transparent = true; (grid.material as THREE.Material).opacity = 0.35;
  group.add(grid);

  for (let i = 0; i < 4; i++) { // Brand: gateway rings
    const r = new THREE.Mesh(new THREE.TorusGeometry(2 + i * 0.7, 0.02, 8, 80), new THREE.MeshBasicMaterial({ color: 0x38e1ff }));
    r.position.set(offX, 1.4, zFor(0.56) - i * 2.5); group.add(r);
  }
  for (let i = 0; i < 5; i++) { // About: idea → growth blocks
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.9), wire(i % 2 ? 0x2f7bff : 0x38e1ff));
    b.position.set(offX + (i - 2) * 0.3, 0.2 + i * 0.55, zFor(0.61) - i * 2.2); group.add(b); spinners.push(b);
  }
  // Web development
  group.add(codePanel(['<Hero />', 'const ui = tokens();', 'app.get("/api")', 'db.connect();', 'npm run build', '✓ tests passed'], 3.2, 2.2, [offX, 1.4, zFor(0.66)], -0.25));
  group.add(codePanel(['.btn{', ' padding:14px;', ' border-radius:99px;', '}', 'deploy --prod'], 2.6, 1.8, [offX + 1.8, 0.4, zFor(0.67) - 2], -0.4));

  // Software: connected modules
  const graph = new THREE.Group(); graph.position.set(offX, 1.2, zFor(0.715)); group.add(graph);
  const nodes: THREE.Mesh[] = [];
  for (let i = 0; i < 9; i++) {
    const m = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.45), wire(i % 3 ? 0x38e1ff : 0x2f7bff));
    m.position.set((i % 3 - 1) * 1.6, (Math.floor(i / 3) - 1) * 1.2, (((i * 7) % 3) - 1) * 1.2); graph.add(m); nodes.push(m);
  }
  const pts: THREE.Vector3[] = [];
  nodes.forEach((a, i) => { pts.push(a.position.clone(), nodes[(i + 3) % 9].position.clone(), a.position.clone(), nodes[(i + 1) % 9].position.clone()); });
  graph.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: 0x2f7bff, transparent: true, opacity: 0.6 })));

  // AI: network core + orbiting data
  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), wire(0x38e1ff)); core.position.set(offX, 1.4, zFor(0.765)); group.add(core);
  const orbit = new THREE.Group(); orbit.position.copy(core.position); group.add(orbit);
  for (let i = 0; i < 40; i++) {
    const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), new THREE.MeshBasicMaterial({ color: i % 4 ? 0x7fd8ff : 0xffffff }));
    const a = i * 2.4, r = 1.8 + (i % 5) * 0.35; s.position.set(Math.cos(a) * r, Math.sin(i * 1.3) * 1.2, Math.sin(a) * r); orbit.add(s);
  }
  for (let i = 0; i < 4; i++) // Products: dashboards
    group.add(codePanel(['Revenue   ▂▃▅▇', 'Orders    ▃▄▆▇', 'Workflow  ● ● ○', 'Users     ▁▃▅▆'], 2.4, 1.6, [offX + (i % 2 ? 1.2 : -0.6), 0.6 + i * 0.5, zFor(0.815) - i * 1.8], -0.35));
  for (let i = 0; i < 5; i++) { // Process: five gates
    const g = new THREE.Mesh(new THREE.RingGeometry(2.4, 2.46, 6 + i), new THREE.MeshBasicMaterial({ color: i % 2 ? 0x2f7bff : 0x38e1ff, side: THREE.DoubleSide }));
    g.position.set(0, 1.2, zFor(0.845) - i * 1.9); group.add(g);
  }
  // Work: clearly labelled concept screen
  group.add(codePanel(['CONCEPT DEMONSTRATION', '', 'Client portal', ' · dashboard', ' · workflows', ' · reports'], 4.2, 2.6, [offX - 0.4, 1.4, zFor(0.905)], -0.15));
  // Contact: final gateway
  const gate = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.06, 16, 100), new THREE.MeshBasicMaterial({ color: 0x38e1ff })); gate.position.set(0, 1.3, zFor(0.995) - 2); group.add(gate);

  return {
    group,
    update(t: number) {
      core.rotation.set(t * 0.2, t * 0.3, 0); orbit.rotation.y = t * 0.25; graph.rotation.y = Math.sin(t * 0.3) * 0.3;
      spinners.forEach((s) => (s.rotation.y = t * 0.4));
    },
  };
}

export function createParticles(count: number) {
  const g = new THREE.BufferGeometry(); const a = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) { a[i * 3] = (Math.random() - 0.5) * 40; a[i * 3 + 1] = (Math.random() - 0.5) * 18 + 2; a[i * 3 + 2] = -Math.random() * 110 + 8; }
  g.setAttribute('position', new THREE.BufferAttribute(a, 3));
  return new THREE.Points(g, new THREE.PointsMaterial({ color: 0x7fd8ff, size: 0.045, transparent: true, opacity: 0.7, depthWrite: false }));
}
