export const SITE = {
  name: 'ESTIVOXX',
  tagline: 'TECHNOLOGIES',
  email: 'support@estivoxx.com',
  companyName: 'Estivoxx Technologies',
  parent: { name: 'Estuscia Group', url: 'https://www.estusciagroup.com/' },
  location: 'Hilte Business Part',
  privacyUrl: 'https://www.estivoxx.com/privacy',
  termsUrl: 'https://www.estivoxx.com/terms',
  socials: [] as { label: string; href: string }[], // add verified social links here
};

/** `at` = scroll progress (0..1) the link jumps to; `start` = where the item becomes active. */
export const NAV = [
  { label: 'Home', id: 'home', at: 0, start: 0 },
  { label: 'About', id: 'about', at: 0.6, start: 0.585 },
  { label: 'Services', id: 'services', at: 0.66, start: 0.635 },
  { label: 'Work', id: 'work', at: 0.89, start: 0.885 },
  { label: 'Contact', id: 'contact', at: 0.965, start: 0.955 },
] as const;

export const PROJECT_TYPES = ['Website / web app', 'Custom software', 'AI & automation', 'Business platform', 'Other'];

/** EmailJS (the public key is designed to be exposed in browser code). */
export const EMAILJS = { serviceId: 'support_estivoxx', templateId: 'support_estivoxx_2026', publicKey: 'HtMOlIdlJcgS15sIB' };
