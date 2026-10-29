import { ArrowRight, Building2, CalendarCheck, FileCheck2, Home, Hotel, Store } from 'lucide-react'
import { WhatsAppIcon } from '../icons/BrandIcons'
import { LogoJ2G } from '../LogoJ2G'
import { business } from '../../config/business'

const segments = [
  { label: 'Residências', icon: Home },
  { label: 'Condomínios', icon: Building2 },
  { label: 'Hotéis', icon: Hotel },
  { label: 'Comércios', icon: Store },
]

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navy-900 pt-16 text-white md:pt-20">
      <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
      <LogoJ2G
        tagline={false}
        className="pointer-events-none absolute -right-24 bottom-0 hidden h-[520px] w-auto text-white/[0.04] lg:block"
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-xs font-medium tracking-wide text-steel-400 uppercase">
            {business.owner} · Responsável técnico
          </p>
          <h1 className="font-display text-3xl leading-tight font-extrabold sm:text-4xl md:text-5xl">
            Pintura, reparos estruturais e manutenção predial e residencial.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-100/85 md:text-lg">
            {business.slogan} Do diagnóstico ao acabamento, com prazo combinado cumprido à risca e emissão de Nota
            Fiscal para pessoas físicas e empresas.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={business.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 font-semibold text-navy-900 transition-colors hover:bg-navy-50"
            >
              <WhatsAppIcon className="size-5 text-[#1FA855]" />
              Solicitar orçamento
            </a>
            <a
              href="#especialidades"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-6 py-3.5 font-semibold text-white transition-colors hover:border-white/50"
            >
              Ver especialidades
              <ArrowRight className="size-4" />
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-navy-950/60 p-6 backdrop-blur md:p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-steel-400 uppercase">Atendimento</p>
          <ul className="mt-4 grid grid-cols-2 gap-3">
            {segments.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2.5 rounded-lg bg-white/5 px-3 py-3 text-sm font-medium">
                <Icon className="size-4 shrink-0 text-steel-400" />
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
            <div className="flex gap-3">
              <FileCheck2 className="mt-0.5 size-5 shrink-0 text-steel-400" />
              <div>
                <p className="font-semibold">Emissão de Nota Fiscal</p>
                <p className="text-sm text-navy-100/70">Faturamento para condomínios, hotéis e empresas.</p>
              </div>
            </div>
            <div className="flex gap-3">
              <CalendarCheck className="mt-0.5 size-5 shrink-0 text-steel-400" />
              <div>
                <p className="font-semibold">Cronograma no papel</p>
                <p className="text-sm text-navy-100/70">Etapas e data de entrega definidas antes de começar.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
