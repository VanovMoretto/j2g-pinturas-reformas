import { Droplets, Hammer, PaintRoller, Wrench, type LucideIcon } from 'lucide-react'

export type Specialty = {
  id: string
  title: string
  description: string
  techniques: string[]
  icon: LucideIcon
}

export const specialties: Specialty[] = [
  {
    id: 'pintura',
    title: 'Pintura Geral e Pisos',
    description:
      'Pintura interna e externa com tinta acrílica e semibrilho, tratamento de fachadas e aplicação de tinta emborrachada de alta resistência em pisos.',
    techniques: ['Acrílica', 'Semibrilho', 'Fachadas', 'Tinta emborrachada'],
    icon: PaintRoller,
  },
  {
    id: 'gesso',
    title: 'Gesso e Reparos Estruturais',
    description:
      'Recomposição e fechamento de forros de gesso, massa corrida e acrílica, tratamento de fissuras e desplacamentos com massa AC3 e fundo preparador.',
    techniques: ['Forro de gesso', 'Massa AC3', 'Fissuras', 'Fundo preparador'],
    icon: Hammer,
  },
  {
    id: 'impermeabilizacao',
    title: 'Impermeabilização e Patologias',
    description:
      'Vedação técnica de calhas, rufos e frestas com selante PU, lavagem externa e tratamento químico de mofo e umidade com ácido e resina protetora.',
    techniques: ['Selante PU', 'Calhas e rufos', 'Mofo e umidade', 'Resina protetora'],
    icon: Droplets,
  },
  {
    id: 'madeiras-ferragens',
    title: 'Restauração de Madeiras e Ferragens',
    description:
      'Lixamento completo, tratamento antiferrugem com convertedor TF-7 e esmalte sintético em escadas, corrimãos, portas, janelas e grades.',
    techniques: ['Lixamento', 'Convertedor TF-7', 'Esmalte sintético', 'Grades e corrimãos'],
    icon: Wrench,
  },
]
