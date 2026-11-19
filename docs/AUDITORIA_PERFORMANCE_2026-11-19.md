# Auditoria de performance — Marques Veículos

Data: 19/11/2026  
URL analisada: https://www.marquesveiculos.com.br/  
Projeto: `leticiazooe/landing-page-marques-veiculos`, deploy na Vercel.

## Diagnóstico recebido do PageSpeed

A captura recebida pelo cliente indicava:
- recursos de renderização bloqueantes (economia estimada: 380 ms)
- entrega de imagens ineficiente (economia estimada: 3.820 KiB)
- JavaScript não utilizado (economia estimada: 881 KiB)
- cache ineficiente (economia estimada: 526 KiB)
- payload total: 7.097 KiB
- LCP, rede e tarefas longas.

São estimativas do teste fornecido. Não representam necessariamente dados idênticos em testes posteriores.

## Mudanças entregues

| Área | Solução |
| --- | --- |
| Foto Localização | WebP responsivo servido por `/_vercel/image`, carregamento lazy; PNG original preservado para fallback |
| Fotos vitrine/ficha | Resoluções e `srcset/sizes` por dispositivo; compatível com Storage público Supabase |
| Logotipo | PNG da marca entregue como WebP otimizado por CDN, com fallback |
| Cache HTTP | Regras Vercel em `vercel.json`; cache longo para assets fingerprintados e cache com revalidação para imagens |
| Hero | Foto de 161KB carregada inicialmente, vídeo desktop adiado até ocioso; no celular mantém fotografia para preservar banda e LCP |
| Fontes | CSS Google Fonts carregado sem bloquear a renderização; apenas famílias usadas |
| JavaScript | Admin e fichas sob demanda com lazy loading; catálogo via REST read-only sem SDK no bundle inicial |
| Ícones de marcas | 10 SVGs gerados durante build no lugar da biblioteca JS `@cardog-icons/react` no navegador |
| Animações | Efeitos simples com CSS/RAF no lugar de Motion no carregamento inicial; suporte a reduced-motion |
| SEO/Conversão | sitemap, canonical, botões de WhatsApp, navegação e contatos preservados |
| Regressões | Scripts `npm run check:assets`, `npm run check:seo` e `npm run check:performance` em CI |

## Evidências técnicas

- Foto de Localização no CDN em `w=640&q=70`: **41.850 bytes WebP**, ante arquivo PNG original de **3.503.302 bytes** (redução ~98,8%).
- Bundle principal JS do Vite antes: **4.594,11 KB**, gzip **1.217,41 KB**.
- Bundle principal após SVGs estáticos: **407,30 KB**, gzip **129,62 KB**.
- Bundle principal depois da refatoração das animações: **269,47 KB**, gzip **83,65 KB**.
- CSS final: **61,55 KB**, gzip **11,48 KB**.
- O `VehicleDetails` com Motion e o `AdminPanel` ficam em chunks sob demanda.

## Lighthouse de laboratório

### Primeira medição após imagem/SVG e antes de remover Motion do carregamento público

GitHub Actions: https://github.com/leticiazooe/landing-page-marques-veiculos/actions/runs/44543739091

- Mobile **71**; FCP **1,7s**, LCP **4,5s**, TBT **500ms**, CLS **0**
- Desktop **100**; FCP **0,4s**, LCP **0,7s**, TBT **0ms**, CLS **0,003**

### Medição após refatoração do Motion público

GitHub Actions: https://github.com/leticiazooe/landing-page-marques-veiculos/actions/runs/44544995610

- Mobile **99**; FCP **1,3s**, LCP **2,1s**, TBT **0ms**, CLS **0**
- Desktop **100**; FCP **0,4s**, LCP **0,8s**, TBT **0ms**, CLS **0,003**

### Atenção à variação do Lighthouse

Uma execução posterior, após otimizar o logo, mostrou um pico atípico de execução de JS no runner GitHub (TBT **2.190ms**, mobile **66** e desktop **98**). Não há evidência de regressão no bundle: o build e as verificações passaram; a variação foi de execução no runner/navegador. Não se deve prometer nota 100 em toda execução do Lighthouse nem omitir resultados desfavoráveis.

A auditoria `.github/workflows/lighthouse.yml` foi atualizada para executar **3 amostras mobile** e reportar a mediana, mínimo e máximo, além de uma amostra desktop. Os resultados ficam nos logs e em artefato JSON.

## Recomendações de acompanhamento

1. Avaliar mediana Lighthouse de várias execuções com carga semelhante, além do PageSpeed web de dispositivos móveis reais.
2. Acompanhar Core Web Vitals reais (LCP, INP e CLS) no Search Console, quando houver dados suficientes.
3. Verificar imagens reais do novo estoque; evitar fotos de 3MB+ no tamanho original e manter descrições corretas.
4. Monitorar o peso do bundle em todo pull request e os testes de SEO em cada deploy.
5. Testar visualmente o novo comportamento do hero no mobile (foto) e desktop (vídeo adiado), os botões e o formulário administrativo.

**100 no Lighthouse é uma medição possível, não uma garantia de velocidade constante para todos os usuários.**
