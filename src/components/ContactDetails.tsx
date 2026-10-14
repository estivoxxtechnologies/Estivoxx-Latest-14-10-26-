import { SITE } from '../config/site';

export default function ContactDetails() {
  return (
    <dl className="details">
      <div>
        <dt>Email Us</dt>
        <dd><a href={`mailto:${SITE.email}`}>{SITE.email}</a></dd>
      </div>
      <div>
        <dt>Company</dt>
        <dd>
          {SITE.companyName}
          <span className="sub">
            Part of <a href={SITE.parent.url} target="_blank" rel="noopener noreferrer">{SITE.parent.name}<span aria-hidden="true">↗</span><span className="sr"> (opens in a new tab)</span></a>
          </span>
        </dd>
      </div>
      <div>
        <dt>Location</dt>
        <dd>{SITE.location}</dd>
      </div>
      {SITE.socials.length > 0 && (
        <div>
          <dt>Follow</dt>
          <dd>{SITE.socials.map((s) => <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{ marginRight: 12 }}>{s.label}</a>)}</dd>
        </div>
      )}
    </dl>
  );
}
