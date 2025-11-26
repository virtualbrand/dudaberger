import './App.css'
// import { useEffect, lazy, Suspense } from 'react'; // useEffect desativado com Lenis
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Lenis from '@studio-freight/lenis'; // DESATIVADO PROVISORIAMENTE
import { HelmetProvider } from 'react-helmet-async';
import PageLoader from './components/ui/page-loader';
import ScrollManager from './components/ScrollManager';
// import { useScrollDebug } from './hooks/useScrollDebug'; // Descomente para debug

// Lazy loading das páginas para code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const EfeitoAguaNaBocaPage = lazy(() => import('./pages/EfeitoAguaNaBocaPage'));
const WorkshopPage = lazy(() => import('./pages/WorkshopPage'));
const CalculadoraPage = lazy(() => import('./pages/CalculadoraPage'));
const GuirlandaNatalPage = lazy(() => import('./pages/GuirlandaNatalPage'));
const LinksPage = lazy(() => import('./pages/LinksPage'));
const CasamentoPage = lazy(() => import('./pages/CasamentoPage'));

function App() {
  // useScrollDebug(); // Descomente para debug
  
  // LENIS SCROLL DESATIVADO PROVISORIAMENTE
  /*
  useEffect(() => {
    let lenis: Lenis | null = null;
    let fallbackEnabled = false;

    const initLenis = async () => {
      try {
        // Verifica se o scroll é necessário
        const hasScrollableContent = document.body.scrollHeight > window.innerHeight;
        
        if (!hasScrollableContent) {
          console.log('⚠️ Conteúdo não scrollável, Lenis desabilitado');
          return;
        }

        // Configuração mínima e segura do Lenis
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          touchMultiplier: 2,
        });

        // Função de animação simples
        function raf(time: number) {
          if (lenis && !fallbackEnabled) {
            lenis.raf(time);
          }
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Carrega GSAP dinamicamente apenas se necessário
        try {
          const [gsapModule, scrollTriggerModule] = await Promise.all([
            import('gsap'),
            import('gsap/ScrollTrigger')
          ]);
          
          const gsap = gsapModule.gsap;
          const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
          
          gsap.registerPlugin(ScrollTrigger);
          
          // Conecta com ScrollTrigger
          lenis.on('scroll', ScrollTrigger.update);
          console.log('✅ GSAP + ScrollTrigger carregado dinamicamente');
        } catch (error) {
          console.log('⚠️ GSAP não carregado (opcional):', error);
        }

        // Fallback: se não houver eventos de scroll em 3 segundos, desabilita Lenis
        const fallbackTimer = setTimeout(() => {
          if (lenis && window.scrollY === 0) {
            console.log('⚠️ Fallback ativado - habilitando scroll nativo');
            fallbackEnabled = true;
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
          }
        }, 3000);

        // Limpa o timer se scroll funcionar
        lenis.on('scroll', () => {
          clearTimeout(fallbackTimer);
        });

        console.log('✅ Lenis inicializado');
        
      } catch (error) {
        console.error('❌ Erro ao inicializar Lenis:', error);
        // Força scroll nativo em caso de erro
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      }
    };

    // Aguarda o DOM estar pronto
    const timer = setTimeout(initLenis, 500);

    return () => {
      clearTimeout(timer);
      if (lenis) {
        lenis.destroy();
        console.log('🗑️ Lenis destruído');
      }
    };
  }, []);
  */

  return (
    <HelmetProvider>
      <Router>
        <ScrollManager />
        <Suspense fallback={<PageLoader theme="auto" overlay={false} />}>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/" element={<LinksPage />} />
            <Route path="/efeito-agua-na-boca" element={<EfeitoAguaNaBocaPage />} />
            <Route path="/workshop" element={<WorkshopPage />} />
            <Route path="/calculadora" element={<CalculadoraPage />} />
            <Route path="/guirlanda-natal" element={<GuirlandaNatalPage />} />
            <Route path="/casamento" element={<CasamentoPage />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  )
}

export default App
