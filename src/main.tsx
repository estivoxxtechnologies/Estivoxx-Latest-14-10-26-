import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/global.css';

// StrictMode is intentionally not used: it double-mounts effects, which would
// create/destroy the WebGL context twice on the same canvas in development.
createRoot(document.getElementById('root')!).render(<App />);
