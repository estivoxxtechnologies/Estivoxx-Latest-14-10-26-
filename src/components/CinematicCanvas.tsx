import { useEffect, useRef } from 'react';
import { SceneController } from '../three/SceneController';

export default function CinematicCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const ctl = new SceneController(ref.current!);
    return () => ctl.dispose();
  }, []);
  return <canvas id="gl" ref={ref} role="img" aria-label="Animated 3D laptop opening, with the camera travelling into its screen" />;
}
