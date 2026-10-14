import { NAV } from '../config/site';
import JumpLink from './JumpLink';

export default function Nav({ active }: { active: number }) {
  return (
    <nav aria-label="Primary">
      {NAV.map((n, i) => (
        <JumpLink key={n.id} to={n.id} at={n.at} className={i === active ? 'active' : undefined} aria-current={i === active ? 'true' : undefined}>
          {n.label}
        </JumpLink>
      ))}
    </nav>
  );
}
