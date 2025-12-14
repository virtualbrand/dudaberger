/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // Desabilitar cache em desenvolvimento
  ...(process.env.NODE_ENV === 'development' && {
    onDemandEntries: {
      maxInactiveAge: 0,
      pagesBufferLength: 0,
    },
  }),
  
  // Desabilitar Turbopack e usar Webpack
  turbopack: {},
  
  // Otimizações de imagem
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dudaberger.com.br',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90, 100],
  },

  // Compiler options para melhor performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Otimizar imports de bibliotecas grandes
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'lucide-react', 
      '@tabler/icons-react',
      'gsap',
      '@studio-freight/lenis',
      'lenis',
      'three'
    ],
  },
  async headers() {
    return [
      // Desabilitar cache em desenvolvimento
      ...(process.env.NODE_ENV === 'development' ? [
        {
          source: '/:path*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
            },
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on'
            },
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN'
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
          ],
        },
      ] : [
        // Security headers para todas as páginas (produção)
        {
          source: '/:path*',
          headers: [
            {
              key: 'X-DNS-Prefetch-Control',
              value: 'on'
            },
            {
              key: 'X-Frame-Options',
              value: 'SAMEORIGIN'
            },
            {
              key: 'X-Content-Type-Options',
              value: 'nosniff'
            },
          ],
        },
      ]),
      // Cache longo para fontes (1 ano)
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      // Cache longo para imagens (1 ano)
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      // Cache longo para CSS (1 ano)
      {
        source: '/_next/static/css/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      // Cache longo para JS (1 ano)
      {
        source: '/_next/static/chunks/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      // Cache longo para todos os assets estáticos do Next.js (1 ano)
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      // Cache médio para HTML (30 dias como recomendado pelo Lighthouse)
      {
        source: '/:path*.html',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=2592000, must-revalidate'
          },
        ],
      },
    ];
  },

  // Configurações de bundle
  webpack: (config, { dev, isServer }) => {
    // Otimizações de tree-shaking para produção
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
    }
    
    // Otimizações adicionais
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },

  // Output standalone para otimizar deploy
  output: 'standalone',
};

export default nextConfig;
