import { NAV, SITE } from '../config/site';
import JumpLink from './JumpLink';

export default function Footer() {
  const link = (id: string) => NAV.find((n) => n.id === id)!;
  return (
    <footer className="scene center" id="footer" data-a="0.985" data-b="1.01" data-hold="true">
      <div className="in">
        <p className="logo">{SITE.name}<small>{SITE.tagline}</small></p>
        <ul>
          <li><JumpLink to="services" at={link('services').at}>Services</JumpLink></li>
          <li><JumpLink to="about" at={link('about').at}>About</JumpLink></li>
          <li><JumpLink to="work" at={link('work').at}>Portfolio</JumpLink></li>
          <li><JumpLink to="contact" at={link('contact').at}>Contact</JumpLink></li>
          <li><a href={SITE.privacyUrl}>Privacy policy</a></li>
          <li><a href={SITE.termsUrl}>Terms</a></li>
          {SITE.socials.map((s) => <li key={s.href}><a href={s.href} rel="noopener noreferrer">{s.label}</a></li>)}
        </ul>
        <p>&copy; {new Date().getFullYear()} Estivoxx Technologies. All rights reserved.</p>
      </div>
    </footer>
  );
}
