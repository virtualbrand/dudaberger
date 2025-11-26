import type { Metadata } from 'next';
import localFont from 'next/font/local';
import NonCriticalCSS from '@/components/NonCriticalCSS';
import './critical.css';

// Fonte para corpo de texto
const kumbhSans = localFont({
  src: [
    {
      path: '../../public/fonts/KumbhSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-kumbh',
  display: 'swap',
  preload: true,
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
});

// Fonte para títulos
const unbounded = localFont({
  src: [
    {
      path: '../../public/fonts/unbounded-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-unbounded',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dudaberger.com.br'),
  title: {
    default: 'Duda Berger | Confeitaria & Mentoria',
    template: '%s | Duda Berger'
  },
  description: 'Confeiteira e mentora de confeiteiras. Aprenda a faturar com confeitaria trabalhando de casa.',
  keywords: ['confeitaria', 'bolos', 'doces', 'mentoria', 'workshop', 'guirlanda natal'],
  authors: [{ name: 'Duda Berger' }],
  creator: 'Duda Berger',
  publisher: 'Duda Berger',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://dudaberger.com.br',
    siteName: 'Duda Berger',
    title: 'Duda Berger | Confeitaria & Mentoria',
    description: 'Confeiteira e mentora de confeiteiras. Aprenda a faturar com confeitaria trabalhando de casa.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duda Berger | Confeitaria & Mentoria',
    description: 'Confeiteira e mentora de confeiteiras. Aprenda a faturar com confeitaria trabalhando de casa.',
  },
  robots: {
    index: true,
    follow: true,
    'max-video-preview': -1,
    'max-image-preview': 'large',
    'max-snippet': -1,
  },
  verification: {
    google: 'seu-codigo-google-search-console',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${kumbhSans.variable} ${unbounded.variable}`}>
      <head>
        {/* Preload crítico para fontes - MAIS IMPORTANTE */}
        <link
          rel="preload"
          href="/fonts/KumbhSans-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/unbounded-semibold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Preconnect prioritário APENAS para domínios essenciais */}
        <link rel="preconnect" href="https://dudaberger.com.br" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
      </head>
      <body className={kumbhSans.className}>
        <NonCriticalCSS />
        {children}
      </body>
    </html>
  );
}
