'use client';

import * as React from 'react';
import { Proposta } from '@/types/proposta';
import { mockPropostas } from '@/data/mock-propostas';
import { Badge } from '@/components/ui/badge-2';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Plus, Edit, Eye, Search, Check } from 'lucide-react';
import { Button } from '@/components/ui/button-1';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const STATUS_LABELS: Record<Proposta['status'], string> = {
  rascunho: 'Rascunho',
  enviada: 'Enviada',
  aceita: 'Aceita',
  recusada: 'Recusada',
};

const STATUS_COLORS: Record<Proposta['status'], 'secondary' | 'warning' | 'success' | 'destructive'> = {
  rascunho: 'secondary',
  enviada: 'warning',
  aceita: 'success',
  recusada: 'destructive',
};

export default function PropostasTable() {
  const [propostas, setPropostas] = React.useState<Proposta[]>(mockPropostas);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedProposta, setSelectedProposta] = React.useState<Proposta | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleAddProposta = () => {
    setSelectedProposta({
      id: Date.now().toString(),
      clienteNome: '',
      valorTotal: 0,
      status: 'rascunho',
      dataCriacao: new Date().toISOString(),
      dataEvento: '',
      itens: [],
    });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleEditProposta = (proposta: Proposta) => {
    setSelectedProposta(proposta);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleViewProposta = (proposta: Proposta) => {
    setSelectedProposta(proposta);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleSaveProposta = () => {
    if (selectedProposta) {
      const exists = propostas.find(p => p.id === selectedProposta.id);
      if (exists) {
        setPropostas(propostas.map(p => p.id === selectedProposta.id ? selectedProposta : p));
      } else {
        setPropostas([...propostas, selectedProposta]);
      }
    }
    setIsModalOpen(false);
    setSelectedProposta(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedProposta(null);
      setIsEditing(false);
    }, 200);
  };

  // Filtrar propostas com base na busca
  const filteredPropostas = React.useMemo(() => {
    if (!searchQuery.trim()) return propostas;
    
    const query = searchQuery.toLowerCase();
    return propostas.filter(proposta => 
      proposta.clienteNome.toLowerCase().includes(query) ||
      proposta.valorTotal.toString().includes(query) ||
      (proposta.descricao?.toLowerCase().includes(query)) ||
      STATUS_LABELS[proposta.status].toLowerCase().includes(query)
    );
  }, [propostas, searchQuery]);

  return (
    <div className="w-full">
      {/* Header com título e botão */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold font-unbounded text-[#703535]">
            Propostas
          </h2>
          <button
            onClick={handleAddProposta}
            className="btn-primary-xs flex items-center gap-2"
          >
            <Plus className="size-4" />
            Nova Proposta
          </button>
        </div>
        {/* Barra de busca */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar propostas..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm bg-white"
          />
        </div>
      </div>

      {/* Tabela */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-unbounded text-[#703535]">Cliente</th>
                <th className="px-4 py-3 text-left text-xs font-unbounded text-[#703535]">Valor</th>
                <th className="px-4 py-3 text-left text-xs font-unbounded text-[#703535]">Data Evento</th>
                <th className="px-4 py-3 text-left text-xs font-unbounded text-[#703535]">Status</th>
                <th className="px-4 py-3 text-left text-xs font-unbounded text-[#703535]">Criada em</th>
                <th className="px-4 py-3 text-center text-xs font-unbounded text-[#703535]">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredPropostas.map((proposta) => (
                <tr key={proposta.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-700">{proposta.clienteNome}</td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    R$ {proposta.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {proposta.dataEvento ? format(new Date(proposta.dataEvento), "dd/MM/yyyy", { locale: ptBR }) : '-'}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={STATUS_COLORS[proposta.status]} size="sm">
                      {STATUS_LABELS[proposta.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {format(new Date(proposta.dataCriacao), "dd/MM/yyyy", { locale: ptBR })}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewProposta(proposta)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600 hover:text-[#703535]"
                        title="Visualizar"
                      >
                        <Eye className="size-4" />
                      </button>
                      <button
                        onClick={() => handleEditProposta(proposta)}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-600 hover:text-[#D65B58]"
                        title="Editar"
                      >
                        <Edit className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPropostas.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500 text-sm">
              {searchQuery ? 'Nenhuma proposta encontrada' : 'Nenhuma proposta cadastrada'}
            </p>
          </div>
        )}
      </div>

      {/* Modal de Edição/Visualização */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#F6EEE1]">
          {selectedProposta && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-unbounded text-[#703535]">
                  {isEditing ? (selectedProposta.clienteNome ? 'Editar Proposta' : 'Nova Proposta') : 'Visualizar Proposta'}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-4">
                {/* Formulário */}
                <div className="bg-white rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nome do Cliente
                      </label>
                      <input
                        type="text"
                        value={selectedProposta.clienteNome}
                        onChange={(e) => setSelectedProposta({ ...selectedProposta, clienteNome: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="Nome do casal"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data do Evento
                      </label>
                      <input
                        type="date"
                        value={selectedProposta.dataEvento ? selectedProposta.dataEvento.split('T')[0] : ''}
                        onChange={(e) => setSelectedProposta({ ...selectedProposta, dataEvento: e.target.value })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Valor Total
                      </label>
                      <input
                        type="number"
                        value={selectedProposta.valorTotal}
                        onChange={(e) => setSelectedProposta({ ...selectedProposta, valorTotal: parseFloat(e.target.value) || 0 })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        placeholder="0.00"
                        step="0.01"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={selectedProposta.status}
                        onChange={(e) => setSelectedProposta({ ...selectedProposta, status: e.target.value as Proposta['status'] })}
                        disabled={!isEditing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      >
                        <option value="rascunho">Rascunho</option>
                        <option value="enviada">Enviada</option>
                        <option value="aceita">Aceita</option>
                        <option value="recusada">Recusada</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <textarea
                      value={selectedProposta.descricao || ''}
                      onChange={(e) => setSelectedProposta({ ...selectedProposta, descricao: e.target.value })}
                      disabled={!isEditing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      rows={3}
                      placeholder="Descrição da proposta"
                    />
                  </div>
                </div>

                {/* Botões de Ação */}
                {isEditing && (
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={handleSaveProposta}
                      className="btn-primary-xs flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      Atualizar Proposta
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
