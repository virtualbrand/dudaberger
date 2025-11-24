import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Otimizar fontes com next/font para preload automático
const kumbhSans = localFont({
  src: [
    {
      path: '../../public/fonts/KumbhSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/KumbhSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-kumbh',
  display: 'swap',
  preload: true,
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
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
    <html lang="pt-BR" className={kumbhSans.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.threejs.org" />
      </head>
      <body className={kumbhSans.className}>
        {children}
      </body>
    </html>
  );
}
