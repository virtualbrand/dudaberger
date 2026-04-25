'use client';

import * as React from 'react';
import { Search, X, ZoomIn } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type GaleriaFoto = {
  id: string;
  tags: string[];
  url: string;
};

// ---------------------------------------------------------------------------
// Lightbox
// ---------------------------------------------------------------------------
function Lightbox({
  foto,
  onClose,
}: {
  foto: GaleriaFoto;
  onClose: () => void;
}) {
  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
        aria-label="Fechar"
      >
        <X className="size-5" />
      </button>

      <div className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center gap-3">
        <div className="relative w-full max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={foto.url}
            alt={'Inspiração de bolo'}
            className="w-full h-full object-contain max-h-[80vh]"
          />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function InspiracoesList() {
  const [fotos, setFotos] = React.useState<GaleriaFoto[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase
      .from('galeria_fotos')
      .select('id, tags, url')
      .order('created_at', { ascending: true })
      .then(({ data }: { data: GaleriaFoto[] | null }) => {
        setFotos(data ?? []);
        setLoading(false);
      });
  }, []);
  const [search, setSearch] = React.useState('');
  const [activeTag, setActiveTag] = React.useState<string | null>(null);
  const [lightbox, setLightbox] = React.useState<GaleriaFoto | null>(null);


  // All unique tags
  const allTags = React.useMemo(() => {
    const set = new Set<string>();
    fotos.forEach(f => f.tags.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [fotos]);

  // Filtered photos
  const filtered = React.useMemo(() => {
    return fotos.filter(f => {
      const matchTag = activeTag ? f.tags.includes(activeTag) : true;
      const q = search.toLowerCase().trim();
      const matchSearch = q
        ? f.tags.some(t => t.includes(q))
        : true;
      return matchTag && matchSearch;
    });
  }, [fotos, activeTag, search]);

  return (
    <div className="min-h-screen bg-[#FFFFF8]">
      {/* Hero */}
      <section className="px-4 pt-16 pb-10 text-center">
        <p className="text-xs font-unbounded tracking-widest text-[#D65B58] uppercase mb-3">Galeria</p>
        <h1 className="text-4xl md:text-5xl font-unbounded font-semibold text-[#703535] leading-tight">
          Inspirações
        </h1>
        <p className="mt-4 text-base text-gray-500 max-w-md mx-auto">
          Navegue pelos bolos da Duda Berger e encontre o que combina com o seu sonho.
        </p>
      </section>

      {/* Search + Filters */}
      <section className="sticky top-0 z-30 bg-[#FFFFF8]/95 backdrop-blur-sm border-b border-[#F3ECE9] px-4 py-4">
        <div className="max-w-5xl mx-auto space-y-3">
          {/* Search input */}
          <div className="relative max-w-sm mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nome ou tag…"
              className="w-full pl-9 pr-9 py-2.5 rounded-full border border-[#e0d5cf] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#D65B58]/30 focus:border-[#D65B58] transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Limpar busca"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          {/* Tag pills */}
          {allTags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                  activeTag === null
                    ? 'bg-[#703535] text-white border-[#703535]'
                    : 'bg-white text-[#703535] border-[#e0d5cf] hover:border-[#703535]'
                }`}
              >
                Todos
              </button>
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`text-xs px-3.5 py-1.5 rounded-full border transition-colors capitalize ${
                    activeTag === tag
                      ? 'bg-[#D65B58] text-white border-[#D65B58]'
                      : 'bg-white text-[#703535] border-[#e0d5cf] hover:border-[#D65B58]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-2 border-[#D65B58] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
            <Search className="size-10 opacity-30" />
            <p className="text-sm">
              {fotos.length === 0
                ? 'Em breve teremos fotos aqui. Volte logo!'
                : 'Nenhuma foto encontrada para esta busca.'}
            </p>
            {(search || activeTag) && (
              <button
                onClick={() => { setSearch(''); setActiveTag(null); }}
                className="text-xs text-[#D65B58] underline underline-offset-2 hover:opacity-75"
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Result count */}
            <p className="text-xs text-gray-400 mb-6 text-center">
              {filtered.length} {filtered.length === 1 ? 'foto encontrada' : 'fotos encontradas'}
              {(activeTag || search) && (
                <button
                  onClick={() => { setSearch(''); setActiveTag(null); }}
                  className="ml-2 text-[#D65B58] underline underline-offset-2 hover:opacity-75"
                >
                  Limpar filtros
                </button>
              )}
            </p>

            {/* Masonry-style columns via CSS columns */}
            <div
              className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-0"
              style={{ columnGap: '1rem' }}
            >
              {filtered.map(foto => (
                <div
                  key={foto.id}
                  className="break-inside-avoid mb-4 group relative cursor-pointer rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => setLightbox(foto)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={foto.url}
                    alt={'Inspiração de bolo'}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <ZoomIn className="size-6 text-white drop-shadow" />
                  </div>
                  {/* Bottom gradient with tags */}
                  {foto.tags.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex flex-wrap gap-1">
                        {foto.tags.slice(0, 3).map(t => (
                          <span
                            key={t}
                            className="bg-white/20 text-white text-[10px] px-2 py-0.5 rounded-full capitalize"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
