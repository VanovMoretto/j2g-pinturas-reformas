import type { ClipboardEvent, ReactNode } from 'react'
import { FlaskConical } from 'lucide-react'
import type { MaterialScope, QuoteData } from '../../types/quote'
import { deadlineSuggestions, materialScopes, paymentSuggestions } from '../../config/quote'
import { maskCurrency, parseCurrencyText } from '../../utils/format'

export type QuoteErrors = Partial<Record<keyof QuoteData, string>>

type QuoteFormProps = {
  quote: QuoteData
  errors: QuoteErrors
  itemCount: number
  sectionCount: number
  onChange: (patch: Partial<QuoteData>) => void
  onFillExample: () => void
}

const inputClass =
  'w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-base text-navy-950 placeholder:text-slate-400 focus:border-navy-700 focus:ring-2 focus:ring-navy-700/15 focus:outline-none md:text-sm'

const scopePlaceholder = `Cole aqui a mensagem do WhatsApp. Ex.:

Auditório:
- recompor forro de gesso
- pintura das paredes duas de mãos`

type FieldProps = {
  id: string
  label: string
  optional?: boolean
  error?: string
  children: ReactNode
}

function Field({ id, label, optional, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-navy-900">
        {label}
        {optional && <span className="text-xs font-normal text-slate-400">opcional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

function Chips({ options, active, onSelect }: { options: string[]; active: string; onSelect: (value: string) => void }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(option)}
          className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
            active === option
              ? 'border-navy-800 bg-navy-800 text-white'
              : 'border-slate-300 bg-white text-slate-600 hover:border-navy-700 hover:text-navy-800'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

function Group({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 md:p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-display text-sm font-bold tracking-wide text-navy-900 uppercase">{title}</h2>
        {action}
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

export function QuoteForm({ quote, errors, itemCount, sectionCount, onChange, onFillExample }: QuoteFormProps) {
  const handleTotalPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()
    onChange({ total: parseCurrencyText(event.clipboardData.getData('text')) })
  }

  return (
    <form className="space-y-4" onSubmit={(event) => event.preventDefault()} noValidate>
      <Group
        title="Cliente"
        action={
          <button
            type="button"
            onClick={onFillExample}
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-navy-700"
          >
            <FlaskConical className="size-3.5" />
            Preencher exemplo de teste
          </button>
        }
      >
        <Field id="clientName" label="Nome do cliente ou empresa" error={errors.clientName}>
          <input
            id="clientName"
            className={inputClass}
            value={quote.clientName}
            onChange={(event) => onChange({ clientName: event.target.value })}
            aria-invalid={Boolean(errors.clientName)}
            aria-describedby={errors.clientName ? 'clientName-error' : undefined}
            autoComplete="off"
            required
          />
        </Field>
        <Field id="clientDocument" label="CNPJ ou CPF" optional>
          <input
            id="clientDocument"
            className={inputClass}
            value={quote.clientDocument}
            onChange={(event) => onChange({ clientDocument: event.target.value })}
            inputMode="numeric"
            autoComplete="off"
          />
        </Field>
        <Field id="siteAddress" label="Local / endereço da obra" optional>
          <input
            id="siteAddress"
            className={inputClass}
            value={quote.siteAddress}
            onChange={(event) => onChange({ siteAddress: event.target.value })}
            autoComplete="off"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field id="date" label="Data">
            <input
              id="date"
              type="date"
              className={inputClass}
              value={quote.date}
              onChange={(event) => onChange({ date: event.target.value })}
            />
          </Field>
          <Field id="number" label="Nº do orçamento">
            <input
              id="number"
              className={`${inputClass} tabular-nums`}
              value={quote.number}
              onChange={(event) => onChange({ number: event.target.value })}
              autoComplete="off"
            />
          </Field>
        </div>
      </Group>

      <Group title="Serviços">
        <Field id="scopeText" label="Colar do WhatsApp">
          <textarea
            id="scopeText"
            rows={10}
            className={`${inputClass} resize-y leading-relaxed`}
            value={quote.scopeText}
            placeholder={scopePlaceholder}
            onChange={(event) => onChange({ scopeText: event.target.value })}
          />
        </Field>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-navy-900">
            <input
              type="checkbox"
              className="size-4 accent-navy-800"
              checked={quote.autocorrect}
              onChange={(event) => onChange({ autocorrect: event.target.checked })}
            />
            Correção e formatação automática de termos técnicos
          </label>
          <span className="text-xs text-slate-500 tabular-nums">
            {itemCount} {itemCount === 1 ? 'item' : 'itens'}
            {sectionCount > 0 && ` · ${sectionCount} ${sectionCount === 1 ? 'ambiente' : 'ambientes'}`}
          </span>
        </div>
      </Group>

      <Group title="Materiais">
        <div className="space-y-2" role="radiogroup" aria-label="Escopo de materiais">
          {(Object.keys(materialScopes) as MaterialScope[]).map((scope) => (
            <label
              key={scope}
              className={`flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition-colors ${
                quote.materialScope === scope ? 'border-navy-800 bg-navy-50' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <input
                type="radio"
                name="materialScope"
                value={scope}
                checked={quote.materialScope === scope}
                onChange={() => onChange({ materialScope: scope })}
                className="mt-1 size-4 accent-navy-800"
              />
              <span className="text-sm">
                <span className="font-medium text-navy-900">{materialScopes[scope].label}</span>
                <span className="block text-slate-500">{materialScopes[scope].detail}</span>
              </span>
            </label>
          ))}
        </div>
      </Group>

      <Group title="Condições comerciais">
        <Field id="total" label="Valor total (R$)">
          <div className="relative">
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">R$</span>
            <input
              id="total"
              className={`${inputClass} pl-10 text-right font-semibold tabular-nums`}
              value={quote.total}
              onChange={(event) => onChange({ total: maskCurrency(event.target.value) })}
              onPaste={handleTotalPaste}
              inputMode="numeric"
              placeholder="0,00"
              autoComplete="off"
            />
          </div>
        </Field>
        <Field id="paymentTerms" label="Condições de pagamento / NF">
          <input
            id="paymentTerms"
            className={inputClass}
            value={quote.paymentTerms}
            onChange={(event) => onChange({ paymentTerms: event.target.value })}
            autoComplete="off"
          />
          <Chips
            options={paymentSuggestions}
            active={quote.paymentTerms}
            onSelect={(paymentTerms) => onChange({ paymentTerms })}
          />
        </Field>
        <Field id="deadline" label="Prazo de execução / entrega">
          <input
            id="deadline"
            className={inputClass}
            value={quote.deadline}
            onChange={(event) => onChange({ deadline: event.target.value })}
            autoComplete="off"
          />
          <Chips options={deadlineSuggestions} active={quote.deadline} onSelect={(deadline) => onChange({ deadline })} />
        </Field>
        <Field id="validity" label="Validade da proposta">
          <input
            id="validity"
            className={inputClass}
            value={quote.validity}
            onChange={(event) => onChange({ validity: event.target.value })}
            autoComplete="off"
          />
        </Field>
        <Field id="notes" label="Observações adicionais" optional>
          <textarea
            id="notes"
            rows={3}
            className={`${inputClass} resize-y`}
            value={quote.notes}
            onChange={(event) => onChange({ notes: event.target.value })}
          />
        </Field>
      </Group>
    </form>
  )
}
