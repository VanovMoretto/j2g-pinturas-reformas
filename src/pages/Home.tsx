import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/sections/Hero'
import { Specialties } from '../components/sections/Specialties'
import { Differentials } from '../components/sections/Differentials'
import { Portfolio } from '../components/sections/Portfolio'
import { WhatsAppIcon } from '../components/icons/BrandIcons'
import { business } from '../config/business'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Specialties />
        <Differentials />
        <Portfolio />
      </main>
      <Footer />
      <a
        href={business.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar no WhatsApp"
        className="fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#1FA855] text-white shadow-lg shadow-navy-950/30 md:hidden"
      >
        <WhatsAppIcon className="size-7" />
      </a>
    </>
  )
}
