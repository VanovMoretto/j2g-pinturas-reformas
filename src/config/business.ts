const whatsappNumber = '5551993570389'
const whatsappMessage = 'Olá, Gilberto! Vi o site da J2G Pinturas & Reformas e gostaria de solicitar um orçamento.'

export const business = {
  name: 'J2G Pinturas & Reformas',
  owner: 'Gilberto Assis',
  slogan: 'Experiência e confiança em cada projeto.',
  whatsapp: {
    display: '(51) 99357-0389',
    number: whatsappNumber,
    url: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  },
  instagram: {
    handle: '@J2Gpinturas_reformas',
    url: 'https://instagram.com/J2Gpinturas_reformas',
  },
  email: {
    primary: 'contato.j2gpinturas@gmail.com',
    // enquanto a caixa comercial não estiver ativa
    fallback: 'gilbertobochecha430@gmail.com',
  },
  paymentMethods: ['Pix', 'Cartão', 'Dinheiro', 'Faturamento com NF'],
} as const

export function whatsappLink(message?: string) {
  if (!message) return business.whatsapp.url
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}
