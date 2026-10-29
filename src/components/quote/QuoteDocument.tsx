import type { ReactNode } from 'react'
import type { QuoteData } from '../../types/quote'
import type { ScopeSection } from '../../utils/quoteParser'
import { business } from '../../config/business'
import { materialScopes } from '../../config/quote'
import { describeTaxId, formatDateBR } from '../../utils/format'
import { LogoJ2G } from '../LogoJ2G'

type QuoteDocumentProps = {
  quote: QuoteData
  sections: ScopeSection[]
}

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="text-[10px] font-semibold tracking-[0.12em] text-slate-500 uppercase">{label}</dt>
      <dd className="mt-0.5 font-medium text-slate-900">{children}</dd>
    </div>
  )
}

function numberSections(sections: ScopeSection[]) {
  let offset = 0
  return sections.map((section) => {
    const start = offset
    offset += section.items.length
    return { ...section, start }
  })
}

export function QuoteDocument({ quote, sections }: QuoteDocumentProps) {
  const materials = materialScopes[quote.materialScope]
  const taxId = quote.clientDocument.trim() ? describeTaxId(quote.clientDocument) : null
  const numbered = numberSections(sections)

  return (
    <article className="flex min-h-[273mm] flex-col text-[12.5px] leading-relaxed text-slate-700 print:min-h-0">
      <header className="flex items-center justify-between gap-6 rounded-md bg-navy-800 px-7 py-5 text-white">
        <LogoJ2G className="h-[86px] w-auto shrink-0" />
        <div className="text-right">
          <p className="font-display text-[24px] font-extrabold tracking-[0.14em]">ORÇAMENTO</p>
          <p className="mt-1 text-[12px] text-white/75 tabular-nums">Nº {quote.number || '—'}</p>
        </div>
      </header>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-b border-slate-200 px-1 pb-3 text-[11.5px] text-slate-500">
        <span>
          <strong className="font-semibold text-navy-900">{business.owner}</strong> · {business.name}
        </span>
        <span>WhatsApp {business.whatsapp.display}</span>
        <span>Instagram {business.instagram.handle}</span>
      </div>

      <dl className="mt-5 grid grid-cols-[1fr_auto_auto] gap-x-8 gap-y-3 rounded-md border border-[#E2E8F0] bg-[#F8FAFC] px-5 py-4">
        <InfoRow label="Cliente">{quote.clientName.trim() || '—'}</InfoRow>
        <InfoRow label="Data">{formatDateBR(quote.date) || '—'}</InfoRow>
        <InfoRow label="Validade">{quote.validity.trim() || '—'}</InfoRow>
        {taxId && <InfoRow label={taxId.label}>{taxId.value}</InfoRow>}
        {quote.siteAddress.trim() && (
          <div className={taxId ? 'col-span-2' : 'col-span-3'}>
            <InfoRow label="Local da obra">{quote.siteAddress.trim()}</InfoRow>
          </div>
        )}
      </dl>

      <section className="mt-7">
        <div className="flex items-end justify-between gap-4 border-b-2 border-navy-800 pb-2">
          <h2 className="font-display text-[13px] font-bold tracking-[0.14em] text-navy-900 uppercase">
            Descrição dos serviços
          </h2>
          <span className="rounded bg-navy-50 px-2 py-0.5 text-[11px] font-semibold text-navy-800">
            {materials.label}
          </span>
        </div>

        {numbered.length === 0 ? (
          <p className="py-10 text-center text-slate-400">Os serviços colados no painel aparecem aqui.</p>
        ) : (
          numbered.map((section, index) => (
            <div key={`${section.title ?? 'geral'}-${index}`}>
              {section.title && (
                <h3 className="mt-4 rounded-sm bg-slate-100 px-3 py-1.5 text-[11.5px] font-bold tracking-wide text-navy-900 uppercase break-after-avoid">
                  {section.title}
                </h3>
              )}
              <ol>
                {section.items.map((item, itemIndex) => (
                  <li
                    key={`${section.start + itemIndex}-${item}`}
                    className="flex gap-4 border-b border-slate-100 px-3 py-2 break-inside-avoid"
                  >
                    <span className="w-5 shrink-0 font-semibold text-navy-800 tabular-nums">
                      {String(section.start + itemIndex + 1).padStart(2, '0')}
                    </span>
                    <span className="text-slate-800">{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))
        )}

        <p className="mt-3 px-3 text-[11.5px] text-slate-600">
          <strong className="font-semibold text-navy-900">Materiais:</strong> {materials.label} — {materials.detail.toLowerCase()}.
        </p>
      </section>

      {quote.notes.trim() && (
        <section className="mt-6 break-inside-avoid">
          <h2 className="font-display text-[11px] font-bold tracking-[0.14em] text-navy-900 uppercase">Observações</h2>
          <p className="mt-1.5 whitespace-pre-line text-slate-700">{quote.notes.trim()}</p>
        </section>
      )}

      <section className="mt-7 grid grid-cols-[1fr_1.15fr] overflow-hidden rounded-md border-2 border-navy-800 break-inside-avoid">
        <div className="flex flex-col justify-center bg-navy-800 px-6 py-5 text-white">
          <p className="text-[10.5px] font-semibold tracking-[0.16em] text-white/75 uppercase">Valor total do investimento</p>
          <p className="mt-1.5 font-display text-[28px] leading-tight font-extrabold tabular-nums">
            {quote.total ? `R$ ${quote.total}` : 'A definir'}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-x-5 gap-y-3 px-5 py-4">
          <InfoRow label="Pagamento">{quote.paymentTerms.trim() || 'A combinar'}</InfoRow>
          <InfoRow label="Prazo de execução">{quote.deadline.trim() || 'A combinar'}</InfoRow>
          <div className="col-span-2">
            <InfoRow label="Formas aceitas">{business.paymentMethods.join(' · ')}</InfoRow>
          </div>
        </dl>
      </section>

      <footer className="mt-auto pt-20 text-center break-inside-avoid print:pt-16">
        <div className="mx-auto w-80 border-t border-slate-400 pt-2">
          <p className="font-semibold text-navy-900">
            {business.owner} — {business.name}
          </p>
        </div>
        <p className="mt-5 text-[11.5px] text-slate-500 italic">{business.slogan}</p>
      </footer>
    </article>
  )
}
