import { useState } from 'react';
import { caps } from './lib/capabilities';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useCinematicDom } from './hooks/useCinematicDom';
import CinematicCanvas from './components/CinematicCanvas';
import Nav from './components/Nav';
import Intro from './components/Intro';
import Section from './components/Section';
import Footer from './components/Footer';
import { SECTIONS } from './content/sections';

export default function App() {
  const [active, setActive] = useState(0);
  const cinematic = !caps.flat;
  useScrollProgress(cinematic);
  useCinematicDom(cinematic, setActive);

  return (
    <div className={caps.flat ? 'flat' : undefined}>
      {cinematic && <div id="veil" aria-hidden="true" />}
      <span id="home" />
      <Nav active={active} />
      {cinematic && <CinematicCanvas />}
      {caps.flat && <p id="fallback-note">Showing the lightweight version of this site (3D or motion is unavailable or reduced).</p>}
      {cinematic && <Intro />}
      <main>
        {SECTIONS.map((s) => <Section key={s.id} {...s} />)}
        <Footer />
      </main>
      {cinematic && <div id="track" />}
    </div>
  );
}
