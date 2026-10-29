import { CalendarClock, CreditCard, FileText, Sparkles } from 'lucide-react'
import { SectionHeading } from '../SectionHeading'

const differentials = [
  {
    icon: FileText,
    title: 'Nota Fiscal em todo serviço',
    text: 'Faturamento para empresas, condomínios e hotéis, com documentação pronta para a contabilidade.',
  },
  {
    icon: CreditCard,
    title: 'Pix, cartão ou dinheiro',
    text: 'Condições de pagamento combinadas no orçamento, sem surpresa no fechamento.',
  },
  {
    icon: CalendarClock,
    title: 'Prazo combinado, prazo entregue',
    text: 'Cronograma por etapa, alinhado com a rotina do morador ou da operação do cliente.',
  },
  {
    icon: Sparkles,
    title: 'Obra limpa e organizada',
    text: 'Proteção de pisos e móveis durante o serviço e limpeza completa na entrega.',
  },
]

export function Differentials() {
  return (
    <section id="diferenciais" className="relative overflow-hidden bg-navy-800 py-16 text-white md:py-20">
      <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          tone="dark"
          eyebrow="Residencial e corporativo"
          title="O que o cliente recebe além do acabamento"
        />

        <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {differentials.map(({ icon: Icon, title, text }) => (
            <div key={title} className="bg-navy-800 p-6">
              <Icon className="size-7 text-steel-400" />
              <h3 className="mt-4 font-display font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-100/75">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
