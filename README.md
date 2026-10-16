# Marques Veículos Garagem — React

Website premium e responsivo da Marques Veículos em **React 19 + TypeScript + Vite 7 + Tailwind CSS 4 + Motion + Lucide React**. A fotografia do hero e o logotipo estão no projeto como arquivos otimizados. Estilo feito com classes utilitárias Tailwind; `src/index.css` contém somente o carregamento do Tailwind e tokens de marca.

## Começar

Requisitos: Node.js 20.19+ e npm.

```bash
npm install
npm run dev
```

Abra o endereço informado pelo Vite (normalmente `http://localhost:5173`).

## Comandos

```bash
npm run dev        # desenvolvimento
npm run typecheck  # checagem TypeScript
npm run check:assets # checa arquivos e dados essenciais
npm run build      # gera arquivos prontos para produção em dist/
npm run preview    # serve o build localmente
```

## Estrutura

- `src/components/`: Header, Hero, Collection, Story, Visit, Footer, Reveal
- `src/data/site.ts`: telefone, endereço, horários, links do WhatsApp e categorias ilustrativas
- `src/index.css`: import do Tailwind e tokens semânticos da marca
- `public/images/`: capa fotográfica, logotipo e preview social
- `index.html`: metadados base da página

## Regras comerciais

**Os cartões mostram categorias ilustrativas, não estoque.** Não há preços, condições, garantia, quantidade de veículos, modelos ou dados inventados. Para publicar estoque real, conecte uma fonte administrativa/CMS e acrescente páginas reais por veículo. Fotos das categorias usam Unsplash e dependem da internet; se falharem, a fotografia local da capa é usada como fallback.

Os dados de endereço, telefone e horários foram fornecidos no briefing e devem ser revalidados com a empresa antes da publicação. Os botões usam o número (16) 99641-4542. Não há formulário fictício, banco de dados ou painel de estoque nesta versão.

## Publicação

`npm run build` exporta um site estático em `dist/`, que pode ser hospedado em Cloudflare Pages, Netlify, Vercel ou servidores estáticos. Configure o build command como `npm run build` e output directory como `dist`. Para rastreamento/SEO avançado de páginas dinâmicas de veículos, considere renderização no servidor ou pré-renderização em uma próxima fase. Ao publicar em domínio definitivo, ajuste as tags OG para URLs absolutas, inclua canonical e gere um sitemap.

## Motion e acessibilidade

Animações via Motion com `MotionConfig reducedMotion="user"`, rolagem com progresso discreto, transições do catálogo e menu responsivo acessível, com navegação por teclado e Escape.

## Verificação do pacote

A criação destes arquivos não constitui deploy. Caso a instalação npm não esteja disponível no ambiente de execução, rode `npm install && npm run build` no seu ambiente com rede. Não se deve apresentar a versão como produção homologada até conferir renderização e links no navegador.
