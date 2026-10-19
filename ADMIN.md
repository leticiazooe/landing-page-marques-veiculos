# Painel administrativo da Marques Veículos

## Situação atual
O painel React, as consultas do catálogo e a migração PostgreSQL estão versionados neste repositório.
O banco **ainda não está vinculado**. Até a configuração, a rota `/admin` mostra uma tela de instalação pendente e o catálogo público mantém os três exemplos anteriores.

## 1. Escolher um Supabase
Use um projeto exclusivo para Marques Veículos (recomendado), ou indique explicitamente outro projeto Supabase para uso compartilhado. Não reutilize um banco de prospecção, identidade visual ou outro negócio sem aprovação.

## 2. Aplicar a migração
No projeto escolhido, rode o SQL de `supabase/migrations/20261019_marques_vehicles.sql` usando o SQL Editor ou a ferramenta de migrations.

A migração cria:
- `public.marques_vehicles`: dados, descrição, fotos, equipamentos, pagamentos, destaque e status
- `public.marques_admin_users`: lista de contas autorizadas
- RLS: visitantes leem **apenas anúncios publicados**; somente administradores podem criar, editar e excluir
- bucket `marques-vehicles` para imagens JPEG, PNG ou WebP (até 8 MB cada)

**Atenção:** as imagens do bucket são públicas por URL; não faça upload de documentos, fotos pessoais ou arquivos confidenciais.

## 3. Criar e autorizar um administrador
Em Supabase Authentication > Users, crie ou convide a conta administrativa de sua escolha. Não coloque usuário/senha no GitHub.

Depois, autorize o UUID real da conta na aba SQL Editor:

```sql
insert into public.marques_admin_users (user_id)
values ('UUID_DA_CONTA_AUTH')
on conflict (user_id) do nothing;
```

A tabela não permite cadastro público de administradores. Apenas um administrador do projeto Supabase pode conceder acesso.

## 4. Configurar variáveis
Localmente, copie `.env.example` para `.env.local` e configure:

```dotenv
VITE_SUPABASE_URL=https://SEU_PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=CHAVE_PUBLICA_DO_PROJETO
```

Em produção, configure as mesmas variáveis nas configurações de build da hospedagem (Cloudflare) e publique novamente.

As variáveis `VITE_*` ficam visíveis no navegador; use **somente** URL e chave pública (anon/publishable). **Nunca** use `service_role`, JWT secret ou senha do banco.

## 5. Acessar e gerenciar veículos
Abra `https://SEU_DOMINIO/admin`.

Ações disponíveis:
- Entrar com e-mail e senha via Supabase Auth
- Cadastrar e editar marca, modelo, versão, categoria, ano/modelo, quilometragem, preço, cor, combustível, motorização, portas, câmbio, transmissão e tração
- Informar descrição, itens/equipamentos e formas de pagamento confirmadas
- Enviar várias fotos ou cadastrar URLs de imagens, com capa e galeria
- Marcar destaque e situação (Rascunho / Publicado / Vendido)
- Consultar, editar, excluir e visualizar anúncios publicados

Ao selecionar **Publicado**, o anúncio fica visível na vitrine. Rascunhos e vendidos não aparecem ao público. Informações pré-existentes do protótipo não são enviadas automaticamente ao banco; cadastre o estoque verdadeiro pelo painel.

## 6. Validar antes de homologar
```bash
npm install
npm run typecheck
npm run check:assets
npm run build
```

Teste em produção:
- Página `/admin` sem login não revela listagem nem permite gravar
- Usuário autenticado fora de `marques_admin_users` é bloqueado
- Administrador cadastra veículo como rascunho e ele não aparece na vitrine
- Ao publicar, foto, preço, ficha e formas de pagamento aparecem na vitrine e nos detalhes
- Edição, exclusão e status Vendido refletem no catálogo
- Imagens abrem no navegador e WhatsApp mantém mensagem contextual

**Segurança:** o front-end não concede acesso por si só. As regras RLS do Supabase são a barreira efetiva.
