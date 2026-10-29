import { ImageIcon } from 'lucide-react'
import { projects } from '../../data/portfolio'
import { SectionHeading } from '../SectionHeading'

export function Portfolio() {
  return (
    <section id="projetos" className="bg-navy-50 py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionHeading
          eyebrow="Projetos realizados"
          title="Serviços executados"
          description="Registros de obras entregues, organizados pelo tipo de serviço."
        />

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <figure className="overflow-hidden rounded-xl border border-navy-100 bg-white">
                <div className="relative aspect-[4/3] bg-white">
                  {project.image ? (
                    <img src={project.image} alt={project.title} loading="lazy" className="size-full object-cover" />
                  ) : (
                    <div className="bg-blueprint-light flex size-full flex-col items-center justify-center gap-2 text-navy-800/40">
                      <ImageIcon className="size-8" strokeWidth={1.5} />
                      <span className="text-xs font-medium tracking-wider uppercase">Foto do serviço</span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 rounded bg-navy-800 px-2 py-1 text-[11px] font-semibold tracking-wide text-white uppercase">
                    {project.service}
                  </span>
                </div>
                <figcaption className="px-5 py-4 font-display font-bold text-navy-900">{project.title}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
