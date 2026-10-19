# Auditoria de segurança — Marques Veículos (19/10/2026)

## Referências internas da organização
- `brand-ecosystem-design-system/docs/second-brain/SEGURANCA_SAAS_PROTECAO_CONTRA_ABUSO.md` — proteção de bots, WAF, rate limiting, contas/sessões, CGNAT.
- `brand-ecosystem-design-system/docs/security-plan.md` — Auth/RBAC, RLS, validação, CSP, uploads, segredos e auditoria.

## Escopo verificado
Front-end React/Vite, área `/admin`, catálogo e fluxo de publicação, integração supabase-js, migrações PostgreSQL e políticas de Storage no projeto `pxizyivehrwwgwhjjynv`. Um registro publicado já existia. Nenhum dado de produção foi apagado ou despublicado.

## Controles constatados
- RLS habilitada nas tabelas `marques_vehicles` e `marques_admin_users`: visitantes leem somente registros publicados. Gravações dependem de participação em `marques_admin_users`.
- A checagem privilegiada `marques_private.is_admin()` está em schema não exposto, com acesso restrito.
- Imagens armazenadas em bucket público com limite de 8 MB e MIME permitido (JPEG/PNG/WebP); criação e remoção exigem administrador.
- Credencial Supabase presente no cliente é **publishable**, sem role de serviço. Não deve ser substituída por chave administrativa.

## Endurecimentos realizados em 19/10
1. Regras do PostgreSQL para limitar comprimento de campos e tamanho de coleções.
2. Regras do PostgreSQL impedindo publicação de registros conceituais, sem marca/modelo, preço positivo ou foto.
3. Campo de capa não pode começar com esquema inseguro HTTP; somente URL HTTPS ou caminho relativo.
4. Validação redundante de tamanho, MIME e quantidade de fotos no painel e limites para descrição/galeria/equipamentos.
5. Adicionado `public/_headers` com `nosniff`, Referrer-Policy, Permissions-Policy, proteção de frames e CSP restritiva para a origem do Supabase e fontes.
6. Migração versionada no GitHub. Nenhuma unidade foi inserida, apagada ou alterada durante o endurecimento.

## Pendências / riscos residuais
- **Alerta Supabase Auth aberto:** proteção contra senhas vazadas desabilitada. Ativar na configuração Auth do projeto quando disponível no plano. Administradores devem usar senha única e MFA.
- **Rate limiting / bot defense:** configurar no Cloudflare WAF e nas opções de segurança do Supabase Auth. Regras de IP devem considerar CGNAT e IPv4/IPv6. Sem acesso à política ativa de WAF, este controle não pode ser declarado implementado.
- **Headers em produção:** `public/_headers` depende do modo de hospedagem. Confirmar na resposta HTTP real (ex.: `curl -I`). Cloudflare Workers com configuração própria podem ignorar `_headers`; nesse caso configurar headers no Worker.
- **CSP:** validar recursos externos carregados por personalizações ou widgets no navegador antes de impor modo estrito em produção.
- **Auditoria de alterações:** o banco não possui histórico inviolável de mudanças de veículos (antes/depois, usuário, horário). Recomenda-se gatilho de audit log protegido de alterações, política de retenção e acesso exclusivo de administradores autorizados.
- **Uploads:** a checagem de MIME declarada pelo cliente não valida os bytes do arquivo. Para grau mais alto de proteção, usar serviço que inspeccione arquivos, remova metadados e gere thumbnails otimizadas antes da publicação. URLs externas de fotos devem vir de provedores confiáveis.
- **Sessões:** supabase-js persiste tokens no navegador; a referência de cookies HttpOnly exige uma arquitetura BFF/server, não presente na versão Vite estática. Não afirmar cumprimento desse requisito.
- **Testes dinâmicos:** não foram executados pentest, teste de invasão nem auditoria externa. Não é possível prometer ausência de vulnerabilidades.

## Critérios de homologação
1. GitHub Actions / build sem erros.
2. Login incorreto e usuário sem papel admin não conseguem criar/editar/excluir.
3. Usuário anônimo não lê rascunhos nem vendidos via REST.
4. Não se publica modelo conceitual nem registro sem foto e preço.
5. Upload não aceita extensões/tamanhos não permitidos.
6. Validar CSP/headers na URL real de produção e revisão de recursos de terceiros.
7. Configurar proteção de senha vazada, MFA e rate limit onde suportado.

## Continuação da auditoria — 19/10/2026
- Criada a tabela de histórico `marques_vehicle_audit` e um trigger para INSERT/UPDATE/DELETE, preservando ID de veículo, ator autenticado, horário e versões anterior/posterior. O histórico é somente leitura para administradores; não há permissão de exclusão para o cliente web.
- Confirmados os gatilhos de auditoria e atualização como ativos.
- Consolidada a leitura da tabela de veículos em uma política SELECT por role, evitando sobreposição de políticas permissivas indicada pelo advisor de performance. Visitantes continuam acessando somente anúncios publicados.
- O advisor de segurança continua alertando que a proteção contra senhas vazadas está desabilitada; requer alteração na configuração Supabase Auth.
- A auditoria registra futuras operações; ela não reconstrói o histórico anterior. Não foram alterados os anúncios existentes durante esta etapa.
- O advisor classifica o índice novo de auditoria como não utilizado; isso é esperado antes de consultas ao histórico e não justifica removê-lo.
