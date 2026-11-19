import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Carrega apenas as famílias realmente usadas e nunca bloqueia a primeira pintura.
const fontStylesheet = document.createElement('link');
fontStylesheet.rel = 'stylesheet';
fontStylesheet.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Manrope:wght@400;500;600;700;800&display=swap';
fontStylesheet.media = 'print';
fontStylesheet.addEventListener('load', () => { fontStylesheet.media = 'all'; }, { once: true });
document.head.appendChild(fontStylesheet);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
