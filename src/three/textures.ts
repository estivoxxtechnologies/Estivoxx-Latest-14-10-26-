import * as THREE from 'three';

export function keyboardTexture() {
  const c = document.createElement('canvas'); c.width = 640; c.height = 300;
  const x = c.getContext('2d')!;
  x.fillStyle = '#05080f'; x.fillRect(0, 0, 640, 300); x.fillStyle = '#141b2b';
  for (let r = 0; r < 5; r++) for (let k = 0; k < 14; k++) x.fillRect(14 + k * 44, 12 + r * 38, 38, 32);
  x.fillRect(110, 204, 420, 32);
  return new THREE.CanvasTexture(c);
}

const CODE = ['import { engine } from "@estivoxx/core";', 'const app = createPlatform({', '  frontend: "react",', '  api: "secure-rest",', '  database: "scalable",', '});', 'await app.test();', 'await app.deploy();', 'export default app;'];

/** Laptop screen texture; `draw(k)` reveals the wordmark and code lines progressively (k: 0..1). */
export function screenTexture() {
  const c = document.createElement('canvas'); c.width = 1024; c.height = 680;
  const x = c.getContext('2d')!;
  const texture = new THREE.CanvasTexture(c);
  let last = -1;
  const draw = (k: number) => {
    const n = Math.floor(k * CODE.length * 1.2);
    if (n === last) return; last = n;
    const g = x.createLinearGradient(0, 0, 1024, 680); g.addColorStop(0, '#04122b'); g.addColorStop(1, '#021028');
    x.fillStyle = g; x.fillRect(0, 0, 1024, 680);
    x.textAlign = 'center'; x.fillStyle = '#e8f1ff'; x.font = '300 54px Sora, sans-serif'; x.fillText('E S T I V O X X', 512, 140);
    x.fillStyle = '#38e1ff'; x.font = '18px Sora, sans-serif'; x.fillText('T E C H N O L O G I E S', 512, 176);
    x.textAlign = 'left'; x.font = '24px Menlo, Consolas, monospace';
    CODE.forEach((l, i) => { if (i < n) { x.fillStyle = i % 3 ? '#7fb2ff' : '#38e1ff'; x.fillText(l, 150, 270 + i * 42); } });
    texture.needsUpdate = true;
  };
  draw(0);
  return { texture, draw };
}

/** A floating "code window" plane. */
export function codePanel(lines: string[], w: number, h: number, pos: [number, number, number], ry = 0) {
  const c = document.createElement('canvas'); c.width = 512; c.height = Math.round((512 * h) / w);
  const x = c.getContext('2d')!;
  x.fillStyle = 'rgba(3,12,32,.92)'; x.fillRect(0, 0, c.width, c.height);
  x.strokeStyle = '#38e1ff'; x.lineWidth = 3; x.strokeRect(2, 2, c.width - 4, c.height - 4);
  x.fillStyle = '#2f7bff'; x.fillRect(0, 0, c.width, 30); x.font = '19px Menlo, Consolas, monospace';
  lines.forEach((l, i) => { x.fillStyle = i % 2 ? '#7fb2ff' : '#b8f3ff'; x.fillText(l, 18, 62 + i * 28); });
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, side: THREE.DoubleSide }),
  );
  m.position.set(...pos); m.rotation.y = ry;
  return m;
}
