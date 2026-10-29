export type Project = {
  id: string
  title: string
  service: string
  image?: string
}

export const projects: Project[] = [
  { id: 'forro-auditorio', title: 'Recomposição de Forro em Auditório', service: 'Gesso e Reparos' },
  { id: 'calha-pu', title: 'Vedação de Calha com PU', service: 'Impermeabilização' },
  { id: 'escada-corrimao', title: 'Revitalização de Escada e Corrimão', service: 'Madeiras e Ferragens' },
  { id: 'fachada', title: 'Tratamento e Pintura de Fachada', service: 'Pintura Geral' },
  { id: 'piso-emborrachado', title: 'Piso com Tinta Emborrachada', service: 'Pintura de Pisos' },
  { id: 'mofo-umidade', title: 'Tratamento de Mofo e Umidade', service: 'Patologias' },
]
