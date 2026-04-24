'use client';

import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Trash2, Upload, X, Plus, ImageIcon, Loader2, Pencil, Check } from 'lucide-react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { ToastProvider } from '@/components/ui/toast-1';
import { Spinner } from '@/components/ui/spinner';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type GaleriaFoto = {
  id: string;
  titulo: string | null;
  descricao: string | null;
  tags: string[];
  storage_path: string;
  url: string;
  created_at: string;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function TagPill({
  tag,
  onRemove,
}: {
  tag: string;
  onRemove?: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 bg-[#F3ECE9] text-[#703535] text-xs font-medium px-2.5 py-1 rounded-full">
      {tag}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="ml-0.5 hover:text-[#D65B58] transition-colors"
          aria-label={`Remover tag ${tag}`}
        >
          <X className="size-3" />
        </button>
      )}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Modal de edição de tags / título
// ---------------------------------------------------------------------------
function EditModal({
  foto,
  onClose,
  onSave,
}: {
  foto: GaleriaFoto;
  onClose: () => void;
  onSave: (id: string, titulo: string, tags: string[]) => Promise<void>;
}) {
  const [titulo, setTitulo] = React.useState(foto.titulo ?? '');
  const [tags, setTags] = React.useState<string[]>(foto.tags);
  const [tagInput, setTagInput] = React.useState('');
  const [saving, setSaving] = React.useState(false);

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags(prev => [...prev, t]);
    setTagInput('');
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSave = async () => {
    setSaving(true);
    await onSave(foto.id, titulo, tags);
    setSaving(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-unbounded text-[#703535]">Editar foto</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="size-5" />
          </button>
        </div>

        {/* Preview */}
        <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100">
          <Image src={foto.url} alt={foto.titulo ?? 'Foto'} fill className="object-cover" />
        </div>

        {/* Título */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={e => setTitulo(e.target.value)}
            placeholder="Ex: Bolo de casamento floral"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D65B58]/30 focus:border-[#D65B58]"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tags.map(t => (
              <TagPill key={t} tag={t} onRemove={() => setTags(tags.filter(x => x !== t))} />
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="Adicionar tag… Enter ou vírgula"
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D65B58]/30 focus:border-[#D65B58]"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-3 py-2 bg-[#F3ECE9] text-[#703535] rounded-lg hover:bg-[#e8dcd8] transition-colors"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1">Pressione Enter ou vírgula para adicionar</p>
        </div>

        <div className="flex gap-3 pt-1">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 px-4 py-2.5 bg-[#D65B58] text-white rounded-xl text-sm font-medium hover:bg-[#c04f4c] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Upload Card
// ---------------------------------------------------------------------------
function UploadCard({ onUploadComplete }: { onUploadComplete: () => void }) {
  const [file, setFile] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);
  const [titulo, setTitulo] = React.useState('');
  const [tags, setTags] = React.useState<string[]>([]);
  const [tagInput, setTagInput] = React.useState('');
  const [uploading, setUploading] = React.useState(false);
  const [error, setError] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith('image/')) {
      setError('Apenas imagens são permitidas.');
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 10 MB.');
      return;
    }
    setError('');
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0];
    if (f) {
      const fakeEvent = { target: { files: [f] } } as unknown as React.ChangeEvent<HTMLInputElement>;
      handleFileChange(fakeEvent);
    }
  };

  const addTag = () => {
    const t = tagInput.trim().toLowerCase();
    if (t && !tags.includes(t)) setTags(prev => [...prev, t]);
    setTagInput('');
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const reset = () => {
    setFile(null);
    setPreview(null);
    setTitulo('');
    setTags([]);
    setTagInput('');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleUpload = async () => {
    if (!file || !supabase) return;
    setUploading(true);
    setError('');

    try {
      const ext = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const storagePath = `fotos/${fileName}`;

      const { error: storageError } = await supabase.storage
        .from('galeria')
        .upload(storagePath, file, { cacheControl: '3600', upsert: false });

      if (storageError) throw storageError;

      const { data: urlData } = supabase.storage
        .from('galeria')
        .getPublicUrl(storagePath);

      const publicUrl = urlData.publicUrl;

      const { error: dbError } = await supabase.from('galeria_fotos').insert({
        titulo: titulo.trim() || null,
        tags,
        storage_path: storagePath,
        url: publicUrl,
      });

      if (dbError) throw dbError;

      reset();
      onUploadComplete();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Erro ao fazer upload.';
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
      <h2 className="text-base font-bold font-unbounded text-[#703535]">Adicionar foto</h2>

      {/* Drop zone */}
      {!preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-[#D65B58]/40 rounded-xl h-40 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#D65B58] hover:bg-[#fdf6f5] transition-colors"
        >
          <ImageIcon className="size-8 text-[#D65B58]/50" />
          <p className="text-sm text-gray-500">Clique ou arraste uma imagem</p>
          <p className="text-xs text-gray-400">PNG, JPG, WEBP • até 10 MB</p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden h-40 bg-gray-100">
          <Image src={preview} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={reset}
            className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow hover:bg-white transition-colors"
          >
            <X className="size-4 text-gray-600" />
          </button>
        </div>
      )}

      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título <span className="text-gray-400">(opcional)</span></label>
        <input
          type="text"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Ex: Bolo de casamento floral"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D65B58]/30 focus:border-[#D65B58]"
        />
      </div>

      {/* Tags */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
        <div className="flex flex-wrap gap-1.5 mb-2">
          {tags.map(t => (
            <TagPill key={t} tag={t} onRemove={() => setTags(tags.filter(x => x !== t))} />
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={tagInput}
            onChange={e => setTagInput(e.target.value)}
            onKeyDown={handleTagKeyDown}
            placeholder="Ex: floral, andar, branco…"
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#D65B58]/30 focus:border-[#D65B58]"
          />
          <button
            type="button"
            onClick={addTag}
            className="px-3 py-2 bg-[#F3ECE9] text-[#703535] rounded-lg hover:bg-[#e8dcd8] transition-colors"
          >
            <Plus className="size-4" />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-1">Enter ou vírgula para adicionar</p>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full flex items-center justify-center gap-2 bg-[#D65B58] text-white rounded-xl px-4 py-3 text-sm font-medium hover:bg-[#c04f4c] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {uploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
        {uploading ? 'Enviando…' : 'Enviar foto'}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------
export default function GaleriaDashboardPage() {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuth();
  const [mounted, setMounted] = React.useState(false);
  const [fotos, setFotos] = React.useState<GaleriaFoto[]>([]);
  const [loadingFotos, setLoadingFotos] = React.useState(true);
  const [editFoto, setEditFoto] = React.useState<GaleriaFoto | null>(null);
  const [deleting, setDeleting] = React.useState<string | null>(null);

  React.useEffect(() => { setMounted(true); }, []);

  React.useEffect(() => {
    if (!loading && !isAuthenticated) router.push('/login');
  }, [loading, isAuthenticated, router]);

  const loadFotos = React.useCallback(async () => {
    if (!supabase) return;
    setLoadingFotos(true);
    const { data, error } = await supabase
      .from('galeria_fotos')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data) setFotos(data as GaleriaFoto[]);
    setLoadingFotos(false);
  }, []);

  React.useEffect(() => {
    if (isAuthenticated && mounted) loadFotos();
  }, [isAuthenticated, mounted, loadFotos]);

  const handleDelete = async (foto: GaleriaFoto) => {
    if (!supabase) return;
    if (!confirm(`Excluir a foto "${foto.titulo ?? 'sem título'}"? Esta ação não pode ser desfeita.`)) return;
    setDeleting(foto.id);
    await supabase.storage.from('galeria').remove([foto.storage_path]);
    await supabase.from('galeria_fotos').delete().eq('id', foto.id);
    setFotos(prev => prev.filter(f => f.id !== foto.id));
    setDeleting(null);
  };

  const handleSaveEdit = async (id: string, titulo: string, tags: string[]) => {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('galeria_fotos')
      .update({ titulo: titulo || null, tags })
      .eq('id', id)
      .select()
      .single();
    if (!error && data) {
      setFotos(prev => prev.map(f => (f.id === id ? (data as GaleriaFoto) : f)));
    }
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F6EEE1]">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#F6EEE1]">
        <DashboardHeader currentPage="galeria" />

        <main className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-unbounded text-[#703535]">Galeria de Inspirações</h2>
            <p className="text-sm text-gray-500 mt-1">
              Gerencie as fotos exibidas na página pública de inspirações.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload card — coluna esquerda */}
            <div className="lg:col-span-1">
              <UploadCard onUploadComplete={loadFotos} />
            </div>

            {/* Grid de fotos — coluna direita */}
            <div className="lg:col-span-2">
              {loadingFotos ? (
                <div className="flex items-center justify-center h-40">
                  <Spinner />
                </div>
              ) : fotos.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-400 gap-2">
                  <ImageIcon className="size-10 opacity-30" />
                  <p className="text-sm">Nenhuma foto cadastrada ainda.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {fotos.map(foto => (
                    <div key={foto.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
                      {/* Imagem */}
                      <div className="relative aspect-square bg-gray-100">
                        <Image
                          src={foto.url}
                          alt={foto.titulo ?? 'Foto da galeria'}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover"
                        />
                        {/* Overlay de ações */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                          <button
                            onClick={() => setEditFoto(foto)}
                            className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors"
                            aria-label="Editar"
                          >
                            <Pencil className="size-4 text-[#703535]" />
                          </button>
                          <button
                            onClick={() => handleDelete(foto)}
                            disabled={deleting === foto.id}
                            className="p-2 bg-white rounded-full shadow hover:bg-red-50 transition-colors disabled:opacity-50"
                            aria-label="Excluir"
                          >
                            {deleting === foto.id
                              ? <Loader2 className="size-4 text-red-500 animate-spin" />
                              : <Trash2 className="size-4 text-red-500" />
                            }
                          </button>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-3 space-y-1.5">
                        {foto.titulo && (
                          <p className="text-xs font-medium text-gray-700 truncate">{foto.titulo}</p>
                        )}
                        {foto.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {foto.tags.slice(0, 3).map(t => (
                              <TagPill key={t} tag={t} />
                            ))}
                            {foto.tags.length > 3 && (
                              <span className="text-xs text-gray-400">+{foto.tags.length - 3}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal de edição */}
      {editFoto && (
        <EditModal
          foto={editFoto}
          onClose={() => setEditFoto(null)}
          onSave={handleSaveEdit}
        />
      )}
    </ToastProvider>
  );
}
