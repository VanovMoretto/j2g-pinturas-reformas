import { useId } from 'react'

type LogoJ2GProps = {
  className?: string
  tagline?: boolean
  title?: string
}

const wings = [
  'M120 118 L160 106 L160 113 L120 125 Z',
  'M126 125 L158 116 L158 212 L126 215 Z',
  'M212 92 L240 99 L240 105 L212 98 Z',
  'M214 99 L236 104 L236 200 L214 204 Z',
]

const tower = {
  cornice: 'M155 72 L204 61 L216 67 L216 73 L204 68 L155 79 Z',
  front: 'M160 78 L202 69 L202 208 L160 212 Z',
  side: 'M202 69 L214 75 L214 204 L202 208 Z',
}

const towerWindows = Array.from({ length: 14 }, (_, row) =>
  Array.from({ length: 4 }, (_, col) => ({ x: 165 + col * 9, y: 86 + row * 8.4 })),
).flat()

const leftStripes = [131, 137.5, 144, 150.5]
const rightStripes = [219, 225, 231]
const sideSlits = [205.5, 209.5]

export function LogoJ2G({ className, tagline = true, title = 'J2G Pinturas e Reformas' }: LogoJ2GProps) {
  const uid = useId().replace(/:/g, '')
  const gapMask = `j2g-gap-${uid}`
  const windowMask = `j2g-win-${uid}`

  const silhouette = [...wings, tower.cornice, tower.front, tower.side]

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={tagline ? '0 -8 360 280' : '24 -8 316 244'}
      role="img"
      aria-label={title}
      className={className}
      fill="currentColor"
    >
      <defs>
        <mask id={gapMask} maskUnits="userSpaceOnUse" x="0" y="-10" width="360" height="290">
          <rect y="-10" width="360" height="290" fill="#fff" />
          {silhouette.map((d) => (
            <path key={d} d={d} fill="#000" stroke="#000" strokeWidth="7" strokeLinejoin="round" />
          ))}
        </mask>
        <mask id={windowMask} maskUnits="userSpaceOnUse" x="0" y="-10" width="360" height="290">
          <rect y="-10" width="360" height="290" fill="#fff" />
          {towerWindows.map(({ x, y }) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="6" height="5" fill="#000" />
          ))}
          {leftStripes.map((x) => (
            <rect key={x} x={x} y="130" width="3" height="80" fill="#000" />
          ))}
          {rightStripes.map((x) => (
            <rect key={x} x={x} y="110" width="2.5" height="86" fill="#000" />
          ))}
          {sideSlits.map((x) => (
            <rect key={x} x={x} y="82" width="1.6" height="118" fill="#000" />
          ))}
          <path d="M155 79 L204 68" stroke="#000" strokeWidth="1.5" />
        </mask>
      </defs>

      <g mask={`url(#${gapMask})`}>
        <path
          d="M170 27 C170 11 181 2 195 2 C210 2 221 11 221 25 C221 36 214 41 202 46 L180 52 H228"
          fill="none"
          stroke="currentColor"
          strokeWidth="17"
          strokeLinejoin="miter"
        />
        <path d="M36 112 H126 V180 C126 207 108 222 80 222 C55 222 39 207 34 184 L63 177 C66 189 72 195 81 195 C92 195 97 189 97 178 V139 H36 Z" />
        <path
          d="M314.2 134.9 A42 42 0 1 0 324 162"
          fill="none"
          stroke="currentColor"
          strokeWidth="28"
        />
        <rect x="282" y="150" width="56" height="24" />
      </g>

      <g mask={`url(#${windowMask})`}>
        {wings.map((d) => (
          <path key={d} d={d} />
        ))}
        <path d={tower.cornice} />
        <path d={tower.front} />
        <path d={tower.side} opacity="0.72" />
      </g>

      <path d="M92 230 C150 206 230 206 298 228 C232 214 152 214 92 230 Z" />
      <path d="M78 236 C150 214 236 214 312 236" fill="none" stroke="currentColor" strokeWidth="3" />
      <path d="M104 238 C160 224 226 224 286 238" fill="none" stroke="currentColor" strokeWidth="2" />

      {tagline && (
        <g>
          <rect x="14" y="257" width="40" height="3" />
          <rect x="306" y="257" width="40" height="3" />
          <text
            x="180"
            y="265"
            textAnchor="middle"
            textLength="232"
            lengthAdjust="spacingAndGlyphs"
            fontFamily="Montserrat, 'Arial Black', Arial, sans-serif"
            fontWeight="800"
            fontSize="19"
          >
            PINTURAS E REFORMAS
          </text>
        </g>
      )}
    </svg>
  )
}
