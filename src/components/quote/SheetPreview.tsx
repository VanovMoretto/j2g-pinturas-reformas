import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

export function SheetPreview({ children }: { children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const sheetRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState<number>()

  useLayoutEffect(() => {
    const viewport = viewportRef.current
    const sheet = sheetRef.current
    if (!viewport || !sheet) return

    const update = () => {
      const nextScale = Math.min(1, viewport.clientWidth / sheet.offsetWidth)
      setScale(nextScale)
      setHeight(sheet.offsetHeight * nextScale)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(viewport)
    observer.observe(sheet)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={viewportRef} className="sheet-viewport" style={{ height }}>
      <div ref={sheetRef} className="sheet" style={{ '--sheet-scale': scale } as CSSProperties}>
        {children}
      </div>
    </div>
  )
}
