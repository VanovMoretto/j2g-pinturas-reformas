import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LogoJ2G } from '../LogoJ2G'
import { WhatsAppIcon } from '../icons/BrandIcons'
import { business } from '../../config/business'

const navLinks = [
  { href: '#especialidades', label: 'Especialidades' },
  { href: '#diferenciais', label: 'Diferenciais' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#contato', label: 'Contato' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? 'border-navy-100 shadow-sm' : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:h-20 md:px-6">
        <a href="#inicio" className="flex items-center gap-3 text-navy-800" aria-label="J2G Pinturas & Reformas — início">
          <LogoJ2G tagline={false} className="h-10 w-auto md:h-12" />
          <span className="hidden font-display text-sm leading-tight font-bold tracking-wide sm:block">
            J2G
            <span className="block text-[11px] font-semibold tracking-[0.18em] text-steel-500">PINTURAS E REFORMAS</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-navy-900/80 transition-colors hover:text-navy-700">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={business.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-navy-800 px-3.5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-700 md:px-5"
          >
            <WhatsAppIcon className="size-4" />
            <span className="hidden sm:inline">Orçamento no WhatsApp</span>
            <span className="sm:hidden">Orçamento</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-navy-900 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="menu-mobile" className="border-t border-navy-100 bg-white lg:hidden" aria-label="Menu">
          <ul className="mx-auto max-w-6xl px-4 py-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-base font-medium text-navy-900"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
