import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { caps } from '../lib/capabilities';
import { scrollToProgress } from '../lib/scroll';

interface Props extends AnchorHTMLAttributes<HTMLAnchorElement> { to: string; at: number }

/** In cinematic mode: smooth-scrolls the timeline without touching the URL. In flat mode: a normal anchor. */
export default function JumpLink({ to, at, onClick, ...rest }: Props) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (caps.flat) return;
    e.preventDefault();
    scrollToProgress(at);
  };
  return <a href={`#${to}`} onClick={handle} {...rest} />;
}
