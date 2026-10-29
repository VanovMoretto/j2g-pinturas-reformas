import { specialties } from '../../data/specialties'
import { whatsappLink } from '../../config/business'
import { SectionHeading } from '../SectionHeading'

export function Specialties() {
  return (
    <section id="especialidades" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Especialidades"
          title="Serviços técnicos, executados com o material certo"
          description="Cada etapa segue a especificação do produto: preparo de superfície, tratamento e acabamento."
        />

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-2">
          {specialties.map(({ id, title, description, techniques, icon: Icon }, index) => (
            <article
              key={id}
              className="group flex flex-col rounded-xl border border-navy-100 bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-navy-900/5 md:p-8"
            >
              <div className="flex items-start justify-between">
                <span className="flex size-12 items-center justify-center rounded-lg bg-navy-800 text-white">
                  <Icon className="size-6" />
                </span>
                <span className="font-display text-sm font-bold text-steel-400">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-navy-900">{title}</h3>
              <p className="mt-3 leading-relaxed text-steel-500">{description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {techniques.map((technique) => (
                  <li key={technique} className="rounded-md bg-navy-50 px-2.5 py-1 text-xs font-medium text-navy-800">
                    {technique}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappLink(`Olá, Gilberto! Gostaria de um orçamento para: ${title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto pt-6 text-sm font-semibold text-navy-700 underline-offset-4 hover:underline"
              >
                Orçar este serviço →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
