# Voluntá+
# Integração com a API

Configure `REACT_APP_API_URL=http://localhost:8080/api` e a chave pública da mesma instância Clerk configurada em `CLERK_ISSUER_URI` no backend. O catálogo consulta a API; serviços antigos salvos apenas no `localStorage` não aparecem mais. Eles precisam ser cadastrados novamente ou migrados para o PostgreSQL.

Uma conta existente somente no Clerk pode abrir `/completar-perfil` para criar o perfil da aplicação. O perfil e o papel vêm de `/v1/users/me`. O e-mail de verificação e a recuperação de senha são gerenciados pelo Clerk.
