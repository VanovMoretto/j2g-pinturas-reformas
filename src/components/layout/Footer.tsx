import { Mail, Phone } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { LogoJ2G } from '../LogoJ2G'
import { InstagramIcon, WhatsAppIcon } from '../icons/BrandIcons'
import { business } from '../../config/business'

export function Footer() {
  return (
    <footer id="contato" className="bg-navy-950 text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.1fr_1fr_auto]">
          <div>
            <LogoJ2G className="h-28 w-auto text-white" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-navy-100/70">{business.slogan}</p>
          </div>

          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-steel-400 uppercase">Contato</p>
            <p className="mt-4 font-display text-lg font-bold">{business.owner}</p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={business.whatsapp.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-navy-100/85 hover:text-white">
                  <Phone className="size-4 text-steel-400" />
                  {business.whatsapp.display}
                </a>
              </li>
              <li>
                <a href={business.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-navy-100/85 hover:text-white">
                  <InstagramIcon className="size-4 text-steel-400" />
                  {business.instagram.handle}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email.primary}`} className="flex items-center gap-3 break-all text-navy-100/85 hover:text-white">
                  <Mail className="size-4 shrink-0 text-steel-400" />
                  {business.email.primary}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-steel-400 uppercase">Pagamento</p>
            <p className="mt-2 text-sm text-navy-100/85">{business.paymentMethods.join(' · ')}</p>
          </div>

          <div className="flex flex-col items-start gap-4">
            <div className="hidden rounded-lg bg-white p-3 md:block">
              <QRCodeSVG value={business.whatsapp.url} size={132} fgColor="#141D59" title="QR Code do WhatsApp" />
            </div>
            <a
              href={business.whatsapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-navy-50"
            >
              <WhatsAppIcon className="size-4 text-[#1FA855]" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-navy-100/50 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <p>
            © {new Date().getFullYear()} {business.name}
          </p>
          <a href="#orcamento" className="hover:text-navy-100/80">
            Gerador de Orçamentos
          </a>
        </div>
      </div>
    </footer>
  )
}
