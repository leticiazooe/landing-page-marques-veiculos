/**
 * Verificação pública de SEO: executada no GitHub Actions, fora da rede do deploy.
 * Não usa credenciais nem consulta dados privados do Google.
 */
const site = 'https://www.marquesveiculos.com.br';
const checks = [
  { path: '/', type: 'html' },
  { path: '/robots.txt', type: 'robots' },
  { path: '/sitemap.xml', type: 'sitemap' },
];
let failed = false;
for (const { path, type } of checks) {
  const url = site + path;
  try {
    const response = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': 'MarquesSEOHealthcheck/1.0 (GitHub Actions)' },
      signal: AbortSignal.timeout(18000),
    });
    const body = await response.text();
    const issues = [];
    if (!response.ok) issues.push('HTTP ' + response.status);
    if (response.url !== url && type !== 'html') issues.push('redirecionamento inesperado: ' + response.url);
    if (type === 'html') {
      if (!body.includes('rel="canonical" href="' + site + '/"')) issues.push('canonical da home ausente');
      if (!body.includes('name="description"')) issues.push('meta description ausente');
      if (!body.includes('"@type": "AutoDealer"')) issues.push('dados estruturados AutoDealer ausentes');
    }
    if (type === 'robots') {
      if (!body.includes('Sitemap: ' + site + '/sitemap.xml')) issues.push('Sitemap não referenciado');
      if (/^Disallow:\s*\/\s*$/im.test(body)) issues.push('robots bloqueia o site');
    }
    if (type === 'sitemap') {
      if (!body.includes('<urlset') || !body.includes('<loc>' + site + '/</loc>')) issues.push('XML do sitemap incorreto');
      if (/<loc>https?:\/\/[^<]+/i.test(body) && !body.includes(site)) issues.push('URLs fora do domínio');
    }
    console.log(JSON.stringify({ url, status: response.status, finalUrl: response.url, bytes: body.length, result: issues.length ? 'FAIL' : 'OK', issues }));
    if (issues.length) failed = true;
  } catch (error) {
    failed = true;
    console.error(JSON.stringify({ url, result: 'ERROR', error: String(error) }));
  }
}
process.exitCode = failed ? 1 : 0;
