'use client';

import * as React from 'react';
import { Search, X, ZoomIn } from 'lucide-react';
import { supabase } from '@/lib/supabase';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type GaleriaFoto = {
  id: string;
  numero?: number | null;
  tags: string[];
  url: string;
};

const WHATSAPP_NUMBER = '5548991797296';
const BASE_URL = 'https://dudaberger.com.br';

function getDisplayId(foto: GaleriaFoto): string {
  if (foto.numero != null) return String(foto.numero).padStart(4, '0');
  // fallback: use last 4 chars of uuid
  return foto.id.slice(-4).toUpperCase();
}

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
  const [visible, setVisible] = React.useState(false);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fade in on mount
  React.useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => {
      cancelAnimationFrame(frame);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleClose = React.useCallback(() => {
    setVisible(false);
    closeTimerRef.current = setTimeout(onClose, 300);
  }, [onClose]);

  React.useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleClose]);

  const formattedId = getDisplayId(foto);
  const shareUrl = `${BASE_URL}/inspiracoes?id=${formattedId}`;
  const waMessage = encodeURIComponent(`Gostei dessa referência: ${shareUrl}`);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all duration-300 ${
        visible ? 'opacity-100 bg-black/80' : 'opacity-0 bg-black/0 pointer-events-none'
      }`}
      onClick={e => e.target === e.currentTarget && handleClose()}
    >
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors cursor-pointer"
        aria-label="Fechar"
      >
        <X className="size-5" />
      </button>

      <div
        className={`relative max-w-3xl w-full flex flex-col items-center gap-3 transition-all duration-300 ${
          visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="relative w-full max-h-[80vh] rounded-2xl overflow-hidden shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={foto.url}
            alt={`Referência #${formattedId}`}
            className="w-full h-full object-contain max-h-[80vh]"
          />
        </div>

        {/* Footer bar */}
        <div className="w-full flex items-center justify-between px-1">
          <span className="text-white/60 text-sm font-mono">#{formattedId}</span>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-sm flex items-center gap-2"
          >
            <svg
              viewBox="0 0 24 24"
              className="size-4 fill-current shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.121 1.533 5.849L.057 23.716a.5.5 0 00.608.633l6.015-1.576A11.95 11.95 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.003-1.373l-.36-.213-3.724.977.994-3.629-.234-.374A9.77 9.77 0 012.182 12c0-5.418 4.4-9.818 9.818-9.818 5.418 0 9.818 4.4 9.818 9.818 0 5.418-4.4 9.818-9.818 9.818z" />
            </svg>
            Enviar referência pelo WhatsApp
          </a>
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
  const [lightbox, setLightbox] = React.useState<GaleriaFoto | null>(null);
  const [search, setSearch] = React.useState('');
  const [activeTags, setActiveTags] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!supabase) { setLoading(false); return; }
    supabase
      .from('galeria_fotos')
      .select('id, numero, tags, url')
      .order('created_at', { ascending: true })
      .then(({ data, error }: { data: GaleriaFoto[] | null; error: unknown }) => {
        if (error) {
          // Fallback: retry without `numero` if column doesn't exist yet
          supabase!.from('galeria_fotos')
            .select('id, tags, url')
            .order('created_at', { ascending: true })
            .then(({ data: d2 }: { data: GaleriaFoto[] | null }) => {
              setFotos(d2 ?? []);
              setLoading(false);
            });
          return;
        }
        setFotos(data ?? []);
        setLoading(false);
      });
  }, []);

  const openLightbox = React.useCallback((foto: GaleriaFoto) => {
    setLightbox(foto);
    if (foto.numero != null) {
      window.history.replaceState(null, '', `/inspiracoes?id=${getDisplayId(foto)}`);
    }
  }, []);

  const closeLightbox = React.useCallback(() => {
    setLightbox(null);
    window.history.replaceState(null, '', '/inspiracoes');
  }, []);

  // Auto-open from URL ?id= param once fotos are loaded
  React.useEffect(() => {
    if (fotos.length === 0) return;
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (id) {
      const num = parseInt(id, 10);
      const foto = fotos.find(f => f.numero != null && f.numero === num);
      if (foto) openLightbox(foto);
    }
  }, [fotos, openLightbox]);

  const toggleTag = (tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  // All unique tags
  const allTags = React.useMemo(() => {
    const set = new Set<string>();
    fotos.forEach(f => f.tags.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [fotos]);

  // Filtered photos
  const filtered = React.useMemo(() => {
    return fotos.filter(f => {
      const matchTag = activeTags.length > 0 ? activeTags.some(t => f.tags.includes(t)) : true;
      const q = search.toLowerCase().trim();
      const matchSearch = q ? f.tags.some(t => t.includes(q)) : true;
      return matchTag && matchSearch;
    });
  }, [fotos, activeTags, search]);

  return (
    <div className="min-h-screen bg-transparent">
      {/* Lightbox */}
      {lightbox && <Lightbox foto={lightbox} onClose={closeLightbox} />}

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
      <section className="sticky top-0 z-30 px-4 py-4">
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
                onClick={() => setActiveTags([])}
                className={`cursor-pointer text-xs px-3.5 py-1.5 rounded-full border transition-colors ${
                  activeTags.length === 0
                    ? 'bg-[#703535] text-white border-[#703535]'
                    : 'bg-white text-[#703535] border-[#e0d5cf] hover:border-[#703535]'
                }`}
              >
                Todos
              </button>
              {allTags.map(tag => {
                const isActive = activeTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`cursor-pointer flex items-center gap-1 text-xs px-3.5 py-1.5 rounded-full border transition-colors capitalize ${
                      isActive
                        ? 'bg-[#D65B58] text-white border-[#D65B58]'
                        : 'bg-white text-[#703535] border-[#e0d5cf] hover:border-[#D65B58]'
                    }`}
                  >
                    {tag}
                    {isActive && <X className="size-3" />}
                  </button>
                );
              })}
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
            {(search || activeTags.length > 0) && (
              <button
                onClick={() => { setSearch(''); setActiveTags([]); }}
                className="text-xs text-[#D65B58] underline underline-offset-2 hover:opacity-75 cursor-pointer"
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
              {(activeTags.length > 0 || search) && (
                <button
                  onClick={() => { setSearch(''); setActiveTags([]); }}
                  className="ml-2 text-[#D65B58] underline underline-offset-2 hover:opacity-75 cursor-pointer"
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
                  onClick={() => openLightbox(foto)}
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
