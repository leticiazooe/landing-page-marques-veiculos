# Auditoria de SEO local e publicação | Marques Veículos

Data da auditoria: 2026-11-06 (horário de São Paulo; ver logs do GitHub Actions para o instante UTC).

## Resultados confirmados

- Projeto Vercel `landing-page-marques-veiculos`: implantação production em estado READY, vinculada à branch main.
- Host `www.marquesveiculos.com.br`: domínio associado e verificado na Vercel.
- Host `marquesveiculos.com.br`: redirecionamento 308 configurado para o host www.
- DNS no Registro.br (nameservers a.sec.dns.br e c.sec.dns.br): Vercel não acusa `misconfigured`. Não modificar entradas DNS sem novo diagnóstico.
- Auditoria pública externa feita no GitHub Actions: home, robots.txt e sitemap.xml responderam HTTP 200; URL canônica, robots, dados estruturados e sitemap passaram.
- Sitemap gerado durante build e fichas de veículos publicados pré-renderizadas no diretório dist.
- SEO local no topo do hero: texto descritivo `Garagem de carros em Ibitinga e região`.
- Monitor automático: `.github/workflows/seo-live.yml`, executado após alterações relevantes e diariamente; confere respostas HTTP e atributos técnicos.

## Limitações: o que esta auditoria NÃO confirma

- Não comprova que o Google indexou o site; isso requer o relatório de indexação e Inspeção de URL no Search Console.
- O teste de resultados públicos não é equivalente a consultar o índice completo. A ausência de resultado numa busca não prova desindexação.
- Não comprova as posições para todas as pesquisas locais, porque os resultados variam por localização e momento.
- Não comprova que os cliques do site geram vendas: são eventos de intenção comercial.

## Possível falha de relevância no Perfil da Empresa

Uma pesquisa de estabelecimentos encontrou `Marques Veículos`, telefone (16) 99641-4542, endereço R. Valentina Minzone Palanque, Ibitinga-SP, porém com categoria `Automobile storage facility`, que pode ser interpretada como garagem/guarda de carros, não comércio de veículos.

Conferir e, se confirmado no Perfil da Empresa, alterar a categoria principal para a opção real de comércio (ex.: loja de carros usados/revendedora de veículos), escolhendo a categoria disponível mais específica. O Google pode exigir nova verificação da empresa após alterações de categoria.

A mesma fonte retornou:
- Segunda a sexta: 08:00–17:00, enquanto o site informa 08:00–18:00;
- Sábado: 08:00–13:00, enquanto o site informa 08:00–12:00.

Validar horários com o proprietário e alinhar site e Perfil.

## Atenção aos endereços

O site e a ficha local de Maps encontrada apontam para R. Valentina Minzone Palanque. Diretórios baseados no cadastro empresarial exibem Rua Paulo de Souza, 1540. **Não trocar automaticamente o endereço**, pois o endereço fiscal e o endereço de atendimento podem ser diferentes. Confirmar o endereço visitável e utilizar exatamente o mesmo no Perfil da Empresa e no site.

## Procedimento no Search Console, requer acesso autorizado do proprietário

1. Acesse https://search.google.com/search-console
2. Adicione a propriedade de domínio `marquesveiculos.com.br` (sem protocolo nem www).
3. Faça a verificação de propriedade por TXT DNS, conforme instrução gerada pelo próprio Google.
4. Em **Sitemaps**, envie `https://www.marquesveiculos.com.br/sitemap.xml`.
5. Em **Inspeção de URL**, verifique `https://www.marquesveiculos.com.br/` e ao menos uma ficha `/veiculos/...`.
6. Verifique o motivo caso uma URL não esteja indexada (descoberta, rastreamento, canonical, bloqueio, conteúdo ou outro).
7. Acompanhe **Desempenho > Resultados da pesquisa**: consultas por Marques Veículos, garagem em Ibitinga, loja de carros em Ibitinga, carros usados e buscas por marca/modelo.

## Procedimento no Perfil da Empresa

1. Acesse https://business.google.com/ com a conta proprietária/verificada.
2. Confira categoria principal da loja e mude para a categoria correta de venda de veículos, se necessário.
3. Confirme endereço de visita, horário, telefone, link de website e rota do Maps.
4. Atualize fotos reais da fachada, do interior e do estoque, mantendo alta qualidade.
5. Incentive avaliações espontâneas de clientes reais, sem recompensa e sem fabricar opiniões.
6. Não acrescente palavras-chave ao nome oficial da empresa artificialmente.

## Referências públicas consultadas
- https://support.google.com/business/answer/7249669?hl=pt-BR
- https://support.google.com/business/answer/7091?hl=pt-BR
- https://support.google.com/webmasters/answer/34592?hl=pt-BR
- https://support.google.com/webmasters/answer/7451001?hl=pt-BR
- https://www.solutudo.com.br/empresas/sp/ibitinga/lojas-de-carros/gilberto-dias-marques-junior-33150808

## Próxima decisão necessária
Confirmar com responsável da Marques os horários reais e qual endereço corresponde ao atendimento presencial, e autorizar acesso ao Perfil da Empresa e ao Search Console para verificação dos dados privados.
