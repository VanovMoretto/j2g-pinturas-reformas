import { readStorage, writeStorage } from './storage'

const sequenceKey = (prefix: string) => `j2g:orcamento:seq:${prefix}`

function monthPrefix(date: Date) {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}`
}

export function nextQuoteNumber(date = new Date()) {
  const prefix = monthPrefix(date)
  const last = readStorage<number>(sequenceKey(prefix)) ?? 0
  return `${prefix}-${String(last + 1).padStart(2, '0')}`
}

export function registerQuoteNumber(number: string) {
  const match = /^(\d{6})-(\d+)$/.exec(number.trim())
  if (!match) return

  const [, prefix, sequence] = match
  const last = readStorage<number>(sequenceKey(prefix)) ?? 0
  if (Number(sequence) > last) writeStorage(sequenceKey(prefix), Number(sequence))
}
