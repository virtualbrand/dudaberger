'use client';

import * as React from 'react';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button-1';
import { useAuth } from '@/hooks/useAuth';

type DashboardHeaderProps = {
  currentPage: 'leads' | 'propostas' | 'contratos';
};

export default function DashboardHeader({ currentPage }: DashboardHeaderProps) {
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
  };

  return (
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
            <a 
              href="/dashboard"
              className={`text-sm font-unbounded transition-colors pb-1 cursor-pointer ${
                currentPage === 'leads'
                  ? 'text-[#D65B58] border-b-2 border-[#D65B58]'
                  : 'text-[#703535] hover:text-[#D65B58]'
              }`}
            >
              Leads
            </a>
            <a 
              href="/propostas"
              className={`text-sm font-unbounded transition-colors pb-1 cursor-pointer ${
                currentPage === 'propostas'
                  ? 'text-[#D65B58] border-b-2 border-[#D65B58]'
                  : 'text-[#703535] hover:text-[#D65B58]'
              }`}
            >
              Propostas
            </a>
            <a 
              href="/contratos"
              className={`text-sm font-unbounded transition-colors pb-1 cursor-pointer ${
                currentPage === 'contratos'
                  ? 'text-[#D65B58] border-b-2 border-[#D65B58]'
                  : 'text-[#703535] hover:text-[#D65B58]'
              }`}
            >
              Contratos
            </a>
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
  );
}
