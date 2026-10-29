export type MaterialScope = 'labor' | 'full' | 'partial'

export type QuoteData = {
  clientName: string
  clientDocument: string
  siteAddress: string
  date: string
  number: string
  scopeText: string
  autocorrect: boolean
  materialScope: MaterialScope
  total: string
  paymentTerms: string
  deadline: string
  validity: string
  notes: string
}
