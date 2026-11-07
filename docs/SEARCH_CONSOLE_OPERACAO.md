# Search Console: enviar sitemap e inspecionar a página inicial

**Domínio oficial:** https://www.marquesveiculos.com.br/
**Propriedade Google:** `sc-domain:marquesveiculos.com.br`
**Sitemap:** https://www.marquesveiculos.com.br/sitemap.xml

## Estado atual (não confundir com submissão ao Google)

- O sitemap é gerado automaticamente no build e está publicado no domínio.
- O `robots.txt` anuncia o sitemap.
- A rotina `.github/workflows/seo-live.yml` verifica diariamente a resposta HTTP da home, sitemap, robots e fichas.
- **Publicar um sitemap não equivale a submetê-lo ao Search Console.**
- O workflow `.github/workflows/search-console.yml` faz a submissão real à API do Google e consulta a indexação da home **apenas depois de autorizado com uma conta Google com acesso à propriedade**.

## Configuração única que exige o proprietário

1. Verifique a propriedade `marquesveiculos.com.br` em https://search.google.com/search-console (registro TXT no DNS se o Google solicitar).
2. Em um projeto Google Cloud controlado pelo proprietário, habilite a **Google Search Console API** e crie uma conta de serviço específica, com chave JSON.
3. No Search Console, em **Configurações > Usuários e permissões**, adicione o e-mail da conta de serviço com permissão suficiente. A conta de serviço NÃO verifica nem reivindica a propriedade automaticamente.
4. No repositório GitHub, em **Settings > Secrets and variables > Actions**, crie o secret `GSC_SERVICE_ACCOUNT_JSON` com o JSON completo da conta de serviço. Não inclua essas credenciais em arquivos, commits, mensagens ou screenshots.
5. No GitHub, abra **Actions > Search Console - Enviar Sitemap e Inspecionar Home > Run workflow**, mantenha `submit_sitemap=true` e execute.
6. Nos logs dessa execução, veja a confirmação do sitemap e o resultado da Inspeção de URL (veredito, cobertura, canonical, último rastreamento). **Não confunda "Sitemap enviado" com "Página indexada".**

É possível executar com `submit_sitemap=false` para apenas consultar o status de indexação. Nunca execute a API com uma credencial privilegiada fora de um secret.

## Inspeção ao vivo e solicitação de indexação

A API de inspeção retorna informações do **índice existente**, não o teste ao vivo e não envia pedido de indexação para páginas comuns.

Na interface https://search.google.com/search-console:
- Inspecione `https://www.marquesveiculos.com.br/`
- Clique em **Testar URL publicada**, se disponível, e confirme acesso/indexabilidade.
- Se necessário, use **Solicitar indexação** (sujeito a limites e análise do Google).
- Em **Sitemaps**, acompanhe o processamento do `sitemap.xml`.

## Como interpretar

- `PASS` nos testes de HTTP: o site é acessível. **Não confirma indexação pelo Google**.
- `Sitemap enviado`: Google aceitou o envio pela API; aguarde processamento.
- `verdict: PASS` na inspeção: URL aparentemente indexada conforme dados disponíveis.
- `coverageState` e `indexingState` revelam o motivo específico quando não indexada.
- Falhas 401/403: confira credencial, API ativada e permissão da conta de serviço.
- O Google não garante indexação nem posicionamento após uma submissão.

Referências oficiais:
- https://developers.google.com/webmaster-tools/v1/sitemaps/submit
- https://developers.google.com/webmaster-tools/v1/api_reference_index
- https://support.google.com/webmasters/answer/9012289
