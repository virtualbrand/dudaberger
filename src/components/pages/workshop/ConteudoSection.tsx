"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation"

// ========================================
// CONTEUDO WORKSHOP SECTION
// ========================================

interface ModuloData {
  id: string;
  title: string;
  day: number;
  description: string;
}

const modulosWorkshop: ModuloData[] = [
  {
    id: "modulo-1",
    title: "Produto - O que vender primeiro",
    day: 1,
    description: "Descubra o erro fatal que 90% das confeiteiras iniciantes cometem ao escolher o que vender. Vou te mostrar por que bolos de aniversário são estratégicos e como posicionar seu produto para vender desde o início - mesmo sem portfólio ou seguidores.",
  },
  {
    id: "modulo-2",
    title: "Lucro - Precificação que gera resultado",
    day: 1,
    description: "O método exato para calcular preços que garantem lucro real em cada venda. Você vai descobrir onde está perdendo dinheiro agora e como corrigir isso imediatamente - sem ficar mais cara que a concorrência nem trabalhar de graça.",
  },
  {
    id: "modulo-3",
    title: "Venda - Onde encontrar clientes",
    day: 1,
    description: "As 3 estratégias práticas que me geraram os primeiros 16 pedidos numa cidade onde não conhecia ninguém. Você vai aprender exatamente onde estar, o que falar e como atrair clientes qualificados - sem depender de seguidores.",
  },
  {
    id: "modulo-4",
    title: "Cardápio + primeiras vendas",
    day: 2,
    description: "Monte seu cardápio inicial com sabores, tamanhos e preços definidos. Você vai sair com mensagens prontas, locais mapeados e ações específicas para conseguir seus 10 primeiros pedidos em 30 dias - tudo pronto para aplicar na segunda-feira seguinte.",
  },
  {
    id: "modulo-5",
    title: "Rotina de produção caseira",
    day: 2,
    description: "Organize sua agenda de produção adaptada à sua realidade - com filhos, outro trabalho ou tempo limitado. Você vai estruturar compras, preparos e entregas num cronograma simples que evita desperdício, caos e estresse.",
  },
  {
    id: "modulo-6",
    title: "Plano de crescimento",
    day: 2,
    description: "O mapa completo com metas semanais e mensais para escalar de forma sustentável. Você vai saber exatamente o que fazer em cada fase do crescimento - com lista de equipamentos essenciais por etapa e quando investir em cada melhoria.",
  }
]

export const ConteudoSection = () => {
  useScrollAnimation();
  
  return (
    <section className="px-6 md:px-8 py-16 md:py-30 bg-[#F6EEE1]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-center text-3xl md:text-4xl font-bold fade-in text-[#D65B58]">
            O que você vai aprender no Workshop
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm md:text-base text-gray-600 fade-in">
            Tudo que você precisa saber sobre produto, precificação e vendas para faturar da sua cozinha
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {modulosWorkshop.map((modulo) => (
            <div
              key={modulo.id}
              role="article"
              aria-labelledby={`card-${modulo.id}-title`}
              aria-describedby={`card-${modulo.id}-content`}
              className="border border-gray-200 rounded-2xl p-6 pb-12 shadow-sm hover:shadow-md transition-shadow duration-300 bg-[#F6EEE1]"
            >
              <div className="flex flex-col space-y-4 h-full">
                <div className="flex items-center justify-between">
                  <span className="text-xs md:text-sm font-semibold px-4 py-1 rounded-full fade-in" style={{ color: '#C9184A', backgroundColor: 'rgba(201, 24, 74, 0.1)' }}>
                    Dia {modulo.day}
                  </span>
                </div>
                
                <div className="flex-1 flex flex-col fade-in">
                  <h3 
                    id={`card-${modulo.id}-title`}
                    className="text-xl lg:text-2xl font-bold mb-3 leading-tight"
                    style={{ color: '#C9184A' }}
                  >
                    {modulo.title}
                  </h3>
                  <p 
                    id={`card-${modulo.id}-content`}
                    className="text-sm md:text-base text-gray-600 leading-relaxed"
                  >
                    {modulo.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default ConteudoSection;