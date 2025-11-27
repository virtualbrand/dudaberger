"use client";

import { cn } from "@/lib/utils";
import {
  Gift,
  Calculator,
  Target,
  CheckSquare,
  TrendingUp,
  Wrench,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function HowToSection() {
  useScrollAnimation();
  const features = [
    {
      title: "O que vender primeiro",
      description:
        "Descubra por que bolos de aniversário são o caminho mais rápido para faturar bem começando do zero.",
      icon: <Gift />,
    },
    {
      title: "Como precificar corretamente",
      description:
        "Calcule preços que garantem lucro real - sem trabalhar de graça nem perder clientes por valor alto.",
      icon: <Calculator />,
    },
    {
      title: "Como encontrar clientes",
      description:
        "Estratégias práticas para conseguir pedidos e fazer os clientes virem até você.",
      icon: <Target />,
    },
    {
      title: "Seu espaço único",
      description:
        "Como definir o seu diferencial único e ser valorizada como confeiteira em sua cidade",
      icon: <CheckSquare />,
    },
    {
      title: "De R$ 0 a R$ 10 mil/mês",
      description:
        "A estratégia validada que me levou do zero absoluto a R$ 10.000 /mês trabalhando de casa.",
      icon: <TrendingUp />,
    },
    {
      title: "Comece com o que você tem",
      description:
        "Plano de ação de como divulgar seu produto de forma prática, eficiente e consistente.",
      icon: <Wrench />,
    },
  ];

  return (
    <section className="w-full pt-20 pb-40 bg-[#F6EEE1]">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mt-16 mb-2">
          <h2 className="fade-in text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-[#D65B58]">
            O que você vai aprender no Workshop
          </h2>
          <p className="fade-in text-lg mx-auto text-[#23060E]">
            Tudo que você precisa saber sobre produto, precificação e vendas para faturar da sua cozinha
          </p>
        </div>
        <HowToFeatures features={features} />
      </div>
    </section>
  );
}

function HowToFeatures({ features }: { features: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <HowToFeature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const HowToFeature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col py-10 relative group/feature",
        // Bordas direitas: todos os itens
        "border-r border-[#d4afaf]",
        // Bordas esquerdas: primeiro item de cada linha
        "border-l border-[#d4afaf] md:[&:nth-child(2n-1)]:border-l lg:[&:nth-child(3n-2)]:border-l",
        // Bordas inferiores: todos exceto a última linha
        "border-b border-[#d4afaf]",
        // Remove borda inferior da última linha no mobile
        "last:border-b-0",
        // Remove borda inferior da última linha no tablet (últimos 2 itens)
        "md:[&:nth-last-child(-n+2)]:border-b-0",
        // Remove borda inferior da última linha no desktop (últimos 3 itens)
        "lg:[&:nth-last-child(-n+3)]:border-b-0"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-[#e5d5c3] to-[#F6EEE1] pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-[#e5d5c3] to-[#F6EEE1] pointer-events-none" />
      )}
      <div className="fade-in mb-4 relative z-10 px-12 text-[#b17878]">
        {icon}
      </div>
      <div className="fade-in text-base md:text-lg lg:text-xl font-bold font-unbounded mb-2 relative z-10 px-12">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full group-hover/feature:bg-[#D65B58] transition-all duration-200 origin-center bg-[#D65B58]" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block dark:text-neutral-100 font-unbounded !text-[#703535]">
          {title}
        </span>
      </div>
      <p className="fade-in text-base dark:text-neutral-300 max-w-sm relative z-10 px-12" style={{ color: '#23060E' }}>
        {description}
      </p>
    </div>
  );
};