type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  tone?: 'light' | 'dark'
}

export function SectionHeading({ eyebrow, title, description, tone = 'light' }: SectionHeadingProps) {
  const dark = tone === 'dark'

  return (
    <div className="max-w-2xl">
      <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-steel-500 uppercase">
        <span className={`h-px w-8 ${dark ? 'bg-steel-400' : 'bg-navy-800'}`} />
        {eyebrow}
      </p>
      <h2 className={`mt-4 font-display text-2xl font-extrabold md:text-4xl ${dark ? 'text-white' : 'text-navy-900'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-4 leading-relaxed md:text-lg ${dark ? 'text-navy-100/75' : 'text-steel-500'}`}>{description}</p>
      )}
    </div>
  )
}
