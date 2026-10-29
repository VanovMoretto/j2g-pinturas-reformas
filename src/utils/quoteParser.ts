export type ScopeSection = {
  title: string | null
  items: string[]
}

export type ParseOptions = {
  autocorrect: boolean
}

type RawLine = {
  text: string
  marked: boolean
}

type Correction = [RegExp, (match: string, ...groups: string[]) => string]

const WHATSAPP_PREFIX = /^\[?\d{1,2}\/\d{1,2}(?:\/\d{2,4})?,?\s+\d{1,2}:\d{2}(?::\d{2})?\]?\s*(?:-\s*)?[^:]{1,40}:\s+/
const SYMBOL_MARKER = /^[-–—•*·▪►✓✔]+\s*/
const ENUM_MARKER = /^(?:\d{1,3}\s*[.)ºª-]|[a-z]\))\s+/i
const HEADER_MAX_WORDS = 8

const accentFixes: Record<string, string> = {
  corrimao: 'corrimão',
  corrimaos: 'corrimãos',
  portao: 'portão',
  portoes: 'portões',
  mao: 'mão',
  maos: 'mãos',
  agua: 'água',
  area: 'área',
  areas: 'áreas',
  acrilica: 'acrílica',
  acrilico: 'acrílico',
  sintetico: 'sintético',
  ceramica: 'cerâmica',
  ceramicas: 'cerâmicas',
  metalica: 'metálica',
  metalicas: 'metálicas',
  eletrica: 'elétrica',
  hidraulica: 'hidráulica',
  residuos: 'resíduos',
  uteis: 'úteis',
}

function matchCase(source: string, replacement: string) {
  if (source === source.toUpperCase() && source !== source.toLowerCase()) return replacement.toUpperCase()
  if (source[0] === source[0].toUpperCase()) return replacement[0].toUpperCase() + replacement.slice(1)
  return replacement
}

const corrections: Correction[] = [
  [/\bm[ãa]o de obra\b/gi, (m) => matchCase(m, 'mão de obra')],
  [/\bduas de ?m[ãa]os?\b/gi, (m) => matchCase(m, 'duas demãos')],
  [/\b(tr[êe]s|quatro) de ?m[ãa]os?\b/gi, (m, n) => matchCase(m, `${n.toLowerCase()} demãos`)],
  [/\buma de ?m[ãa]os?\b/gi, (m) => matchCase(m, 'uma demão')],
  [/\bde ?m[ãa]os\b/gi, (m) => matchCase(m, 'demãos')],
  [/\bde ?m[ãa]o\b(?! de obra)/gi, (m) => matchCase(m, 'demão')],
  [/\ba cima\b/gi, (m) => matchCase(m, 'acima')],
  [/\baplic[:;]?a[çc][ãa]o\b/gi, (m) => matchCase(m, 'aplicação')],
  [/\b([a-z]{3,})cao\b/gi, (m, stem) => stem + (m.endsWith('AO') ? 'ÇÃO' : 'ção')],
  [/\b([a-z]{3,})coes\b/gi, (m, stem) => stem + (m.endsWith('OES') ? 'ÇÕES' : 'ções')],
  [/\b[a-z]+\b/gi, (m) => (accentFixes[m.toLowerCase()] ? matchCase(m, accentFixes[m.toLowerCase()]) : m)],
  [/\bpu\b/gi, () => 'PU'],
  [/\btf[\s.-]?7\b/gi, () => 'TF-7'],
  [/\bac[\s-]?3\b/gi, () => 'AC3'],
  [/\bnf\b/gi, () => 'NF'],
  [/\bpva\b/gi, () => 'PVA'],
  [/\s+([,.;:!?])/g, (_, mark) => mark],
  [/\s{2,}/g, () => ' '],
]

function stripWhatsAppFormatting(text: string) {
  return text
    .replace(WHATSAPP_PREFIX, '')
    .replace(/([*_~])(\S(?:.*?\S)?)\1/g, '$2')
    .trim()
}

function readLine(line: string): RawLine | null {
  const text = stripWhatsAppFormatting(line)
  if (!text) return null

  const marker = text.match(SYMBOL_MARKER) ?? text.match(ENUM_MARKER)
  const content = marker ? text.slice(marker[0].length).trim() : text
  if (!content) return null

  return { text: content, marked: Boolean(marker) }
}

function isHeader(line: RawLine, next: RawLine | undefined) {
  if (line.text.endsWith(':')) return true
  if (line.marked || !next?.marked) return false
  return line.text.split(/\s+/).length <= HEADER_MAX_WORDS && !/[.!?;]$/.test(line.text)
}

export function correctTerms(text: string) {
  return corrections.reduce((result, [pattern, replace]) => result.replace(pattern, replace), text)
}

function capitalize(text: string) {
  return text.charAt(0).toLocaleUpperCase('pt-BR') + text.slice(1)
}

function formatItem(text: string) {
  const sentences = capitalize(text).replace(/([.!?]\s+)(\p{Ll})/gu, (_, sep: string, letter: string) =>
    sep + letter.toLocaleUpperCase('pt-BR'),
  )
  return /[.!?…]$/.test(sentences) ? sentences : `${sentences}.`
}

function formatTitle(text: string) {
  return capitalize(text.replace(/:+$/, '').trim())
}

export function parseScope(raw: string, { autocorrect }: ParseOptions): ScopeSection[] {
  const lines = raw
    .split(/\r?\n/)
    .map(readLine)
    .filter((line): line is RawLine => line !== null)

  const sections: ScopeSection[] = []
  let current: ScopeSection = { title: null, items: [] }

  lines.forEach((line, index) => {
    const text = autocorrect ? correctTerms(line.text) : line.text

    if (isHeader(line, lines[index + 1])) {
      if (current.title || current.items.length) sections.push(current)
      current = { title: autocorrect ? formatTitle(text) : text.replace(/:+$/, '').trim(), items: [] }
      return
    }

    current.items.push(autocorrect ? formatItem(text) : text)
  })

  sections.push(current)
  return sections.filter((section) => section.items.length > 0)
}

export function countItems(sections: ScopeSection[]) {
  return sections.reduce((total, section) => total + section.items.length, 0)
}
