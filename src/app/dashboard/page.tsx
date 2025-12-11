'use client';

import * as React from 'react';
import CasamentoLeadsKanban from '@/components/dashboard/CasamentoLeadsKanban';
import PropostasTable from '@/components/dashboard/PropostasTable';
import { LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button-1';

type ActiveTab = 'leads' | 'propostas' | 'contratos';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>('leads');
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleLogout = () => {
    // Lógica de logout aqui
    console.log('Logout');
  };

  return (
    <div className="min-h-screen bg-[#F6EEE1]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold font-unbounded text-[#703535]">
                Duda Berger
              </h1>
            </div>

            {/* Menu Centralizado */}
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => setActiveTab('leads')}
                className={`text-sm font-unbounded transition-colors pb-1 cursor-pointer ${
                  activeTab === 'leads'
                    ? 'text-[#D65B58] border-b-2 border-[#D65B58]'
                    : 'text-[#703535] hover:text-[#D65B58]'
                }`}
              >
                Leads
              </button>
              <button 
                onClick={() => setActiveTab('propostas')}
                className={`text-sm font-unbounded transition-colors pb-1 cursor-pointer ${
                  activeTab === 'propostas'
                    ? 'text-[#D65B58] border-b-2 border-[#D65B58]'
                    : 'text-[#703535] hover:text-[#D65B58]'
                }`}
              >
                Propostas
              </button>
              <button 
                onClick={() => setActiveTab('contratos')}
                className={`text-sm font-unbounded transition-colors pb-1 cursor-pointer ${
                  activeTab === 'contratos'
                    ? 'text-[#D65B58] border-b-2 border-[#D65B58]'
                    : 'text-[#703535] hover:text-[#D65B58]'
                }`}
              >
                Contratos
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="size-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'leads' && (
          <>
            <div className="mb-6">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold font-unbounded text-[#703535] mb-4">
                Leads
              </h2>
              {/* Barra de busca */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar leads..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                />
              </div>
            </div>
            <CasamentoLeadsKanban searchQuery={searchQuery} />
          </>
        )}

        {activeTab === 'propostas' && <PropostasTable />}

        {activeTab === 'contratos' && (
          <>
            <div className="mb-6">
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold font-unbounded text-[#703535] mb-4">
                Contratos
              </h2>
              {/* Barra de busca */}
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar contratos..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                />
              </div>
            </div>
            <div className="text-center py-12">
              <p className="text-gray-500">Seção de Contratos em desenvolvimento</p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
