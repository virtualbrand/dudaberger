import './App.css'
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomePage from './pages/HomePage'
import EfeitoAguaNaBocaPage from './pages/EfeitoAguaNaBocaPage'
import WorkshopPage from './pages/WorkshopPage'
import CalculadoraPage from './pages/CalculadoraPage'
import GuirlandaNatalPage from './pages/GuirlandaNatalPage'
import LinksPage from './pages/LinksPage'
import CasamentoPage from './pages/CasamentoPage'
import { HelmetProvider } from 'react-helmet-async';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Inicializa o Lenis para smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Conecta Lenis com GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<LinksPage />} />
          <Route path="/efeito-agua-na-boca" element={<EfeitoAguaNaBocaPage />} />
          <Route path="/workshop" element={<WorkshopPage />} />
          <Route path="/calculadora" element={<CalculadoraPage />} />
          <Route path="/guirlanda-natal" element={<GuirlandaNatalPage />} />
          <Route path="/casamento" element={<CasamentoPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  )
}

export default App
