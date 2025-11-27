"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useScrollAnimation } from "@/hooks/useScrollAnimation"

const faqs = [
  {
    id: 'item-1',
    question: "Estou começando do zero, consigo aproveitar?",
    answer: "Sim, com certeza!\n\nEste workshop foi pensado especialmente para quem está começando. Nos dois dias vamos passar por etapas iniciais essenciais: escolher o que vender, aprender a precificar corretamente e entender como divulgar seus bolos de forma estratégica.\n\nVocê vai sair com um plano prático de 30 dias para colocar em ação imediatamente."
  },
  {
    id: 'item-2',
    question: "Como saber se é pra mim?",
    answer: "Se você quer transformar sua habilidade de fazer bolos em renda extra de R$ 10.000/mês trabalhando da cozinha de casa, este workshop é para você.\n\nVamos proporcionar uma experiência prática onde você vai descobrir exatamente o que vender, como precificar para ter lucro real e as melhores formas de divulgar - mesmo que ainda esteja na CLT.\n\nSe esses objetivos estão alinhados com o que você procura, este workshop é definitivamente para você."
  },
  {
    id: 'item-3',
    question: "Vão me vender algo durante o Workshop ou é 100% conteúdo?",
    answer: "Sim, vamos te oferecer uma oportunidade.\n\nDurante os 2 dias, você terá acesso a conteúdo completo e prático ao vivo através do Zoom. No final do workshop, vou apresentar o Método RENDA completo - meu curso de 5 módulos para quem quer ir além dos primeiros R$ 10.000/mês de forma estruturada. \n\nMas isso não compromete o valor do workshop: você vai sair com aprendizados práticos, planilhas, templates e um plano de ação para executar imediatamente, independente de qualquer outra decisão."
  },
  {
    id: 'item-4',
    question: "Vai ficar gravado?",
    answer: "Sim, mas o ingresso do evento ao vivo não dá acesso às gravações.\n\nVocê poderá adquirir separadamente as gravações dos 2 dias de evento durante a compra do seu ingresso para o evento ao vivo! O preço das gravações é de R$ 247 à vista ou em até 12x de R$ 34,32. E ela pode ser comprada juntamente com o seu ingresso para o evento ao vivo.\n\nSe precisar de ajuda, pode falar com nosso time de suporte, chamando o Jaisson no WhatsApp!"
  },
  {
    id: 'item-5',
    question: "Posso desistir do meu ingresso?",
    answer: "Sim! O workshop tem prazo de garantia, mas por ser um evento ao vivo, as regras são um pouco diferentes. Você pode solicitar o reembolso do seu ingresso em até 7 dias após a compra, desde que isso seja feito com pelo menos 48 horas de antecedência ao início do evento.\n\nApós esse período (ou se faltarem menos de 48 horas para o evento), não será possível solicitar o reembolso.\n\nSe tiver qualquer dúvida, entre em contato com nosso suporte!"
  },
  {
    id: 'item-6',
    question: "Preciso de algum conhecimento prévio?",
    answer: "Não, nenhum conhecimento prévio é necessário. O workshop é estruturado para quem está começando do zero.\n\nVamos abordar desde os conceitos básicos até estratégias práticas que você pode implementar imediatamente. Se você sabe fazer bolos e quer transformar isso em renda, já tem tudo que precisa para aproveitar ao máximo."
  },
  {
    id: 'item-7',
    question: "Quanto tempo preciso dedicar após o workshop?",
    answer: "O workshop entrega um plano de ação para os primeiros 30 dias.\n\nA ideia é que você consiga implementar trabalhando 10-15 horas por semana, perfeitamente conciliável com sua CLT.\n\nO foco é eficiência: fazer o certo, não fazer muito. Você vai aprender a organizar sua agenda para que a confeitaria caiba na sua rotina, não o contrário."
  },
  {
    id: 'item-8',
    question: "Vou receber algum material de apoio?",
    answer: "Sim! Durante o workshop você vai receber: Planilha de precificação, Template de pesquisa de mercado, Scripts de WhatsApp prontos, Checklist dos primeiros 30 dias, Lista de fornecedores, Guia de embalagens. Tudo pronto para você usar imediatamente após o workshop."
  }
]

export const FAQSection = () => {
  useScrollAnimation();
  
  return (
    <section className="py-16 md:py-24 bg-[#fbf7ef]">
      <div className="mx-auto max-w-4xl px-6">
        <div className="space-y-12">
          <h2 
            className="text-center text-4xl font-semibold fade-in text-[#D65B58]"
          >
            Dúvidas Frequentes
          </h2>

          <Accordion
              type="single"
              collapsible
              className="-mx-2 sm:mx-0"
            >
              {faqs.map((item) => (
                <div
                  className="group"
                  key={item.id}
                >
                  <AccordionItem
                    value={item.id}
                    className="peer rounded-xl border-none px-5 py-1 md:px-7 data-[state=open]:bg-[#fefdfb] data-[state=open]:shadow-sm fade-in"
                  >
                    <AccordionTrigger className="cursor-pointer text-lg hover:no-underline text-left font-semibold text-[#703535]">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-foreground text-left text-base whitespace-pre-line">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                  <hr className="mx-5 -mb-px group-last:hidden peer-data-[state=open]:hidden md:mx-7 border-[#e8d4d4]" />
                </div>
              ))}
            </Accordion>

          <p 
            className="text-muted-foreground text-center fade-in"
          >
            Não encontrou o que procura? Entre em contato com nosso{' '}
            <a
              href="https://wa.link/aoej6s"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline cursor-pointer"
            >
              suporte
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
