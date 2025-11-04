import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Otimização: Remover loader crítico quando React carrega
const removeLoader = () => {
  const loader = document.getElementById('critical-loader');
  const root = document.getElementById('root');
  if (loader) {
    loader.style.opacity = '0';
    setTimeout(() => loader.remove(), 300);
  }
  if (root) {
    root.classList.remove('hidden-until-loaded');
    root.style.opacity = '1';
  }
};

// Render otimizado
const rootElement = document.getElementById('root')!;
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Remove loader após React montar
removeLoader();
