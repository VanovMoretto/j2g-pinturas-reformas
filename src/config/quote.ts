import type { MaterialScope, QuoteData } from '../types/quote'
import { todayISO } from '../utils/format'
import { nextQuoteNumber } from '../utils/quoteNumber'

export const materialScopes: Record<MaterialScope, { label: string; detail: string }> = {
  labor: { label: 'Somente mão de obra', detail: 'Materiais por conta do contratante' },
  full: { label: 'Mão de obra + materiais', detail: 'Materiais inclusos no valor' },
  partial: { label: 'Parcial', detail: 'Conforme descrito nos itens' },
}

export const paymentSuggestions = ['Com NF para 7D e 14D', '50% de entrada e 50% na entrega', 'À vista via Pix ou Cartão']

export const deadlineSuggestions = ['5 dias úteis', '10 dias úteis', 'A combinar conforme cronograma']

export function createQuote(): QuoteData {
  return {
    clientName: '',
    clientDocument: '',
    siteAddress: '',
    date: todayISO(),
    number: nextQuoteNumber(),
    scopeText: '',
    autocorrect: true,
    materialScope: 'labor',
    total: '',
    paymentTerms: '',
    deadline: '',
    validity: '10 dias',
    notes: '',
  }
}

export const exampleQuote: Partial<QuoteData> = {
  clientName: 'Cliente de Teste',
  scopeText: [
    'Pintura do corrimão',
    'Pintura dos detalhes laterais da escada',
    'Vedação das frestas laterais da escada',
    'Pintura da parede ao final da escada',
  ].join('\n'),
  materialScope: 'labor',
  total: '2.000,00',
  paymentTerms: 'Com NF para 7D e 14D',
  deadline: '5 dias úteis',
}
