import type { SectionDef } from '../components/Section';
import ContactForm from '../components/ContactForm';
import ContactDetails from '../components/ContactDetails';
import JumpLink from '../components/JumpLink';

const Chips = ({ items }: { items: string[] }) => <ul className="chips">{items.map((i) => <li key={i}>{i}</li>)}</ul>;

export const SECTIONS: SectionDef[] = [
  { id: 'brand', a: 0.53, b: 0.585, node: (<>
    <h1>WE BUILD THE DIGITAL FUTURE.</h1>
    <p>Engineering powerful digital experiences, intelligent software, and technology that moves businesses forward.</p>
    <JumpLink className="btn pri" to="services" at={0.66}>EXPLORE OUR WORLD</JumpLink>
    <JumpLink className="btn" to="contact" at={0.965}>START A PROJECT</JumpLink></>) },
  { id: 'about', a: 0.585, b: 0.635, node: (<>
    <h2>TECHNOLOGY WITH PURPOSE.</h2>
    <p>Estivoxx Technologies is an advanced technological engineering firm building custom enterprise software, scalable web platforms, automated workflows, and digital business infrastructure.</p>
    <ol className="steps" aria-label="From idea to growth">
      <li><b>Idea</b>Define the problem worth solving.</li><li><b>Design</b>Shape the experience and architecture.</li>
      <li><b>Engineering</b>Build it properly.</li><li><b>Deployment</b>Launch with confidence.</li><li><b>Growth</b>Improve as the business grows.</li>
    </ol></>) },
  { id: 'services', a: 0.635, b: 0.69, node: (<>
    <h2>WE TURN IDEAS INTO DIGITAL EXPERIENCES.</h2>
    <p>Modern websites and web applications engineered for performance, usability, and growth.</p>
    <Chips items={['Design system', 'Frontend', 'Backend', 'Database', 'APIs', 'Testing & deployment']} /></>) },
  { id: 'software', a: 0.69, b: 0.74, node: (<>
    <h2>BUILT WITH PRECISION. ENGINEERED TO SCALE.</h2>
    <p>Reliable software solutions designed around real business requirements. Interfaces, services, databases, authentication and integrations, working as one system.</p></>) },
  { id: 'ai', a: 0.74, b: 0.79, node: (<>
    <h2>MAKE TECHNOLOGY WORK SMARTER.</h2>
    <p>Explore intelligent automation and AI-powered solutions that can help simplify workflows and unlock new possibilities.</p></>) },
  { id: 'products', a: 0.79, b: 0.84, node: (<>
    <h2>DESIGNED AROUND YOUR BUSINESS.</h2>
    <p>Flexible digital solutions built to solve business challenges and support long-term growth.</p>
    <Chips items={['Enterprise applications', 'Management platforms', 'Custom dashboards', 'Workflow systems']} /></>) },
  { id: 'process', a: 0.84, b: 0.885, node: (<>
    <h2>OUR DEVELOPMENT PROCESS</h2>
    <ol className="steps">
      <li><b>01 Discover</b>Understand the business, users, objectives, and requirements.</li><li><b>02 Design</b>Intuitive experiences and thoughtful system architecture.</li>
      <li><b>03 Develop</b>Maintainable, scalable, and reliable solutions.</li><li><b>04 Test</b>Validate functionality, performance, compatibility, and security.</li>
      <li><b>05 Deploy</b>Launch, then support continued improvement.</li>
    </ol></>) },
  { id: 'work', a: 0.885, b: 0.925, node: (<>
    <span className="tag">Concept demonstration</span><h2>SELECTED WORK</h2>
    <p>Case studies are being prepared. The interface shown is a concept demonstration, not a client project.</p></>) },
  { id: 'why', a: 0.925, b: 0.955, node: (<>
    <h2>GOOD IDEAS DESERVE GREAT ENGINEERING.</h2>
    <Chips items={['Thoughtful engineering', 'Modern technology', 'User-focused design', 'Reliable implementation', 'Scalable architecture', 'Collaborative development']} /></>) },
  { id: 'contact', a: 0.955, b: 0.985, wide: true, node: (<>
    <h2>YOUR NEXT BIG IDEA STARTS HERE.</h2>
    <p>Let's turn your vision into a powerful digital experience.</p>
    <div className="contact-grid"><ContactDetails /><ContactForm /></div></>) },
];
