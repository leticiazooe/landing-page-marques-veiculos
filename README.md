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

- `src/components/`: Header, Hero, Collection, VehicleDetails, Story, Visit, Footer, Reveal
- `src/data/site.ts`: telefone, endereço, horários, links do WhatsApp e três veículos demonstrativos
- `src/index.css`: import do Tailwind e tokens semânticos da marca
- `public/images/`: capa fotográfica, logotipo e preview social
- `index.html`: metadados base da página

## Regras comerciais

**Os três cartões são veículos demonstrativos, não estoque.** As imagens são geradas por IA e os preços, anos, quilometragens, equipamentos e formas de pagamento são dados de exemplo. Pluto Concept é um veículo fictício. Os botões de WhatsApp solicitam confirmação de disponibilidade, preços e condições. Antes de publicar ofertas reais, substitua os dados ilustrativos por unidades confirmadas pela garagem. O parâmetro `?veiculo=honda-civic` permite abrir a ficha de detalhe sem servidor de rotas. As imagens ilustrativas do Civic, Volvo XC60 e Pluto ficam localmente em `public/images/` como WebP.

Os dados de endereço, telefone e horários foram fornecidos no briefing e devem ser revalidados com a empresa antes da publicação. Os botões usam o número (16) 99641-4542. Não há formulário fictício, banco de dados ou painel de estoque nesta versão.

## Publicação

`npm run build` exporta um site estático em `dist/`, que pode ser hospedado em Cloudflare Pages, Netlify, Vercel ou servidores estáticos. Configure o build command como `npm run build` e output directory como `dist`. Para rastreamento/SEO avançado de páginas dinâmicas de veículos, considere renderização no servidor ou pré-renderização em uma próxima fase. Ao publicar em domínio definitivo, ajuste as tags OG para URLs absolutas, inclua canonical e gere um sitemap.

## Motion e acessibilidade

Animações via Motion com `MotionConfig reducedMotion="user"`, rolagem com progresso discreto, transições do catálogo e menu responsivo acessível, com navegação por teclado e Escape.

## Verificação do pacote

A criação destes arquivos não constitui deploy. Caso a instalação npm não esteja disponível no ambiente de execução, rode `npm install && npm run build` no seu ambiente com rede. Não se deve apresentar a versão como produção homologada até conferir renderização e links no navegador.

## Detalhes e pagamentos

Cada veículo possui botão **Mais detalhes**, com ficha de transmissão, combustível, ano, quilometragem, motorização e equipamentos. O botão **Falar no WhatsApp** abre a conversa com mensagem contextual. As modalidades PIX/transferência, financiamento e troca são **apenas sugestões não confirmadas** pela Marques Veículos e aparecem assim na interface. A pessoa responsável pelo site deve validar informações e formas de pagamento antes de divulgar ofertas.


## Painel administrativo

O cadastro de veículos foi implementado em React com autenticação Supabase, upload de fotos e permissões RLS. Acesse `/admin` depois de configurar o projeto Supabase. Consulte [ADMIN.md](ADMIN.md) para a instalação e o procedimento de liberação de contas. Sem configuração, o painel permanece bloqueado e a vitrine atual mantém os exemplos anteriores.
