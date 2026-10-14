import * as THREE from 'three';
import { keyboardTexture, screenTexture } from './textures';

/** Procedural laptop with an independently animated lid hinge. */
export function createLaptop() {
  const group = new THREE.Group();
  const alu = new THREE.MeshStandardMaterial({ color: 0x3a4250, metalness: 0.95, roughness: 0.38 });

  const base = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 2.2), alu); base.position.y = 0.04; group.add(base);

  const keys = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 0.94), new THREE.MeshStandardMaterial({ map: keyboardTexture(), roughness: 0.6, metalness: 0.3 }));
  keys.rotation.x = -Math.PI / 2; keys.position.set(0, 0.082, -0.35); group.add(keys);

  const pad = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 0.65), new THREE.MeshStandardMaterial({ color: 0x1b2230, metalness: 0.8, roughness: 0.3 }));
  pad.rotation.x = -Math.PI / 2; pad.position.set(0, 0.083, 0.72); group.add(pad);

  const hinge = new THREE.Group(); hinge.position.set(0, 0.08, -1.1); group.add(hinge);
  const lid = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.05, 2.1), alu); lid.position.set(0, 0.03, 1.05); hinge.add(lid);

  const screen = screenTexture();
  const display = new THREE.Mesh(new THREE.PlaneGeometry(3, 1.95), new THREE.MeshBasicMaterial({ map: screen.texture, toneMapped: false }));
  display.rotation.x = Math.PI / 2; display.position.set(0, -0.03, 1.05); hinge.add(display); // inner face of the lid

  return {
    group,
    setOpen: (amount: number) => { hinge.rotation.x = -amount * 1.82; }, // 0 closed → 1 ≈ 104°
    drawScreen: screen.draw,
  };
}
