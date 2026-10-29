import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, FilePlus2, Printer } from 'lucide-react'
import type { QuoteData } from '../types/quote'
import { LogoJ2G } from '../components/LogoJ2G'
import { QuoteForm, type QuoteErrors } from '../components/quote/QuoteForm'
import { QuoteDocument } from '../components/quote/QuoteDocument'
import { SheetPreview } from '../components/quote/SheetPreview'
import { createQuote, exampleQuote } from '../config/quote'
import { countItems, parseScope } from '../utils/quoteParser'
import { formatDateBR, toFileSlug } from '../utils/format'
import { registerQuoteNumber } from '../utils/quoteNumber'
import { readStorage, writeStorage } from '../utils/storage'

const DRAFT_KEY = 'j2g:orcamento:rascunho'

function loadDraft(): QuoteData {
  const draft = readStorage<Partial<QuoteData>>(DRAFT_KEY)
  return draft ? { ...createQuote(), ...draft } : createQuote()
}

function buildFileName(quote: QuoteData) {
  const client = toFileSlug(quote.clientName) || 'Cliente'
  return `Orcamento_J2G_${client}_${formatDateBR(quote.date, '-')}`
}

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<QuoteData>(loadDraft)
  const [errors, setErrors] = useState<QuoteErrors>({})

  const sections = useMemo(
    () => parseScope(quote.scopeText, { autocorrect: quote.autocorrect }),
    [quote.scopeText, quote.autocorrect],
  )

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Gerador de Orçamentos | J2G'
    return () => {
      document.title = previousTitle
    }
  }, [])

  useEffect(() => {
    writeStorage(DRAFT_KEY, quote)
  }, [quote])

  const updateQuote = (patch: Partial<QuoteData>) => {
    setQuote((current) => ({ ...current, ...patch }))
    if (patch.clientName?.trim()) setErrors((current) => ({ ...current, clientName: undefined }))
  }

  const startNewQuote = () => {
    const hasContent = quote.clientName || quote.scopeText || quote.total
    if (hasContent && !window.confirm('Descartar o orçamento atual e começar um novo?')) return
    setQuote(createQuote())
    setErrors({})
  }

  const fillExample = () => {
    setQuote((current) => ({ ...current, ...exampleQuote }))
    setErrors({})
  }

  const savePdf = () => {
    if (!quote.clientName.trim()) {
      setErrors({ clientName: 'Informe o nome do cliente ou empresa.' })
      document.getElementById('clientName')?.focus()
      return
    }

    const previousTitle = document.title
    const restoreTitle = () => {
      document.title = previousTitle
      window.removeEventListener('afterprint', restoreTitle)
    }

    document.title = buildFileName(quote)
    registerQuoteNumber(quote.number)
    window.addEventListener('afterprint', restoreTitle)
    window.print()
  }

  return (
    <div className="min-h-svh bg-slate-100 print:min-h-0 print:bg-white">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur print:hidden">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-3 px-4 md:px-6">
          <div className="flex items-center gap-3">
            <a href="#inicio" className="text-slate-400 hover:text-navy-800" aria-label="Voltar ao site">
              <ArrowLeft className="size-5" />
            </a>
            <LogoJ2G tagline={false} className="h-9 w-auto text-navy-800" />
            <h1 className="hidden font-display text-sm font-bold text-navy-900 sm:block">Gerador de Orçamentos</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={startNewQuote}
              className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-navy-900 hover:border-navy-700"
            >
              <FilePlus2 className="size-4" />
              <span className="hidden sm:inline">Novo</span>
            </button>
            <button
              type="button"
              onClick={savePdf}
              className="inline-flex items-center gap-2 rounded-md bg-navy-800 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-700"
            >
              <Printer className="size-4" />
              <span className="sm:hidden">Gerar PDF</span>
              <span className="hidden sm:inline">Salvar / Compartilhar PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] gap-6 px-4 py-6 md:px-6 lg:grid-cols-[minmax(0,460px)_minmax(0,1fr)] lg:items-start print:block print:max-w-none print:p-0">
        <div className="print:hidden">
          <QuoteForm
            quote={quote}
            errors={errors}
            itemCount={countItems(sections)}
            sectionCount={sections.filter((section) => section.title).length}
            onChange={updateQuote}
            onFillExample={fillExample}
          />
        </div>

        <section aria-label="Pré-visualização do orçamento" className="lg:sticky lg:top-22 print:static">
          <p className="mb-2 text-xs font-semibold tracking-[0.16em] text-slate-500 uppercase print:hidden">
            Pré-visualização A4
          </p>
          <SheetPreview>
            <QuoteDocument quote={quote} sections={sections} />
          </SheetPreview>
        </section>
      </main>
    </div>
  )
}
