import { cn } from "@/lib/utils";
import {
  IconGift,
  IconCalculator,
  IconTarget,
  IconChecklist,
  IconTrendingUp,
  IconTools,
} from "@tabler/icons-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export function HowToSection() {
  useScrollAnimation();
  const features = [
    {
      title: "O que vender primeiro",
      description:
        "Descubra por que bolos de aniversário são o caminho mais rápido para faturar bem começando do zero.",
      icon: <IconGift />,
    },
    {
      title: "Como precificar corretamente",
      description:
        "Calcule preços que garantem lucro real - sem trabalhar de graça nem perder clientes por valor alto.",
      icon: <IconCalculator />,
    },
    {
      title: "Onde encontrar seus clientes",
      description:
        "Estratégias práticas para conseguir pedidos mesmo sem seguidores, sem networking e em cidade pequena.",
      icon: <IconTarget />,
    },
    {
      title: "Organização que funciona",
      description:
        "O método de produção caseira que me permitiu entregar 16 bolos no primeiro mês sem equipe.",
      icon: <IconChecklist />,
    },
    {
      title: "De R$ 0 a R$ 5 mil/mês",
      description:
        "A estratégia validada que me levou do zero absoluto a R$ 5.000 /mês trabalhando de casa.",
      icon: <IconTrendingUp />,
    },
    {
      title: "Comece com o que você tem",
      description:
        "Lista exata do que é essencial para começar - sem gastar fortunas em equipamentos que você não precisa agora.",
      icon: <IconTools />,
    },
  ];

  return (
    <section className="w-full bg-white pt-20 pb-40">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mt-16 mb-2">
          <h2 className="fade-in text-2xl md:text-3xl lg:text-4xl font-bold !text-[var(--color-amaranth-500)] mb-4">
            Como você vai sair do ZERO e chegar aos R$ 5.000/mês
          </h2>
          <p className="fade-in text-lg text-[var(--color-primary-500)] max-w-3xl mx-auto">
            O método exato que me levou de caixinha de leite condensado como espátula a um negócio de 6 dígitos /ano - testado e validado numa cidade de 30 mil habitantes
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
        "border-r border-rose-200 dark:border-rose-500",
        // Bordas esquerdas: primeiro item de cada linha
        "border-l border-rose-200 dark:border-rose-500 md:[&:nth-child(2n-1)]:border-l lg:[&:nth-child(3n-2)]:border-l",
        // Bordas inferiores: todos exceto a última linha
        "border-b border-rose-200 dark:border-rose-500",
        // Remove borda inferior da última linha no mobile
        "last:border-b-0",
        // Remove borda inferior da última linha no tablet (últimos 2 itens)
        "md:[&:nth-last-child(-n+2)]:border-b-0",
        // Remove borda inferior da última linha no desktop (últimos 3 itens)
        "lg:[&:nth-last-child(-n+3)]:border-b-0"
      )}
    >
      {index < 3 && (
        <div className="opacity-0 group-hover/feature:opacity-20 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-rose-500 to-transparent pointer-events-none" />
      )}
      {index >= 3 && (
        <div className="opacity-0 group-hover/feature:opacity-20 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-rose-500 to-transparent pointer-events-none" />
      )}
      <div className="fade-in mb-4 relative z-10 px-12 text-[var(--color-amaranth-500)]">
        {icon}
      </div>
      <div className="fade-in text-xl font-bold mb-2 relative z-10 px-12">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-[var(--color-amaranth-500)] dark:bg-[var(--color-amaranth-500)] group-hover/feature:bg-rose-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block !text-[var(--color-amaranth-500)] dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="fade-in text-base !text-[var(--color-primary-500)] dark:text-neutral-300 max-w-sm relative z-10 px-12">
        {description}
      </p>
    </div>
  );
};