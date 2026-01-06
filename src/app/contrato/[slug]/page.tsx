'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Contrato } from '@/types/contrato';
import { mockContratos } from '@/data/mock-contratos';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, MapPin, Users, FileText, PenTool, Download } from 'lucide-react';
import { Spinner } from '@/components/ui/spinner';
import extenso from 'extenso';
import dynamic from 'next/dynamic';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const SignatureMaker = dynamic(
  () => import('@docuseal/signature-maker-react').then(mod => mod.SignatureMaker),
  { ssr: false }
);

export default function ContratoPublicoPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [contrato, setContrato] = React.useState<Contrato | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [isValidated, setIsValidated] = React.useState(false);
  const [inputDate, setInputDate] = React.useState('');
  const [validationError, setValidationError] = React.useState('');
  const [showSignerDialog, setShowSignerDialog] = React.useState(false);
  const [showSignaturePanel, setShowSignaturePanel] = React.useState(false);
  const [selectedSigner, setSelectedSigner] = React.useState<'noivo' | 'noiva' | null>(null);
  const [assinaturaNoiva, setAssinaturaNoiva] = React.useState<string | null>(null);
  const [assinaturaNoivo, setAssinaturaNoivo] = React.useState<string | null>(null);
  const [signatureMakerKey, setSignatureMakerKey] = React.useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = React.useState(false);
  
  const targetRef = React.useRef<HTMLElement>(null);

  // Função para gerar PDF
  const handleDownloadPDF = async () => {
    if (!targetRef.current || !contrato) {
      console.error('Ref ou contrato não disponível');
      return;
    }
    
    setIsGeneratingPDF(true);
    try {
      console.log('Iniciando geração do PDF...');
      
      const canvas = await html2canvas(targetRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        foreignObjectRendering: false,
        logging: false,
        backgroundColor: '#ffffff',
        imageTimeout: 0,
        ignoreElements: (element) => {
          // Ignorar elementos que possam causar problemas
          return element.tagName === 'SCRIPT' || element.tagName === 'STYLE';
        },
        onclone: (clonedDoc) => {
          // Remover todos os stylesheets externos
          const styles = clonedDoc.querySelectorAll('style, link[rel="stylesheet"]');
          styles.forEach(style => style.remove());
          
          // Adicionar estilos inline básicos e seguros
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el) => {
            const element = el as HTMLElement;
            if (!element.style) return;
            
            // Resetar estilos problemáticos
            element.style.removeProperty('color-scheme');
            
            // Forçar cores básicas seguras se necessário
            const computed = window.getComputedStyle(element);
            try {
              if (computed.color) {
                const color = computed.color;
                if (!color.includes('rgb') && !color.includes('#')) {
                  element.style.color = '#000000';
                }
              }
              if (computed.backgroundColor) {
                const bgColor = computed.backgroundColor;
                if (!bgColor.includes('rgb') && !bgColor.includes('#') && bgColor !== 'transparent') {
                  element.style.backgroundColor = '#ffffff';
                }
              }
            } catch (e) {
              // Ignorar erros de parsing
            }
          });
        }
      });
      
      console.log('Canvas gerado:', canvas.width, 'x', canvas.height);
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: 'a4',
        hotfixes: ['px_scaling']
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Calcular a escala para caber na largura do PDF
      const scale = pdfWidth / canvasWidth;
      const scaledHeight = canvasHeight * scale;
      
      let yPosition = 0;
      
      // Se couber em uma página
      if (scaledHeight <= pdfHeight) {
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, scaledHeight);
      } else {
        // Múltiplas páginas
        while (yPosition < scaledHeight) {
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = canvasWidth;
          pageCanvas.height = Math.min(pdfHeight / scale, canvasHeight - (yPosition / scale));
          
          const pageContext = pageCanvas.getContext('2d');
          if (pageContext) {
            pageContext.drawImage(
              canvas,
              0,
              yPosition / scale,
              canvasWidth,
              pageCanvas.height,
              0,
              0,
              canvasWidth,
              pageCanvas.height
            );
            
            const pageImgData = pageCanvas.toDataURL('image/png');
            
            if (yPosition > 0) {
              pdf.addPage();
            }
            
            pdf.addImage(pageImgData, 'PNG', 0, 0, pdfWidth, pageCanvas.height * scale);
          }
          
          yPosition += pdfHeight;
        }
      }
      
      const fileName = `contrato-${contrato.nomeNoiva?.toLowerCase().replace(/\s+/g, '-') || 'casamento'}.pdf`;
      console.log('Salvando PDF:', fileName);
      pdf.save(fileName);
      console.log('PDF gerado com sucesso!');
    } catch (error) {
      console.error('❌ Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Por favor, tente novamente.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  // Verificar se já foi validado nesta sessão
  React.useEffect(() => {
    if (slug) {
      const validated = sessionStorage.getItem(`contrato-validated-${slug}`);
      if (validated === 'true') {
        setIsValidated(true);
      }
    }
  }, [slug]);

  // Travar scroll quando não validado
  React.useEffect(() => {
    if (!isValidated && !loading && contrato) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isValidated, loading, contrato]);

  const handleValidateDate = () => {
    if (!inputDate) {
      setValidationError('Por favor, informe a data da cerimônia');
      return;
    }

    if (!contrato?.dataEvento) {
      setValidationError('Data do evento não disponível');
      return;
    }

    // Comparar apenas a data (sem hora)
    const inputDateOnly = inputDate;
    const contratoDateOnly = contrato.dataEvento.split('T')[0];

    if (inputDateOnly === contratoDateOnly) {
      setIsValidated(true);
      setValidationError('');
      sessionStorage.setItem(`contrato-validated-${slug}`, 'true');
    } else {
      setValidationError('Data incorreta. Verifique a data da cerimônia e tente novamente.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleValidateDate();
    }
  };

  React.useEffect(() => {
    const loadContrato = async () => {
      if (!slug) {
        setError('Contrato não encontrado');
        setLoading(false);
        return;
      }

      try {
        // Tentar buscar no mock primeiro (para desenvolvimento local)
        const mockContrato = mockContratos.find(c => c.slug === slug);
        
        // Se tiver Supabase, buscar lá primeiro
        if (supabase) {
          const { data, error } = await (supabase as any)
            .from('contratos')
            .select('id, titulo, slug, descricao, valor_total, status, data_evento, data_contrato, local_festa, numero_convidados, nome_noiva, cpf_noiva, nome_noivo, cpf_noivo, endereco, assinatura_noiva, assinatura_noivo, created_at')
            .eq('slug', slug)
            .single();

          if (!error && data) {
            const contratoData: Contrato = {
              id: String(data.id),
              clienteNome: String(data.titulo ?? ''),
              valorTotal: Number(data.valor_total ?? 0),
              status: data.status || 'rascunho',
              dataCriacao: String(data.created_at ?? new Date().toISOString()),
              dataEvento: data.data_evento ? `${data.data_evento}T00:00:00` : '',
              descricao: data.descricao ?? undefined,
              slug: data.slug ?? undefined,
              localFesta: data.local_festa ?? undefined,
              numeroConvidados: data.numero_convidados ?? undefined,
              nomeNoiva: data.nome_noiva ?? undefined,
              cpfNoiva: data.cpf_noiva ?? undefined,
              nomeNoivo: data.nome_noivo ?? undefined,
              cpfNoivo: data.cpf_noivo ?? undefined,
              endereco: data.endereco ?? undefined,
              dataContrato: data.data_contrato ? `${data.data_contrato}T00:00:00` : undefined,
              assinaturaNoiva: data.assinatura_noiva ?? undefined,
              assinaturaNoivo: data.assinatura_noivo ?? undefined,
            };
            
            // Carregar assinaturas existentes
            if (data.assinatura_noiva) {
              try {
                let signature = data.assinatura_noiva;
                
                // Se for JSON, fazer parse
                if (typeof signature === 'string' && signature.startsWith('{')) {
                  signature = JSON.parse(signature).base64;
                }
                
                // Garantir que tem o prefixo data:image
                if (signature && !signature.startsWith('data:')) {
                  signature = `data:image/png;base64,${signature}`;
                }
                
                setAssinaturaNoiva(signature);
              } catch (e) {
                console.error('❌ Erro ao processar assinatura noiva:', e);
              }
            }
            if (data.assinatura_noivo) {
              try {
                let signature = data.assinatura_noivo;
                
                // Se for JSON, fazer parse
                if (typeof signature === 'string' && signature.startsWith('{')) {
                  signature = JSON.parse(signature).base64;
                }
                
                // Garantir que tem o prefixo data:image
                if (signature && !signature.startsWith('data:')) {
                  signature = `data:image/png;base64,${signature}`;
                }
                
                setAssinaturaNoivo(signature);
              } catch (e) {
                console.error('❌ Erro ao processar assinatura noivo:', e);
              }
            }
            
            setContrato(contratoData);
            setLoading(false);
            return;
          } else if (error) {
            console.error('❌ Erro ao buscar contrato:', error);
          }
        }

        // Fallback para mock se não encontrou no Supabase
        if (mockContrato) {
          setContrato(mockContrato);
          setLoading(false);
          return;
        }

        // Se não encontrou em nenhum lugar
        setError('Contrato não encontrado');
        setLoading(false);
      } catch (err) {
        console.error('Erro ao carregar contrato:', err);
        
        // Tentar fallback para mock em caso de erro
        const mockContrato = mockContratos.find(c => c.slug === slug);
        if (mockContrato) {
          setContrato(mockContrato);
          setLoading(false);
        } else {
          setError('Erro ao carregar contrato');
          setLoading(false);
        }
      }
    };

    loadContrato();
  }, [slug]);

  // Fechar dialogs com ESC
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showSignaturePanel) {
          setShowSignaturePanel(false);
          setSelectedSigner(null);
        } else if (showSignerDialog) {
          setShowSignerDialog(false);
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showSignaturePanel, showSignerDialog]);

  // Mover botão Enviar para dentro do container de controles
  React.useEffect(() => {
    if (!showSignaturePanel) return;
    
    let attempts = 0;
    const maxAttempts = 20;
    
    const timer = setInterval(() => {
      attempts++;
      
      try {
        const saveButton = document.querySelector('[data-target="saveButton"]');
        const controlContainer = document.querySelector('[data-target="controlButtonsContainer"]');
        
        if (saveButton && controlContainer && !controlContainer.contains(saveButton)) {
          const saveButtonParent = saveButton.parentElement;
          if (saveButtonParent && saveButtonParent !== controlContainer) {
            saveButtonParent.style.width = 'auto';
            saveButtonParent.style.flexShrink = '0';
          }
          controlContainer.appendChild(saveButton);
          clearInterval(timer);
        }
        
        if (attempts >= maxAttempts) {
          clearInterval(timer);
        }
      } catch (error) {
        console.error('Erro ao mover botão:', error);
        clearInterval(timer);
      }
    }, 50);
    
    return () => {
      clearInterval(timer);
      // Aguardar um pouco antes de limpar para evitar erros do IntersectionObserver
      setTimeout(() => {
        try {
          const saveButton = document.querySelector('[data-target="saveButton"]');
          if (saveButton) {
            // Deixar a limpeza para a biblioteca
          }
        } catch (e) {
          // Ignorar erros de limpeza
        }
      }, 100);
    };
  }, [showSignaturePanel]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6EEE1] flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !contrato) {
    return (
      <div className="min-h-screen bg-[#F6EEE1] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold font-unbounded text-[#703535] mb-4">
            Contrato não encontrado
          </h1>
          <p className="text-gray-600">
            O contrato que você está procurando não existe ou foi removido.
          </p>
        </div>
      </div>
    );
  }

  // Se o contrato está em rascunho ou cancelado, mostrar mensagem
  const isRascunho = contrato.status === 'rascunho';
  const isCancelado = contrato.status === 'cancelado';
  const isRestrito = isRascunho || isCancelado;

  return (
    <div className="min-h-screen bg-[#F6EEE1] relative">
      {/* Validation Modal Overlay */}
      {!isValidated && !loading && contrato && !isRascunho && !isCancelado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-md" />
          
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-[500px] w-full p-8 animate-fade-in">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-[#D65B58] rounded-full flex items-center justify-center mb-4">
                <Calendar className="size-8 text-white" />
              </div>
              <h2 className="text-2xl font-unbounded font-bold text-[#703535] mb-2">
                Acesso ao Contrato
              </h2>
              <p className="text-gray-600 text-sm">
                Para acessar o contrato, por favor confirme a data da cerimônia
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data da Cerimônia
                </label>
                <input
                  type="date"
                  value={inputDate}
                  onChange={(e) => {
                    setInputDate(e.target.value);
                    setValidationError('');
                  }}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#D65B58] focus:border-transparent"
                  placeholder="DD/MM/AAAA"
                />
              </div>

              {validationError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600">{validationError}</p>
                </div>
              )}

              <button
                onClick={handleValidateDate}
                className="w-full bg-[#D65B58] hover:bg-[#b84a47] text-white font-unbounded py-3 px-6 rounded-lg transition-colors duration-200"
              >
                Acessar Contrato
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6">
              Esta verificação garante que apenas pessoas autorizadas acessem o contrato
            </p>
          </div>
        </div>
      )}

      {/* Page content with blur when not validated */}
      <div className={!isValidated && !loading && contrato && !isRascunho && !isCancelado ? 'filter blur-sm pointer-events-none select-none' : ''}>
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat md:bg-fixed"
          style={{ 
            backgroundImage: 'url(/images/casamento/hero-proposta.webp)'
          }}
        >
          {/* Overlay escuro para melhor legibilidade */}
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Conteúdo da Hero */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
          {isRascunho ? (
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-unbounded font-bold text-white mb-4 leading-tight animate-fade-in">
              O contrato ainda não está disponível
            </h1>
          ) : isCancelado ? (
            <>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-unbounded font-bold text-white mb-8 leading-tight animate-fade-in">
                Esse contrato foi cancelado
              </h1>
              <a
                href="https://wa.me/5548991797296?text=Olá, Duda! Tenho dúvidas sobre meu contrato."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-md inline-flex items-center justify-center gap-2 animate-fade-in"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Entrar em contato
              </a>
            </>
          ) : (
            <>
              <div className="mb-8 animate-fade-in">
                <p className="text-white/90 text-sm md:text-base lg:text-lg tracking-[0.3em] uppercase font-light mb-2">
                  Contrato
                </p>
                <div className="w-24 h-px bg-white/60 mx-auto" />
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-6xl font-unbounded font-bold text-white mb-8 leading-tight animate-fade-in">
                {contrato.clienteNome}
              </h1>

              <div className="animate-fade-in-delay">
                <div className="w-24 h-px bg-white/60 mx-auto mb-4" />
                <p className="text-white/90 text-lg md:text-xl lg:text-2xl tracking-[0.2em] uppercase font-light">
                  Duda Berger
                </p>
                <p className="text-white/70 text-xs md:text-sm tracking-wider mt-2">
                  Conto Atelier de bolos
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Conteúdo Principal - apenas se não for restrito */}
      {!isRestrito && (
        <section ref={targetRef} className="w-full relative overflow-hidden bg-[#d4c4b2] py-16 md:py-24">
          {/* Background Images - Shadow Effect */}
          <div className="absolute inset-0 z-0 opacity-30 hidden lg:block">
            <img 
              src="/images/shadow/shadow-2.webp" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 z-0 opacity-50 lg:hidden">
            <img 
              src="/images/shadow/shadow-2-mobile.webp" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="container mx-auto max-w-5xl px-6 md:px-12 relative z-10">
            {/* Informações do Contrato */}
            <h2 className="text-2xl md:text-3xl font-unbounded font-bold text-[#D65B58] text-center mb-8">
              Resumo do Contrato
            </h2>

            <div className="bg-[#F6EEE1] rounded-xl p-8 md:p-12 shadow-md max-w-3xl mx-auto">
              <div className="space-y-4">
                {/* Data da Cerimônia */}
                {contrato.dataEvento && (
                  <p className="text-sm text-[#5a2a2a]">
                    <span className="font-unbounded text-[#703535]">Data da Cerimônia:</span>{' '}
                    <span className="font-medium text-base">
                      {format(new Date(`${contrato.dataEvento.split('T')[0]}T00:00:00`), "dd/MM/yyyy")}
                    </span>
                  </p>
                )}

                {/* Local */}
                {contrato.localFesta && (
                  <p className="text-[#5a2a2a]">
                    <span className="text-sm font-unbounded text-[#703535]">Local:</span>{' '}
                    <span className="font-medium text-base">
                      {contrato.localFesta}
                    </span>
                  </p>
                )}

                {/* Número de Convidados */}
                {contrato.numeroConvidados && (
                  <p className="text-[#5a2a2a]">
                    <span className="text-sm font-unbounded text-[#703535]">Convidados:</span>{' '}
                    <span className="font-medium text-base">
                      {contrato.numeroConvidados} pessoas
                    </span>
                  </p>
                )}

                {/* Valor Total */}
                <p className="text-[#5a2a2a]">
                  <span className="text-sm font-unbounded text-[#703535]">Valor Total:</span>{' '}
                  <span className="font-medium text-base">
                    R$ {contrato.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </p>

                {/* Separador */}
                {contrato.descricao && <hr className="border-t border-gray-300 my-6" />}

                {/* O Bolo - Descrição */}
                {contrato.descricao && (
                  <div>
                    <p className="font-unbounded text-sm text-[#703535] mb-3">O Bolo</p>
                    <p className="text-base text-[#5a2a2a] leading-relaxed whitespace-pre-wrap">
                      {contrato.descricao}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Seção O Contrato */}
      {!isRestrito && (
        <section className="w-full bg-[#F6EEE1] py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-6 md:px-12">
            <h2 className="fade-in text-2xl md:text-3xl lg:text-4xl font-bold font-unbounded mb-8 text-[#D65B58] mx-auto text-left">
              O Contrato
            </h2>
            
            <div className="space-y-4 text-gray-700 text-base leading-relaxed text-left">
              <p>
                Este contrato de prestação de serviços de confeitaria para evento de casamento estabelece, de forma clara e transparente, as condições para a criação e entrega do bolo que fará parte de um dos momentos mais significativos da história do casal.
              </p>
              
              <p>
                Aqui estão descritos os acordos, responsabilidades e expectativas entre as partes, para que o processo seja conduzido com cuidado, respeito, segurança e confiança.
              </p>
            </div>

            {/* Seção Contratantes */}
            {(contrato.nomeNoiva || contrato.nomeNoivo) && (
              <div className="mt-8 pt-8 border-t border-gray-300">
                <h3 className="text-xl font-unbounded font-bold text-[#D65B58] mb-4">
                  {contrato.nomeNoiva && contrato.nomeNoivo 
                    ? 'Os Contratantes' 
                    : contrato.nomeNoivo 
                      ? 'O Contratante' 
                      : 'A Contratante'}
                </h3>
                <div className="text-gray-700 text-base leading-relaxed">
                  <p>
                    {contrato.nomeNoiva && (
                      <>
                        {contrato.nomeNoiva}
                        {contrato.cpfNoiva && ` (CPF ${contrato.cpfNoiva})`}
                      </>
                    )}
                    {contrato.nomeNoiva && contrato.nomeNoivo && ' e '}
                    {contrato.nomeNoivo && (
                      <>
                        {contrato.nomeNoivo}
                        {contrato.cpfNoivo && ` (CPF ${contrato.cpfNoivo})`}
                      </>
                    )}
                    {contrato.endereco && (
                      <>
                        , {contrato.nomeNoiva && contrato.nomeNoivo ? 'residentes e domiciliados' : 'residente e domiciliado'} na {contrato.endereco}.
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Seção A Contratada */}
            <div className="mt-8">
              <h3 className="text-xl font-unbounded font-bold text-[#D65B58] mb-4">
                A Contratada
              </h3>
              <div className="text-gray-700 text-base leading-relaxed">
                <p>
                  Maria Eduarda Barboza Ribeiro, CNPJ nº 41.479.521/0001-50, residente e domiciliada na Rua Alta Freitas Nauk 700, Garopaba/SC.
                </p>
              </div>
            </div>

            {/* Seção O Objeto */}
            <div className="mt-8 pt-8 border-t border-gray-300">
              <h3 className="text-xl font-unbounded font-bold text-[#D65B58] mb-4">
                O Objeto
              </h3>
              <div className="text-gray-700 text-base leading-relaxed">
                <p>
                  O objeto deste contrato é a criação e entrega de um bolo de casamento desenvolvido de forma artesanal, respeitando o estilo autoral da CONTRATADA e as definições acordadas com{' '}
                  {contrato.nomeNoiva && contrato.nomeNoivo 
                    ? 'os CONTRATANTES' 
                    : contrato.nomeNoivo 
                      ? 'o CONTRATANTE' 
                      : 'a CONTRATANTE'}
                  , conforme especificações descritas a seguir.
                </p>
                
                {contrato.descricao && (
                  <div className="mt-6">
                    <p className="whitespace-pre-wrap">
                      {contrato.descricao}
                    </p>
                  </div>
                )}
                
                <p className="mt-6">
                  Por se tratar de um produto artesanal, eventuais referências visuais apresentadas pela CONTRATANTE servem apenas como inspiração estética, não constituindo reprodução idêntica, respeitando o estilo autoral da CONTRATADA.
                </p>
              </div>
            </div>

            {/* Seção A Montagem e Entrega */}
            <div className="mt-8 pt-8 border-t border-gray-300">
              <h3 className="text-xl font-unbounded font-bold text-[#D65B58] mb-4">
                A Montagem e Entrega
              </h3>
              <div className="text-gray-700 text-base leading-relaxed space-y-4">
                <p>
                  A montagem e a entrega do bolo serão realizadas pela CONTRATADA na data da celebração{' '}
                  {contrato.dataEvento && (
                    <>({format(new Date(`${contrato.dataEvento.split('T')[0]}T00:00:00`), "dd/MM/yyyy", { locale: ptBR })})</>
                  )}
                  , com antecedência mínima de 2 (duas) horas em relação ao início da celebração, salvo ajuste prévio entre as partes.
                </p>
                
                <p>
                  A execução da montagem considera as condições estruturais, logísticas e de acesso previamente informadas pela CONTRATANTE e disponibilizadas pelo local do evento. Situações externas à atuação direta da CONTRATADA — como condições climáticas adversas, limitações de acesso, falhas estruturais do espaço ou instabilidade da mesa, base ou suporte utilizados — poderão impactar a montagem, sem que isso caracterize falha na prestação do serviço.
                </p>
                
                <p>
                  A decoração da mesa e o suporte para a exposição do bolo são definidos e disponibilizados pela CONTRATANTE. Caso seja necessário, a CONTRATADA poderá auxiliar por meio da intermediação da locação de suporte junto a terceiros, mediante repasse dos custos correspondentes. Nessa situação, eventuais condições, prazos, substituições ou limitações relacionadas ao item locado seguem as políticas do fornecedor responsável.
                </p>
                
                <p>
                  Após a finalização da montagem e entrega, o bolo passa a estar sob os cuidados da organização do evento, não sendo possível garantir sua integridade diante de manuseio, deslocamento ou interferência de terceiros.
                </p>
              </div>
            </div>

            {/* Seção O Valor e a Forma de Pagamento */}
            <div className="mt-8 pt-8 border-t border-gray-300">
              <h3 className="text-xl font-unbounded font-bold text-[#D65B58] mb-4">
                O Valor e a Forma de Pagamento
              </h3>
              <div className="text-gray-700 text-base leading-relaxed space-y-4">
                <p>
                  Pelos serviços descritos neste contrato,{' '}
                  {contrato.nomeNoiva && contrato.nomeNoivo 
                    ? 'os CONTRATANTES pagarão' 
                    : 'a CONTRATANTE pagará'}{' '}
                  à CONTRATADA o valor total de R$ {contrato.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({extenso(contrato.valorTotal.toString(), { mode: 'currency' })}).
                </p>
                
                <p>
                  O pagamento poderá ser realizado por uma das seguintes modalidades, à escolha{' '}
                  {contrato.nomeNoiva && contrato.nomeNoivo 
                    ? 'dos CONTRATANTES' 
                    : 'da CONTRATANTE'}:
                </p>
                
                <p>
                  a) Pix, com pagamento integral no ato da assinatura deste contrato. A chave Pix será informada pela CONTRATADA após a formalização do aceite.
                </p>
                
                <p>
                  b) Cartão de crédito, com possibilidade de parcelamento em até 12 (doze) vezes. Nessa modalidade, será aplicado acréscimo de até 20% (vinte por cento) sobre o valor total do contrato, conforme o número de parcelas escolhidas, em razão dos encargos operacionais da transação.
                </p>
                
                <p>
                  O valor final correspondente à forma de pagamento escolhida será informado previamente{' '}
                  {contrato.nomeNoiva && contrato.nomeNoivo 
                    ? 'aos CONTRATANTES' 
                    : 'à CONTRATANTE'}
                  , antes da confirmação do pagamento.
                </p>
                
                <p>
                  A reserva da data do evento somente será efetivada após a assinatura deste contrato e a confirmação do pagamento, independentemente da modalidade escolhida.
                </p>
              </div>
            </div>

            {/* Seção Inadimplemento */}
            <div className="mt-8 pt-8 border-t border-gray-300">
              <h3 className="text-xl font-unbounded font-bold text-[#D65B58] mb-4">
                Inadimplemento
              </h3>
              <div className="text-gray-700 text-base leading-relaxed">
                <p>
                  O descumprimento injustificado de obrigações essenciais previstas neste contrato por qualquer uma das partes acarretará a aplicação de multa equivalente a 40% (quarenta por cento) do valor total contratado.
                </p>
              </div>
            </div>

            {/* Seção Reagendamento */}
            <div className="mt-8 pt-8 border-t border-gray-300">
              <h3 className="text-xl font-unbounded font-bold text-[#D65B58] mb-4">
                Reagendamento
              </h3>
              <div className="text-gray-700 text-base leading-relaxed space-y-4">
                <p>
                  Em caso de necessidade de reagendamento da data do evento por iniciativa{' '}
                  {contrato.nomeNoiva && contrato.nomeNoivo 
                    ? 'dos CONTRATANTES' 
                    : 'da CONTRATANTE'}
                  , a nova data ficará condicionada à disponibilidade de agenda da CONTRATADA.
                </p>
                
                <p>
                  Havendo disponibilidade, os valores contratados poderão ser ajustados conforme a tabela vigente à época do novo evento, considerando eventuais alterações de custos e condições de prestação do serviço.
                </p>
              </div>
            </div>

            {/* Seção Cancelamento */}
            <div className="mt-8 pt-8 border-t border-gray-300">
              <h3 className="text-xl font-unbounded font-bold text-[#D65B58] mb-4">
                Cancelamento
              </h3>
              <div className="text-gray-700 text-base leading-relaxed">
                <p>
                  Após a assinatura deste contrato e a confirmação do pagamento, em caso de cancelamento do evento por iniciativa{' '}
                  {contrato.nomeNoiva && contrato.nomeNoivo 
                    ? 'dos CONTRATANTES' 
                    : 'da CONTRATANTE'}
                  , será aplicada multa compensatória correspondente a 40% (quarenta por cento) do valor total contratado, independentemente dos valores já pagos, a título de compensação pela reserva da data, organização da agenda e preparação do serviço.
                </p>
              </div>
            </div>

            {/* Seção Disposições Finais */}
            <div className="mt-8 pt-8 border-t border-gray-300">
              <h3 className="text-xl font-unbounded font-bold text-[#D65B58] mb-4">
                Disposições Finais
              </h3>
              <div className="text-gray-700 text-base leading-relaxed space-y-4">
                <p>
                  Fica eleito o foro da Comarca de Garopaba/SC para resolver quaisquer questões decorrentes deste contrato.
                </p>
                
                <p>
                  Estando as partes de pleno acordo com os termos aqui estabelecidos, o presente contrato é firmado por meio eletrônico, mediante assinatura digital, para que produza seus efeitos legais na data da confirmação do aceite.
                </p>
              </div>
            </div>

            {/* Data do Contrato */}
            {contrato.dataContrato && (
              <div className="mt-12 text-center text-gray-700 text-base">
                <p>
                  Garopaba, {format(new Date(contrato.dataContrato), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}.
                </p>
              </div>
            )}

            {/* Assinaturas */}
            {(assinaturaNoiva || assinaturaNoivo) && (
              <div className={`mt-16 grid gap-12 ${assinaturaNoiva && assinaturaNoivo ? 'md:grid-cols-2' : 'max-w-md mx-auto'}`}>
                {/* Assinatura Noiva */}
                {assinaturaNoiva && contrato.nomeNoiva && (
                  <div className="space-y-4">
                    <div className="border-b border-gray-300 pb-4 flex items-center justify-center">
                      <img 
                        src={assinaturaNoiva} 
                        alt="Assinatura Noiva" 
                        className="h-24 w-auto object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-800">{contrato.nomeNoiva}</p>
                      {contrato.cpfNoiva && (
                        <p className="text-sm text-gray-600">CPF: {contrato.cpfNoiva}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Assinatura Noivo */}
                {assinaturaNoivo && contrato.nomeNoivo && (
                  <div className="space-y-4">
                    <div className="border-b border-gray-300 pb-4 flex items-center justify-center">
                      <img 
                        src={assinaturaNoivo} 
                        alt="Assinatura Noivo" 
                        className="h-24 w-auto object-contain"
                      />
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-gray-800">{contrato.nomeNoivo}</p>
                      {contrato.cpfNoivo && (
                        <p className="text-sm text-gray-600">CPF: {contrato.cpfNoivo}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Assinatura da Contratada */}
            <div className="mt-16 max-w-md mx-auto">
              <div className="space-y-4">
                <div className="border-b border-gray-300 pb-4 text-center">
                  <img 
                    src="/images/contratos/assinatura-duda.png" 
                    alt="Assinatura Maria Eduarda Barboza Ribeiro"
                    className="h-24 w-auto mx-auto object-contain"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-800">Maria Eduarda Barboza Ribeiro</p>
                  <p className="text-sm text-gray-600">CNPJ: 59.138.056/0001-50</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      </div>

      {/* Botão Flutuante - Assinar ou Baixar Contrato */}
      {isValidated && contrato && (
        <>
          {assinaturaNoiva || assinaturaNoivo ? (
            // Temporariamente oculto - aguardando ajustes no PDF
            null
            // <button
            //   onClick={handleDownloadPDF}
            //   disabled={isGeneratingPDF}
            //   className="fixed bottom-8 right-8 btn-primary-sm shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 z-50 disabled:opacity-50 disabled:cursor-not-allowed"
            // >
            //   {isGeneratingPDF ? 'Gerando PDF...' : 'Baixar Contrato'}
            //   <Download className="w-4 h-4" />
            // </button>
          ) : (
            <button
              onClick={() => setShowSignerDialog(true)}
              className="fixed bottom-8 right-8 btn-primary-sm shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 z-50"
            >
              Assinar Contrato
              <PenTool className="w-4 h-4 -scale-x-100" />
            </button>
          )}
        </>
      )}

      {/* Dialog - Escolher Assinante */}
      {showSignerDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#F6EEE1] rounded-lg p-8 max-w-md w-full mx-4 shadow-2xl relative">
            <button
              onClick={() => setShowSignerDialog(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h3 className="text-2xl font-unbounded font-bold text-[#D65B58] mb-6">
              Quem vai assinar?
            </h3>
            <div className="space-y-3">
              {contrato.nomeNoiva && (
                <button
                  onClick={() => {
                    setSelectedSigner('noiva');
                    setShowSignerDialog(false);
                    setShowSignaturePanel(true);
                    setSignatureMakerKey(prev => prev + 1);
                  }}
                  className="w-full btn-primary-md-outline text-center px-6 py-4"
                >
                  {contrato.nomeNoiva}
                </button>
              )}
              {contrato.nomeNoivo && (
                <button
                  onClick={() => {
                    setSelectedSigner('noivo');
                    setShowSignerDialog(false);
                    setShowSignaturePanel(true);
                    setSignatureMakerKey(prev => prev + 1);
                  }}
                  className="w-full btn-primary-md-outline text-center px-6 py-4"
                >
                  {contrato.nomeNoivo}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Painel de Assinatura */}
      {showSignaturePanel && selectedSigner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#F6EEE1] rounded-lg p-8 max-w-4xl w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-unbounded font-bold text-[#D65B58]">
                Assinatura - {selectedSigner === 'noiva' ? contrato.nomeNoiva : contrato.nomeNoivo}
              </h3>
              <button
                onClick={() => {
                  setShowSignaturePanel(false);
                  setSelectedSigner(null);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                ×
              </button>
            </div>
            
            <div className="rounded-lg overflow-hidden">
              <style suppressHydrationWarning>{`
                [data-target="typeButtonsContainer"] {
                  display: none !important;
                }
                [data-target="drawColorsContainer"],
                [data-target="colorsContainer"],
                [data-target="colorSelect"],
                input[type="color"],
                input[data-target="colorInput"] {
                  display: none !important;
                }
                [data-target="controlButtonsContainer"] {
                  display: flex !important;
                  align-items: center !important;
                  justify-content: flex-start !important;
                  gap: 0.5rem !important;
                  margin: 1rem 0 !important;
                  flex-wrap: nowrap !important;
                  width: 100% !important;
                  padding: 0 !important;
                }
                [data-target="controlButtonsContainer"] > div,
                [data-target="controlButtonsContainer"] > span {
                  display: flex !important;
                  gap: 0.5rem !important;
                  width: auto !important;
                  flex-shrink: 0 !important;
                  margin: 0 !important;
                  padding: 0 !important;
                }
                [data-target="saveButton"] {
                  display: inline-flex !important;
                  width: auto !important;
                  margin: 0 !important;
                  margin-left: auto !important;
                  background-color: #D65B58 !important;
                  color: white !important;
                  border: none !important;
                  border-radius: 9999px !important;
                  padding: .5rem 1rem !important;
                    font-size: .75rem !important;   
                    line-height: 1rem !important;
                  font-weight: 500 !important;
                  text-transform: none !important;
                  height: auto !important;
                  cursor: pointer !important;
                  flex-shrink: 0 !important;
                  gap: 0 !important;
                }
                [data-target="saveButton"]:hover:not(:disabled) {
                  background-color: #b84a47 !important;
                }
                [data-target="saveButton"]:disabled {
                  background-color: #F6ADA9 !important;
                  color: #fff !important;
                  cursor: not-allowed !important;
                  opacity: 0.6 !important;
                }
                [data-target="saveButton"] span {
                  display: none !important;
                }
                [data-target="saveButton"]::before {
                  content: 'Assinar' !important;
                }
                [data-target="saveButton"]::after {
                  content: '' !important;
                  display: inline-block !important;
                  width: 1rem !important;
                  height: 1rem !important;
                  margin-left: 0.5rem !important;
                  background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg>') !important;
                  background-size: contain !important;
                  background-repeat: no-repeat !important;
                  background-position: center !important;
                  transform: scaleX(-1) !important;
                }
                [data-target="undoButton"],
                [data-target="clearButton"] {
                  color: #703535 !important;
                  background-color: transparent !important;
                  border: 1px solid #703535 !important;
                  border-radius: 9999px !important;
                  padding: .5rem 1rem !important;
                    font-size: .75rem !important;   
                    line-height: 1rem !important;
                  font-weight: 500 !important;
                  text-transform: none !important;
                  height: auto !important;
                  gap: 0 !important;
                }
                [data-target="undoButton"]:hover,
                [data-target="clearButton"]:hover {
                    color: #fff !important;
                    background-color: #703535 !important;
                    border-color: #703535 !important;
                    padding: .5rem 1rem !important;
                    font-size: .75rem !important;
                    line-height: 1rem !important;
                }
                [data-target="undoButton"] span {
                  display: none !important;
                }
                [data-target="undoButton"]::after {
                  content: 'Desfazer' !important;
                  margin-left: 0.5rem;
                }
                [data-target="clearButton"] span {
                  display: none !important;
                }
                [data-target="clearButton"]::after {
                  content: 'Limpar' !important;
                  margin-left: 0.5rem;
                }
              `}</style>
              <SignatureMaker
                key={`signature-${signatureMakerKey}`}
                onSave={async (data) => {
                  // A biblioteca retorna um objeto, precisamos extrair o base64
                  let base64Signature = '';
                  if (typeof data === 'string') {
                    base64Signature = data;
                  } else if (data && typeof data === 'object' && 'base64' in data) {
                    base64Signature = (data as any).base64;
                  }
                  
                  // Salvar assinatura baseado no signatário selecionado
                  if (selectedSigner === 'noiva') {
                    setAssinaturaNoiva(base64Signature);
                  } else if (selectedSigner === 'noivo') {
                    setAssinaturaNoivo(base64Signature);
                  }
                  
                  // Salvar no Supabase
                  if (supabase && contrato) {
                    try {
                      const updateData = selectedSigner === 'noiva' 
                        ? { assinatura_noiva: base64Signature }
                        : { assinatura_noivo: base64Signature };
                      
                      const { error } = await (supabase as any)
                        .from('contratos')
                        .update(updateData)
                        .eq('slug', slug);
                      
                      if (error) {
                        console.error('❌ Erro ao salvar assinatura:', error);
                      }
                    } catch (err) {
                      console.error('💥 Erro ao salvar assinatura no Supabase:', err);
                    }
                  }
                  
                  // Recarregar página para mostrar assinatura e evitar erros de cleanup
                  window.location.reload();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
