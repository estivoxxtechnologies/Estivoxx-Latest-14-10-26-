# Estivoxx Technologies: cinematic site (React + TypeScript + Three.js)

    npm install
    npm run dev       # local dev
    npm run build     # type-check + production build -> dist/
    npm run preview

## Structure
    src/
      main.tsx, App.tsx          app shell
      config/site.ts             email, legal links, socials, nav ranges  <- edit this first
      content/sections.tsx       all section copy (real HTML text, SEO-friendly)
      components/                Nav, Intro, Section, Footer, ContactForm, JumpLink, CinematicCanvas
      hooks/                     useScrollProgress (GSAP ScrollTrigger), useCinematicDom (fades + active nav)
      three/                     SceneController (camera path + loop), laptop, world, textures, math
      state/progress.ts          shared mutable scroll state (no re-render per frame)
      lib/                       capabilities (WebGL / reduced-motion), scroll helper
    public/                      favicon, robots.txt, sitemap.xml

## Before launch
- Contact details and EmailJS IDs live in config/site.ts; add verified `socials`; confirm privacy/terms URLs and the location text.
- The contact form sends through EmailJS (`@emailjs/browser`). Make sure your template uses: full_name, email, company, phone, project_type, message, date.
- Adjusting scenes: scroll ranges live in `content/sections.tsx` (a/b) and `three/SceneController.ts`.
- Reduced motion or no WebGL renders a normal readable page.
- The URL never gets a #hash; links smooth-scroll the timeline.
- Three is pinned to 0.128.0 so lighting matches the tuned values (newer versions change light units).
