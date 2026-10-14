import type { ReactNode } from 'react';

export interface SectionDef {
  id: string;
  a: number; // scroll progress where the scene fades in
  b: number; // …and out
  node: ReactNode;
  wide?: boolean; // two-column layout (contact)
}

export default function Section({ id, a, b, node, wide }: SectionDef) {
  return (
    <section className={wide ? 'scene wide' : 'scene'} id={id} data-a={a} data-b={b}>
      <div className="in">{node}</div>
    </section>
  );
}
