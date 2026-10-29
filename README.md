# J2G Pinturas & Reformas

Site institucional e gerador interno de orçamentos da J2G Pinturas & Reformas (Gilberto Assis).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- lucide-react, qrcode.react

## Desenvolvimento

```bash
npm install
npm run dev
```

## Estrutura

- `src/config/business.ts` — dados de contato, WhatsApp, Instagram e formas de pagamento
- `src/data/` — especialidades e projetos do portfólio (fotos entram pelo campo `image`)
- `src/components/LogoJ2G.tsx` — marca em SVG, herda a cor via `currentColor`
- `src/pages/Home.tsx` — landing page
- `src/pages/QuoteGenerator.tsx` — gerador de orçamentos em PDF (`#orcamento`)
- `src/utils/quoteParser.ts` — interpreta a lista colada do WhatsApp (ambientes, itens e correção de termos)

A troca entre site e gerador é feita pelo hash da URL, então o build funciona em hospedagem estática (GitHub Pages) sem configuração de rotas.

Cada push na `main` publica o site no GitHub Pages pelo workflow `.github/workflows/deploy.yml`.

O PDF é gerado pela impressão do navegador ("Salvar como PDF"); o nome do arquivo sai como `Orcamento_J2G_<Cliente>_<DD-MM-AAAA>`.
