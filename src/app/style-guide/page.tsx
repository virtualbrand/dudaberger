'use client';

import { useState } from 'react';

export default function StyleGuidePage() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Aplicar background ao body
  if (typeof window !== 'undefined') {
    document.body.style.backgroundColor = '#F6EEE1';
  }

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Definição das paletas de cores oficiais
  const colorPalettes = {
    carbonBlack: {
      name: 'CARBON BLACK',
      description: 'Preto - Texto principal e elementos escuros',
      baseColor: '#1C1C1D',
      shades: [
        { name: '50', hex: '#f7f7f7' },
        { name: '100', hex: '#e8e8e8' },
        { name: '200', hex: '#d1d1d1' },
        { name: '300', hex: '#b9b9ba' },
        { name: '400', hex: '#9a9a9b' },
        { name: '500', hex: '#1C1C1D', isBase: true },
        { name: '600', hex: '#161617' },
        { name: '700', hex: '#111112' },
        { name: '800', hex: '#0b0b0c' },
        { name: '900', hex: '#060606' },
      ]
    },
    bitterChocolate: {
      name: 'BITTER CHOCOLATE',
      description: 'Chocolate Amargo - Texto secundário e detalhes',
      baseColor: '#703535',
      shades: [
        { name: '50', hex: '#faf6f6' },
        { name: '100', hex: '#f5eded' },
        { name: '200', hex: '#e8d4d4' },
        { name: '300', hex: '#d4afaf' },
        { name: '400', hex: '#b17878' },
        { name: '500', hex: '#703535', isBase: true },
        { name: '600', hex: '#5a2a2a' },
        { name: '700', hex: '#442020' },
        { name: '800', hex: '#2e1515' },
        { name: '900', hex: '#180b0b' },
      ]
    },
    lobsterPink: {
      name: 'LOBSTER PINK',
      description: 'Rosa Coral - Destaques e elementos de ênfase',
      baseColor: '#D65B58',
      shades: [
        { name: '50', hex: '#fdf5f5' },
        { name: '100', hex: '#fbe8e8' },
        { name: '200', hex: '#f7d1d0' },
        { name: '300', hex: '#f0b0ae' },
        { name: '400', hex: '#e58684' },
        { name: '500', hex: '#D65B58', isBase: true },
        { name: '600', hex: '#b94946' },
        { name: '700', hex: '#8f3835' },
        { name: '800', hex: '#652826' },
        { name: '900', hex: '#3b1715' },
      ]
    },
    rosyTaupe: {
      name: 'ROSY TAUPE',
      description: 'Rosé Taupe - Elementos suaves e detalhes',
      baseColor: '#D1A09C',
      shades: [
        { name: '50', hex: '#fcfaf9' },
        { name: '100', hex: '#f9f4f3' },
        { name: '200', hex: '#f2e9e7' },
        { name: '300', hex: '#e8d5d1' },
        { name: '400', hex: '#dcbbb6' },
        { name: '500', hex: '#D1A09C', isBase: true },
        { name: '600', hex: '#b8827d' },
        { name: '700', hex: '#8f645f' },
        { name: '800', hex: '#664743' },
        { name: '900', hex: '#3d2a28' },
      ]
    },
    oldLace: {
      name: 'OLD LACE',
      description: 'Old Lace - Backgrounds claros e seções',
      baseColor: '#F6EEE1',
      shades: [
        { name: '50', hex: '#fefdfb' },
        { name: '100', hex: '#fdfbf7' },
        { name: '200', hex: '#fbf7ef' },
        { name: '300', hex: '#f9f3e7' },
        { name: '400', hex: '#f8f0e4' },
        { name: '500', hex: '#F6EEE1', isBase: true },
        { name: '600', hex: '#e5d5c3' },
        { name: '700', hex: '#d4c4b2' },
        { name: '800', hex: '#c3b3a1' },
        { name: '900', hex: '#b2a290' },
      ]
    },
    evergreen: {
      name: 'EVERGREEN',
      description: 'Verde Escuro - Sucesso e confirmações',
      baseColor: '#183D32',
      shades: [
        { name: '50', hex: '#f3f8f6' },
        { name: '100', hex: '#e7f1ee' },
        { name: '200', hex: '#cce3db' },
        { name: '300', hex: '#a9cebf' },
        { name: '400', hex: '#7db09a' },
        { name: '500', hex: '#183D32', isBase: true },
        { name: '600', hex: '#133128' },
        { name: '700', hex: '#0f251f' },
        { name: '800', hex: '#0a1915' },
        { name: '900', hex: '#050d0b' },
      ]
    },
    frostedMint: {
      name: 'FROSTED MINT',
      description: 'Menta Gelada - Sucesso e elementos positivos',
      baseColor: '#DDF0CA',
      shades: [
        { name: '50', hex: '#fdfefb' },
        { name: '100', hex: '#fbfcf6' },
        { name: '200', hex: '#f6f9ed' },
        { name: '300', hex: '#eff5df' },
        { name: '400', hex: '#e6f2d4' },
        { name: '500', hex: '#DDF0CA', isBase: true },
        { name: '600', hex: '#c5d9a8' },
        { name: '700', hex: '#a8be87' },
        { name: '800', hex: '#7c8c62' },
        { name: '900', hex: '#4a533b' },
      ]
    },
    honeyBronze: {
      name: 'HONEY BRONZE',
      description: 'Bronze Mel - Avisos e alertas importantes',
      baseColor: '#EAA93A',
      shades: [
        { name: '50', hex: '#fef9f2' },
        { name: '100', hex: '#fdf3e5' },
        { name: '200', hex: '#fbe6ca' },
        { name: '300', hex: '#f7d4a5' },
        { name: '400', hex: '#f1bf75' },
        { name: '500', hex: '#EAA93A', isBase: true },
        { name: '600', hex: '#c9892e' },
        { name: '700', hex: '#9b6923' },
        { name: '800', hex: '#6e4b19' },
        { name: '900', hex: '#422d0f' },
      ]
    },
    bronze: {
      name: 'BRONZE',
      description: 'Bronze - Alertas e atenção',
      baseColor: '#B87F32',
      shades: [
        { name: '50', hex: '#faf7f3' },
        { name: '100', hex: '#f5efe7' },
        { name: '200', hex: '#ebdece' },
        { name: '300', hex: '#dcc7ab' },
        { name: '400', hex: '#c8a37c' },
        { name: '500', hex: '#B87F32', isBase: true },
        { name: '600', hex: '#966628' },
        { name: '700', hex: '#734e1f' },
        { name: '800', hex: '#513615' },
        { name: '900', hex: '#30200d' },
      ]
    },
  };

  const feedbackColors = {
    success: {
      name: 'SUCCESS',
      description: 'Verde - Mensagens de sucesso',
      primary: '#183D32',
      secondary: '#DDF0CA',
    },
    warning: {
      name: 'WARNING',
      description: 'Bronze/Mel - Avisos e atenção',
      primary: '#B87F32',
      secondary: '#EAA93A',
    },
    danger: {
      name: 'DANGER',
      description: 'Rosa/Coral - Erros e alertas',
      primary: '#703535',
      secondary: '#D65B58',
    },
  };

  return (
    <div className="min-h-screen p-8 space-y-12 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2" style={{ color: '#1C1C1D' }}>
          Duda Berger Design System
        </h1>
        <p className="text-lg" style={{ color: '#703535' }}>
          Paleta de cores e componentes - Sistema de design completo
        </p>
      </div>

      {/* Cores Base do Sistema */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1C1C1D' }}>
            Cores Base do Sistema
          </h2>
          <p style={{ color: '#703535' }}>
            Cores fundamentais para fundos, texto e elementos estruturais
          </p>
        </div>

        <div className="space-y-6">
          {Object.values(colorPalettes).map((palette) => (
            <div key={palette.name} className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: '#d9d2c9' }}>
              <div className="mb-4">
                <h3 className="font-bold text-lg" style={{ color: '#1C1C1D' }}>
                  {palette.name}
                </h3>
                <p className="text-sm" style={{ color: '#703535' }}>
                  {palette.description}
                </p>
              </div>
              
              <div className="flex gap-0 overflow-hidden rounded-lg border" style={{ borderColor: '#cfc6ba' }}>
                {palette.shades.map((shade) => (
                  <div
                    key={shade.name}
                    className="flex-1 group relative cursor-pointer hover:z-10"
                    onClick={() => copyToClipboard(shade.hex)}
                    title={`${shade.name} - Click to copy ${shade.hex}`}
                  >
                    <div
                      className="h-24 relative transition-all group-hover:scale-105 group-hover:shadow-lg"
                      style={{ backgroundColor: shade.hex }}
                    >
                      {shade.isBase && (
                        <div className="absolute top-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                          BASE
                        </div>
                      )}
                      {copiedColor === shade.hex && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs">
                          Copiado!
                        </div>
                      )}
                    </div>
                    <div className="py-2 px-1 text-center bg-white border-t" style={{ borderColor: '#cfc6ba' }}>
                      <p className="text-xs font-mono" style={{ color: '#1C1C1D' }}>
                        {shade.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cores de Feedback */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1C1C1D' }}>
            Cores de Feedback
          </h2>
          <p style={{ color: '#703535' }}>
            Cores para mensagens, alertas e estados do sistema (derivadas da paleta oficial)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.values(feedbackColors).map((palette) => (
            <div key={palette.name} className="bg-white rounded-xl shadow-sm border p-6" style={{ borderColor: '#d9d2c9' }}>
              <h3 className="font-bold mb-2" style={{ color: '#1C1C1D' }}>
                {palette.name}
              </h3>
              <p className="text-xs mb-4" style={{ color: '#703535' }}>
                {palette.description}
              </p>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs mb-1" style={{ color: '#703535' }}>Primary</p>
                  <div
                    className="h-20 rounded-lg relative cursor-pointer group transition-all hover:scale-105 hover:shadow-lg"
                    style={{ backgroundColor: palette.primary }}
                    onClick={() => copyToClipboard(palette.primary)}
                    title={`Click to copy ${palette.primary}`}
                  >
                    {copiedColor === palette.primary && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs rounded-lg">
                        Copiado!
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-mono mt-1 bg-gray-100 px-2 py-1 rounded inline-block" style={{ color: '#1C1C1D' }}>
                    {palette.primary}
                  </p>
                </div>

                <div>
                  <p className="text-xs mb-1" style={{ color: '#703535' }}>Secondary</p>
                  <div
                    className="h-20 rounded-lg relative cursor-pointer group transition-all hover:scale-105 hover:shadow-lg"
                    style={{ backgroundColor: palette.secondary }}
                    onClick={() => copyToClipboard(palette.secondary)}
                    title={`Click to copy ${palette.secondary}`}
                  >
                    {copiedColor === palette.secondary && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs rounded-lg">
                        Copiado!
                      </div>
                    )}
                  </div>
                  <p className="text-xs font-mono mt-1 bg-gray-100 px-2 py-1 rounded inline-block" style={{ color: '#1C1C1D' }}>
                    {palette.secondary}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Botões Primary */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1C1C1D' }}>
            Sistema de Botões
          </h2>
          <p style={{ color: '#703535' }} className="mb-4">
            Nomenclatura: <code className="px-2 py-1 bg-gray-100 rounded text-sm">btn-{'{variant}'}-{'{size}'}-{'{style}'}</code>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm bg-gray-50 p-4 rounded-lg border" style={{ borderColor: '#d9d2c9' }}>
            <div>
              <strong>Variantes:</strong> primary, secondary, success, warning, danger
            </div>
            <div>
              <strong>Tamanhos:</strong> xs, sm, md, lg
            </div>
            <div>
              <strong>Estilos:</strong> filled (padrão), outline
            </div>
            <div>
              <strong>Exemplo:</strong> <code className="px-2 py-1 bg-white rounded">btn-primary-md</code> ou <code className="px-2 py-1 bg-white rounded">btn-primary-xs-outline</code>
            </div>
          </div>
        </div>

        {/* Primary Buttons */}
        <div className="bg-white rounded-xl shadow-sm p-8 border space-y-8" style={{ borderColor: '#d9d2c9' }}>
          <div>
            <h3 className="text-xl font-bold mb-1 text-[#1C1C1D]">
              Primary (Lobster Pink)
            </h3>
            <p className="text-sm text-[#703535] mb-6">
              Ações principais e de destaque - Cor: #D65B58
            </p>

            {/* Filled Buttons */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-[#1C1C1D]">Filled</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#703535] mb-2">XS - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-primary-xs</code></p>
                  <button className="btn-primary-xs w-full">Button XS</button>
                  <button className="btn-primary-xs w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">SM - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-primary-sm</code></p>
                  <button className="btn-primary-sm w-full">Button SM</button>
                  <button className="btn-primary-sm w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">MD - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-primary-md</code></p>
                  <button className="btn-primary-md w-full">Button MD</button>
                  <button className="btn-primary-md w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">LG - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-primary-lg</code></p>
                  <button className="btn-primary-lg w-full">Button LG</button>
                  <button className="btn-primary-lg w-full mt-2" disabled>Disabled</button>
                </div>
              </div>
            </div>

            {/* Outline Buttons */}
            <div>
              <h4 className="font-semibold mb-3 text-[#1C1C1D]">Outline</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#703535] mb-2">XS - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-primary-xs-outline</code></p>
                  <button className="btn-primary-xs-outline w-full">Button XS</button>
                  <button className="btn-primary-xs-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">SM - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-primary-sm-outline</code></p>
                  <button className="btn-primary-sm-outline w-full">Button SM</button>
                  <button className="btn-primary-sm-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">MD - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-primary-md-outline</code></p>
                  <button className="btn-primary-md-outline w-full">Button MD</button>
                  <button className="btn-primary-md-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">LG - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-primary-lg-outline</code></p>
                  <button className="btn-primary-lg-outline w-full">Button LG</button>
                  <button className="btn-primary-lg-outline w-full mt-2" disabled>Disabled</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Buttons */}
        <div className="bg-white rounded-xl shadow-sm p-8 border space-y-8" style={{ borderColor: '#d9d2c9' }}>
          <div>
            <h3 className="text-xl font-bold mb-1 text-[#1C1C1D]">
              Secondary (Bitter Chocolate)
            </h3>
            <p className="text-sm text-[#703535] mb-6">
              Ações secundárias e navegação - Cor: #703535
            </p>

            {/* Filled Buttons */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-[#1C1C1D]">Filled</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#703535] mb-2">XS - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-secondary-xs</code></p>
                  <button className="btn-secondary-xs w-full">Button XS</button>
                  <button className="btn-secondary-xs w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">SM - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-secondary-sm</code></p>
                  <button className="btn-secondary-sm w-full">Button SM</button>
                  <button className="btn-secondary-sm w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">MD - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-secondary-md</code></p>
                  <button className="btn-secondary-md w-full">Button MD</button>
                  <button className="btn-secondary-md w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">LG - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-secondary-lg</code></p>
                  <button className="btn-secondary-lg w-full">Button LG</button>
                  <button className="btn-secondary-lg w-full mt-2" disabled>Disabled</button>
                </div>
              </div>
            </div>

            {/* Outline Buttons */}
            <div>
              <h4 className="font-semibold mb-3 text-[#1C1C1D]">Outline</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#703535] mb-2">XS - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-secondary-xs-outline</code></p>
                  <button className="btn-secondary-xs-outline w-full">Button XS</button>
                  <button className="btn-secondary-xs-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">SM - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-secondary-sm-outline</code></p>
                  <button className="btn-secondary-sm-outline w-full">Button SM</button>
                  <button className="btn-secondary-sm-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">MD - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-secondary-md-outline</code></p>
                  <button className="btn-secondary-md-outline w-full">Button MD</button>
                  <button className="btn-secondary-md-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">LG - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-secondary-lg-outline</code></p>
                  <button className="btn-secondary-lg-outline w-full">Button LG</button>
                  <button className="btn-secondary-lg-outline w-full mt-2" disabled>Disabled</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Success Buttons */}
        <div className="bg-white rounded-xl shadow-sm p-8 border space-y-8" style={{ borderColor: '#d9d2c9' }}>
          <div>
            <h3 className="text-xl font-bold mb-1 text-[#1C1C1D]">
              Success (Evergreen)
            </h3>
            <p className="text-sm text-[#703535] mb-6">
              Sucesso e confirmações - Cor: #183D32
            </p>

            {/* Filled Buttons */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-[#1C1C1D]">Filled</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#703535] mb-2">XS - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-success-xs</code></p>
                  <button className="btn-success-xs w-full">Button XS</button>
                  <button className="btn-success-xs w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">SM - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-success-sm</code></p>
                  <button className="btn-success-sm w-full">Button SM</button>
                  <button className="btn-success-sm w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">MD - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-success-md</code></p>
                  <button className="btn-success-md w-full">Button MD</button>
                  <button className="btn-success-md w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">LG - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-success-lg</code></p>
                  <button className="btn-success-lg w-full">Button LG</button>
                  <button className="btn-success-lg w-full mt-2" disabled>Disabled</button>
                </div>
              </div>
            </div>

            {/* Outline Buttons */}
            <div>
              <h4 className="font-semibold mb-3 text-[#1C1C1D]">Outline</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#703535] mb-2">XS - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-success-xs-outline</code></p>
                  <button className="btn-success-xs-outline w-full">Button XS</button>
                  <button className="btn-success-xs-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">SM - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-success-sm-outline</code></p>
                  <button className="btn-success-sm-outline w-full">Button SM</button>
                  <button className="btn-success-sm-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">MD - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-success-md-outline</code></p>
                  <button className="btn-success-md-outline w-full">Button MD</button>
                  <button className="btn-success-md-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">LG - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-success-lg-outline</code></p>
                  <button className="btn-success-lg-outline w-full">Button LG</button>
                  <button className="btn-success-lg-outline w-full mt-2" disabled>Disabled</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Warning Buttons */}
        <div className="bg-white rounded-xl shadow-sm p-8 border space-y-8" style={{ borderColor: '#d9d2c9' }}>
          <div>
            <h3 className="text-xl font-bold mb-1 text-[#1C1C1D]">
              Warning (Honey Bronze)
            </h3>
            <p className="text-sm text-[#703535] mb-6">
              Avisos e alertas importantes - Cor: #EAA93A
            </p>

            {/* Filled Buttons */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-[#1C1C1D]">Filled</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#703535] mb-2">XS - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-warning-xs</code></p>
                  <button className="btn-warning-xs w-full">Button XS</button>
                  <button className="btn-warning-xs w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">SM - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-warning-sm</code></p>
                  <button className="btn-warning-sm w-full">Button SM</button>
                  <button className="btn-warning-sm w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">MD - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-warning-md</code></p>
                  <button className="btn-warning-md w-full">Button MD</button>
                  <button className="btn-warning-md w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">LG - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-warning-lg</code></p>
                  <button className="btn-warning-lg w-full">Button LG</button>
                  <button className="btn-warning-lg w-full mt-2" disabled>Disabled</button>
                </div>
              </div>
            </div>

            {/* Outline Buttons */}
            <div>
              <h4 className="font-semibold mb-3 text-[#1C1C1D]">Outline</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#703535] mb-2">XS - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-warning-xs-outline</code></p>
                  <button className="btn-warning-xs-outline w-full">Button XS</button>
                  <button className="btn-warning-xs-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">SM - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-warning-sm-outline</code></p>
                  <button className="btn-warning-sm-outline w-full">Button SM</button>
                  <button className="btn-warning-sm-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">MD - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-warning-md-outline</code></p>
                  <button className="btn-warning-md-outline w-full">Button MD</button>
                  <button className="btn-warning-md-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">LG - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-warning-lg-outline</code></p>
                  <button className="btn-warning-lg-outline w-full">Button LG</button>
                  <button className="btn-warning-lg-outline w-full mt-2" disabled>Disabled</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Danger Buttons */}
        <div className="bg-white rounded-xl shadow-sm p-8 border space-y-8" style={{ borderColor: '#d9d2c9' }}>
          <div>
            <h3 className="text-xl font-bold mb-1 text-[#1C1C1D]">
              Danger (Lobster Pink)
            </h3>
            <p className="text-sm text-[#703535] mb-6">
              Ações destrutivas e erros - Cor: #D65B58
            </p>

            {/* Filled Buttons */}
            <div className="mb-6">
              <h4 className="font-semibold mb-3 text-[#1C1C1D]">Filled</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#703535] mb-2">XS - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-danger-xs</code></p>
                  <button className="btn-danger-xs w-full">Delete</button>
                  <button className="btn-danger-xs w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">SM - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-danger-sm</code></p>
                  <button className="btn-danger-sm w-full">Delete</button>
                  <button className="btn-danger-sm w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">MD - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-danger-md</code></p>
                  <button className="btn-danger-md w-full">Delete</button>
                  <button className="btn-danger-md w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">LG - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-danger-lg</code></p>
                  <button className="btn-danger-lg w-full">Delete</button>
                  <button className="btn-danger-lg w-full mt-2" disabled>Disabled</button>
                </div>
              </div>
            </div>

            {/* Outline Buttons */}
            <div>
              <h4 className="font-semibold mb-3 text-[#1C1C1D]">Outline</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-[#703535] mb-2">XS - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-danger-xs-outline</code></p>
                  <button className="btn-danger-xs-outline w-full">Delete</button>
                  <button className="btn-danger-xs-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">SM - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-danger-sm-outline</code></p>
                  <button className="btn-danger-sm-outline w-full">Delete</button>
                  <button className="btn-danger-sm-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">MD - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-danger-md-outline</code></p>
                  <button className="btn-danger-md-outline w-full">Delete</button>
                  <button className="btn-danger-md-outline w-full mt-2" disabled>Disabled</button>
                </div>
                <div>
                  <p className="text-xs text-[#703535] mb-2">LG - <code className="bg-gray-100 px-1.5 py-0.5 rounded">btn-danger-lg-outline</code></p>
                  <button className="btn-danger-lg-outline w-full">Delete</button>
                  <button className="btn-danger-lg-outline w-full mt-2" disabled>Disabled</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tipografia */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1C1C1D' }}>
            Tipografia
          </h2>
          <p style={{ color: '#703535' }}>
            Hierarquia de fontes e estilos de texto
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8 border space-y-6" style={{ borderColor: '#d9d2c9' }}>
          <div>
            <p className="text-sm mb-2" style={{ color: '#703535' }}>Heading 1</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-unbounded" style={{ color: '#1C1C1D' }}>
              The quick brown fox jumps
            </h1>
          </div>
          
          <div>
            <p className="text-sm mb-2" style={{ color: '#703535' }}>Heading 2</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-unbounded" style={{ color: '#1C1C1D' }}>
              The quick brown fox jumps
            </h2>
          </div>
          
          <div>
            <p className="text-sm mb-2" style={{ color: '#703535' }}>Heading 3</p>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-unbounded" style={{ color: '#1C1C1D' }}>
              The quick brown fox jumps
            </h3>
          </div>

          <div>
            <p className="text-sm mb-2" style={{ color: '#703535' }}>Heading 4</p>
            <h4 className="text-lg md:text-xl lg:text-2xl font-bold font-unbounded" style={{ color: '#1C1C1D' }}>
              The quick brown fox jumps
            </h4>
          </div>

          <div>
            <p className="text-sm mb-2" style={{ color: '#703535' }}>Heading 5</p>
            <h5 className="text-base md:text-lg lg:text-xl font-bold font-unbounded" style={{ color: '#1C1C1D' }}>
              The quick brown fox jumps
            </h5>
          </div>
          
          <div>
            <p className="text-sm mb-2" style={{ color: '#703535' }}>Heading 6</p>
            <h6 className="text-sm md:text-base lg:text-lg font-bold font-unbounded" style={{ color: '#1C1C1D' }}>
              The quick brown fox jumps
            </h6>
          </div>

          <div>
            <p className="text-sm mb-2" style={{ color: '#703535' }}>Body Large</p>
            <p className="text-base md:text-lg font-kumbh" style={{ color: '#1C1C1D' }}>
              The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div>
            <p className="text-sm mb-2" style={{ color: '#703535' }}>Body Regular</p>
            <p className="text-sm md:text-base font-kumbh" style={{ color: '#1C1C1D' }}>
              The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>

          <div>
            <p className="text-sm mb-2" style={{ color: '#703535' }}>Body Small</p>
            <p className="text-xs md:text-sm font-kumbh" style={{ color: '#1C1C1D' }}>
              The quick brown fox jumps over the lazy dog. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>

      {/* Preview de Card */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: '#1C1C1D' }}>
            Preview de Componentes
          </h2>
          <p style={{ color: '#703535' }}>
            Exemplo de card com estilos do sistema
          </p>
        </div>

        <div className="p-8 rounded-xl border" style={{ backgroundColor: '#F6EEE1', borderColor: '#d9d2c9' }}>
          <div className="bg-white rounded-xl shadow-sm border p-6 max-w-md" style={{ borderColor: '#d9d2c9' }}>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#1C1C1D' }}>
              Exemplo de Card
            </h3>
            <p className="mb-4" style={{ color: '#703535' }}>
              Este é um card de exemplo usando as cores do Design System da Duda Berger.
            </p>
            <div className="flex gap-3">
              <button
                className="px-4 py-2 rounded-full font-medium text-white transition-colors cursor-pointer font-unbounded"
                style={{ backgroundColor: '#D65B58' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#703535'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#D65B58'}
              >
                Ação Principal
              </button>
              <button
                className="px-4 py-2 rounded-full font-medium border-2 transition-colors cursor-pointer font-unbounded"
                style={{ color: '#703535', borderColor: '#703535', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#703535';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#703535';
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="pt-8 border-t" style={{ borderColor: '#d9d2c9' }}>
        <p className="text-center text-sm" style={{ color: '#703535' }}>
          © 2025 Duda Berger Design System v1.0.0
        </p>
      </div>
    </div>
  );
}
