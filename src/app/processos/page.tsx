import Link from 'next/link';
import { BookOpen, ChevronRight } from 'lucide-react';

const processos = [
  {
    slug: 'atendimento-noivos',
    titulo: 'Atendimento de Noivos',
    descricao: 'Fluxo completo de atendimento desde a entrada do lead até o pós-venda.',
    etapas: 9,
    categoria: 'Comercial',
    cor: '#D65B58',
  },
];

export default function ProcessosPage() {
  return (
    <div className="min-h-screen bg-[#F6EEE1]">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#D65B58] rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-medium text-[#D65B58] uppercase tracking-widest font-unbounded">Conto Atelier</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-unbounded font-bold text-[#703535] mb-3">
            Processos
          </h1>
          <p className="text-gray-600 text-base max-w-xl">
            Documentação interna dos processos operacionais e comerciais da confeitaria.
          </p>
        </div>

        <div className="space-y-4">
          {processos.map((p) => (
            <Link
              key={p.slug}
              href={`/processos/${p.slug}`}
              className="cursor-pointer group block bg-white rounded-xl border border-gray-200 p-6 hover:border-[#D65B58] hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className="w-2 self-stretch rounded-full shrink-0"
                    style={{ backgroundColor: p.cor }}
                  />
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">{p.categoria}</span>
                      <span className="text-xs bg-[#F6EEE1] text-[#703535] px-2 py-0.5 rounded-full">{p.etapas} etapas</span>
                    </div>
                    <h2 className="text-lg font-semibold text-[#703535] group-hover:text-[#D65B58] transition-colors font-unbounded">
                      {p.titulo}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">{p.descricao}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#D65B58] transition-colors shrink-0 ml-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
