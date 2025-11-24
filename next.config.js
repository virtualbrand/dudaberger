/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
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

  // Headers para otimização e segurança
  async headers() {
    return [
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

  // Otimizar imports de bibliotecas grandes
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react', '@tabler/icons-react'],
  },

  // Output standalone para otimizar deploy
  output: 'standalone',
};

export default nextConfig;
