const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

export function maskCurrency(input: string) {
  const digits = input.replace(/\D/g, '').replace(/^0+(?=\d)/, '').slice(0, 11)
  if (!digits) return ''
  return formatCurrency(Number(digits) / 100)
}

export function parseCurrencyText(text: string) {
  const cleaned = text.replace(/[^\d.,]/g, '')
  if (!cleaned) return ''

  const hasCents = /,\d{1,2}$/.test(cleaned)
  const normalized = hasCents ? cleaned.replace(/\./g, '').replace(',', '.') : cleaned.replace(/[.,]/g, '')
  const value = Number(normalized)

  return Number.isFinite(value) ? formatCurrency(value) : ''
}

function pad(value: number) {
  return String(value).padStart(2, '0')
}

export function todayISO(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function formatDateBR(iso: string, separator = '/') {
  const [year, month, day] = iso.split('-')
  if (!year || !month || !day) return ''
  return [day, month, year].join(separator)
}

export function describeTaxId(value: string) {
  const digits = value.replace(/\D/g, '')

  if (digits.length === 11) {
    return { label: 'CPF', value: digits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') }
  }
  if (digits.length === 14) {
    return { label: 'CNPJ', value: digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') }
  }
  return { label: 'CPF/CNPJ', value: value.trim() }
}

export function toFileSlug(text: string) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}
