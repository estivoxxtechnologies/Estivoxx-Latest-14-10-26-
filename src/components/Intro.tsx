import { SITE } from '../config/site';

export default function Intro() {
  return (
    <div id="intro">
      <div className="w">{SITE.name}</div>
      <div className="t">{SITE.tagline}</div>
      <div className="h">SCROLL TO OPEN</div>
    </div>
  );
}
