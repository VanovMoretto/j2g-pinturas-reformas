import { useEffect, useState } from 'react'
import Home from './pages/Home'
import QuoteGenerator from './pages/QuoteGenerator'

const QUOTE_HASH = '#orcamento'

function useLocationHash() {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return hash
}

export default function App() {
  const hash = useLocationHash()
  const isQuote = hash === QUOTE_HASH

  useEffect(() => {
    const target = !isQuote && window.location.hash ? document.getElementById(window.location.hash.slice(1)) : null
    if (target) target.scrollIntoView()
    else window.scrollTo(0, 0)
  }, [isQuote])

  return isQuote ? <QuoteGenerator /> : <Home />
}
