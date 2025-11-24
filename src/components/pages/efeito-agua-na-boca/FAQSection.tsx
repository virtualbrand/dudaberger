import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    id: 'item-1',
    question: "Como o Efeito Água na Boca vai melhorar minhas fotos de confeitaria?",
    answer: "O Efeito Água na Boca foi desenvolvido especificamente para despertar o desejo de comer através da foto. Nossos presets realçam cores, texturas e detalhes dos doces de forma científica, ajustando automaticamente iluminação, saturação e contraste para que seus doces tenham aquela aparência irresistível que faz o cliente querer provar só de ver a imagem."
  },
  {
    id: 'item-2',
    question: "Não tenho conhecimento sobre edição de fotos. Consigo aplicar o Efeito Água na Boca?",
    answer: "Sim! O Efeito Água na Boca foi criado justamente para quem não entende de edição. São apenas 3 cliques: abrir a foto, escolher o preset e aplicar. Incluímos tutoriais e uma aula de edição para você saber exatamente onde clicar."
  },
  {
    id: 'item-3',
    question: "Preciso pagar o Lightroom para usar o Efeito Água na Boca?",
    answer: "Não! A versão 100% gratuita funciona perfeitamente com nossos presets. Você não paga nada por mês, não tem assinatura, não tem pegadinha. Baixa uma vez e usa para sempre, sem custos adicionais."
  },
  {
    id: 'item-4',
    question: "Preciso de uma câmera profissional para ativar o Efeito Água na Boca?",
    answer: "Absolutamente não! Eu mesmo uso apenas o celular para todas as minhas fotos e elas ficam com qualidade profissional. O Efeito Água na Boca foi criado especificamente para celular - é onde funciona melhor! O segredo não está no equipamento, mas em aplicar os presets certos que despertam o desejo. Com seu celular + nossos presets, suas fotos vão competir de igual para igual com quem tem equipamentos caros."
  },
  {
    id: 'item-5',
    question: "A câmera do meu celular não é muito boa. Consigo criar o Efeito Água na Boca?",
    answer: "Sim! Nossos presets foram testados em celulares básicos e sempre funcionam. O Efeito Água na Boca compensa as limitações da câmera realçando cores, texturas e brilho de forma automática. Você vai se surpreender como seus doces vão ficar apetitosos mesmo com um celular simples."
  },
  {
    id: 'item-6',
    question: "Não sei tirar boas fotos. Vou conseguir fazer meus doces despertarem desejo?",
    answer: "Com certeza! O Efeito Água na Boca transforma até fotos básicas em imagens irresistíveis."
  },
  {
    id: 'item-7',
    question: "Por quanto tempo posso usar o Efeito Água na Boca?",
    answer: "Acesso vitalício! Uma vez que você adquire, pode usar os presets quantas vezes quiser, em quantas fotos quiser, pelo tempo que quiser. É seu para sempre, sem renovações ou taxas adicionais."
  },
  {
    id: 'item-8',
    question: "Posso compartilhar ou revender o Efeito Água na Boca?",
    answer: "Os presets são para uso pessoal apenas. Você pode usar em todas as suas fotos de confeitaria, mas não pode compartilhar, revender ou distribuir os presets para outras pessoas. Isso protege o trabalho desenvolvido e mantém a exclusividade do método."
  }
]

export const FAQSection = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-4xl px-6">
        <div className="space-y-12">
          <h2 className="text-primary-700 text-center text-4xl font-semibold scroll-fade-in">
            Dúvidas Frequentes
          </h2>

          <div className="scroll-fade-in">
            <Accordion
              type="single"
              collapsible
              className="-mx-2 sm:mx-0"
            >
              {faqs.map((item) => (
                <div className="group scroll-fade-in" key={item.id}>
                  <AccordionItem
                    value={item.id}
                    className="peer rounded-xl border-none px-5 py-1 md:px-7 data-[state=open]:bg-gray-50"
                  >
                    <AccordionTrigger className="cursor-pointer text-base hover:no-underline text-left !text-black font-semibold">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-foreground text-left">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                  <hr className="mx-5 -mb-px group-last:hidden peer-data-[state=open]:hidden md:mx-7 border-gray-200" />
                </div>
              ))}
            </Accordion>
          </div>

          <p className="text-muted-foreground text-center scroll-fade-in">
            Não encontrou o que procura? Entre em contato com nosso{' '}
            <a
              href="https://wa.link/n3h6vu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
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
