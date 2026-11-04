# SEO local e conversões — Marques Veículos

Domínio canônico: https://www.marquesveiculos.com.br/

## O que já está no código
- HTML com AutoDealer, endereço de Ibitinga, telefone e horários.
- Canonical, Open Graph e metadescrição da home com domínio absoluto.
- `public/robots.txt` aponta para `/sitemap.xml` e evita rastreamento de `/admin`.
- `npm run build` executa `scripts/generate-seo.mjs`: consulta registros reais de `marques_vehicles` com `status=published`, gera `dist/veiculos/<slug>-<id>/index.html` e `dist/sitemap.xml`. Itens conceituais ficam de fora.
- As fichas usam links de verdade para `/veiculos/.../`, com título, description, canonical, Open Graph e JSON-LD Car/Offer próprios.
- O catálogo em React continua lendo Supabase. URL antiga `?veiculo=<id>` é convertida para a URL nova quando o registro existir.

## Publicação e atualização do catálogo
- O sitemap é gerado **durante cada build**, não instantaneamente após a edição do Supabase. Refaça o deploy ao publicar, editar ou vender um veículo.
- No painel de deploy, defina `SEO_REQUIRE_CATALOG=1` para impedir builds silenciosos sem catálogo quando o Supabase estiver indisponível.
- Garanta as variáveis públicas `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` no deploy; nunca use a chave service-role no frontend/build.
- Só publique veículos reais, com foto autorizada, preço e informações confirmadas.
- Verifique a página em `https://www.marquesveiculos.com.br/sitemap.xml`, o robots.txt, uma ficha com /veiculos/.../ e a tag canonical no **HTML recebido**.
- A versão estática de uma ficha vendida permanece até o próximo deploy. Automatize o deploy após alterações do estoque antes de confiar no sitemap.

## Search Console (exige proprietário verificado)
1. Abra https://search.google.com/search-console e adicione a propriedade de domínio `marquesveiculos.com.br`.
2. Siga a verificação DNS TXT no Registro.br/provedor DNS; não copie tokens de verificação em mensagens públicas.
3. Envie `https://www.marquesveiculos.com.br/sitemap.xml` em **Sitemaps**.
4. Use **Inspeção de URL** na home e em uma ficha; verifique canonical, indexabilidade e HTML.
5. Acompanhe consultas `garagem de carros em Ibitinga`, `carros usados Ibitinga`, modelos e visitas a páginas de veículo.
6. Confirmar `www` como domínio principal e redirecionar o host sem www para ele (301/308), no provedor de hospedagem/DNS.

## Rastreamento de leads
Eventos instrumentados:
- `whatsapp_click` (WhatsApp no hero, vitrine, ficha, localização e rodapé)
- `phone_click`
- `map_click` (abrir rotas)
- `vehicle_detail_open`

Cada evento guarda `source` (seção do site), e `vehicle_id` quando disponível. Não inclui número de telefone ou texto da conversa. Os eventos são colocados no `dataLayer` local. Para enviá-los ao GA4, configure `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` no ambiente do deploy, reconstruindo o site. O aviso de consentimento é exibido somente quando o ID existe. Sem consentimento, o Google Analytics não é carregado.

Depois, no GA4, confira **DebugView** e relatórios de eventos, e marque `whatsapp_click`, `map_click` ou `phone_click` como eventos principais quando fizer sentido. Clique é um **indicador de interesse**, não uma venda confirmada. Teste consentimento aceito/recusado em navegador real.

## Perfil da Empresa no Google
Solicite ou reivindique o Perfil da Empresa no Google com os dados reais e consistentes do site: nome da loja, endereço, horário, telefone, site, imagens atuais e categoria mais precisa. Peça avaliações autênticas sem oferecer incentivo. O código não cria nem verifica o perfil.

## Limitações
- Renderização prévia depende de acesso ao Supabase na etapa de build.
- Resultados avançados específicos de listagem de veículos têm elegibilidade variável por país. O schema não garante rich snippets nem posições.
- Google Search Console e GA4 exigem contas e configurações externas, que não são substituídas pelo código.
- O Google pode levar tempo para rastrear e indexar páginas novas, sem garantia de posicionamento.
