/**
 * Integração autenticada com a API Google Search Console.
 * Executada apenas sob workflow_dispatch e com conta de serviço autorizada.
 * Nunca insira JSON de credencial no repositório.
 *
 * A inspeção consulta o índice existente do Google; NÃO executa o teste ao vivo
 * nem solicita a indexação. A submissão de sitemap não garante indexação.
 */
import { createSign } from 'node:crypto';

const property = 'sc-domain:marquesveiculos.com.br';
const sitemap = 'https://www.marquesveiculos.com.br/sitemap.xml';
const homepage = 'https://www.marquesveiculos.com.br/';
const scope = 'https://www.googleapis.com/auth/webmasters';
const b64 = value => Buffer.from(typeof value === 'string' ? value : JSON.stringify(value)).toString('base64url');

function readCredentials() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('Secret GSC_SERVICE_ACCOUNT_JSON ausente. Conecte uma conta de serviço autorizada no Search Console.');
  let credential;
  try { credential = JSON.parse(raw); } catch { throw new Error('GSC_SERVICE_ACCOUNT_JSON não é um JSON válido.'); }
  if (credential.type !== 'service_account' || !credential.client_email || !credential.private_key) {
    throw new Error('É necessária uma credencial de conta de serviço do Google.');
  }
  if (!/^https:\/\/oauth2\.googleapis\.com\/token$/.test(credential.token_uri ?? '')) {
    throw new Error('token_uri da conta de serviço inválido.');
  }
  return credential;
}

async function tokenFor(credentials) {
  const now = Math.floor(Date.now() / 1000);
  const header = b64({ alg: 'RS256', typ: 'JWT' });
  const payload = b64({
    iss: credentials.client_email,
    scope,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  });
  const body = header + '.' + payload;
  const signer = createSign('RSA-SHA256');
  signer.update(body);
  signer.end();
  const assertion = body + '.' + signer.sign(credentials.private_key).toString('base64url');
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error('Falha na autenticação com o Google (HTTP ' + response.status + ').');
  const result = await response.json();
  if (!result.access_token) throw new Error('Google não retornou token de acesso.');
  return result.access_token;
}

async function request(url, token, method, data) {
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: 'Bearer ' + token,
      ...(data ? { 'Content-Type': 'application/json' } : {}),
    },
    ...(data ? { body: JSON.stringify(data) } : {}),
    signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) {
    // Não imprimir corpo de erros, pois pode incluir detalhes confidenciais da conta.
    throw new Error('A chamada ao Search Console retornou HTTP ' + response.status + '. Confira permissões na propriedade ' + property + '.');
  }
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

const token = await tokenFor(readCredentials());
const encodedProperty = encodeURIComponent(property);
const base = 'https://www.googleapis.com/webmasters/v3/sites/' + encodedProperty;

// Exige acesso real à propriedade. Não a adiciona e não tenta reivindicar titularidade.
const site = await request(base, token, 'GET');
console.log('Propriedade acessível:', property, '| permissionLevel:', site?.permissionLevel ?? 'não informado');

const submit = process.env.GSC_SUBMIT_SITEMAP === 'true';
if (submit) {
  await request(base + '/sitemaps/' + encodeURIComponent(sitemap), token, 'PUT');
  console.log('Sitemap enviado ao Google Search Console:', sitemap);
} else {
  console.log('Envio do sitemap não solicitado nesta execução.');
}

const inspected = await request('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', token, 'POST', {
  inspectionUrl: homepage,
  siteUrl: property,
  languageCode: 'pt-BR',
});
const result = inspected?.inspectionResult?.indexStatusResult ?? {};
console.log('Resultado da Inspeção de URL (índice Google):', JSON.stringify({
  inspectionUrl: homepage,
  verdict: result.verdict ?? null,
  coverageState: result.coverageState ?? null,
  indexingState: result.indexingState ?? null,
  robotsTxtState: result.robotsTxtState ?? null,
  pageFetchState: result.pageFetchState ?? null,
  googleCanonical: result.googleCanonical ?? null,
  userCanonical: result.userCanonical ?? null,
  lastCrawlTime: result.lastCrawlTime ?? null,
}));
console.log('Inspeção via API não solicita indexação. Para testar URL ao vivo/solicitar indexação, use a interface do Search Console.');
