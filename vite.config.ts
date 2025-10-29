import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ViteSitemap from 'vite-plugin-sitemap';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ViteSitemap({
      generateRobotsTxt: true,
    }),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Default Title',
          description: 'Default Description',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React ecosystem
          'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
          
          // Animation libraries
          'vendor-animation': ['gsap', 'framer-motion', '@studio-freight/lenis', 'lenis'],
          
          // UI components
          'vendor-ui': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-dialog', 
            '@radix-ui/react-progress',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-avatar'
          ],
          
          // 3D and heavy libs
          'vendor-3d': ['three', '@react-three/fiber', '@react-three/drei'],
          
          // Icons and utilities
          'vendor-utils': ['clsx', 'tailwind-merge', 'class-variance-authority', '@tabler/icons-react', 'lucide-react']
        },
      },
    },
    // Avisar sobre chunks grandes
    chunkSizeWarningLimit: 300,
    
    // Minificação agressiva
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
