import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const SITE = 'https://www.marquesveiculos.com.br';
const OUT = path.resolve('dist');
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://pxizyivehrwwgwhjjynv.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_WspwjXZnOg2D7kfos2fDVQ_mBEKd1Wz';
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const xml = escapeHtml;
const slugify = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90).replace(/-$/g, '');
const vehiclePath = row => `/veiculos/${slugify([row.make, row.model, row.year].join(' '))}-${encodeURIComponent(row.id)}/`;
const formatPrice = price => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(Number(price));
const truncate = (s, limit) => s.length > limit ? s.slice(0, limit - 1).trimEnd() + '…' : s;
const xmlTime = s => typeof s === 'string' && !Number.isNaN(Date.parse(s)) ? new Date(s).toISOString().slice(0, 10) : '';
const safeJson = value => JSON.stringify(value).replace(/</g, '\\u003c');
const description = row => truncate(`Confira ${row.make} ${row.model} ${row.year}, ${row.km}, ${row.transmission} e preço de ${formatPrice(row.price)} na Marques Veículos em Ibitinga, SP. Consulte disponibilidade.`, 270);

async function fetchPublished() {
  if (!SUPABASE_URL || !SUPABASE_KEY) throw new Error('Configuração pública do catálogo ausente.');
  const response = await fetch(`${SUPABASE_URL}/rest/v1/marques_vehicles?select=*&status=eq.published&order=created_at.desc`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`Supabase respondeu HTTP ${response.status}`);
  const rows = await response.json();
  if (!Array.isArray(rows)) throw new Error('Resposta de catálogo inválida.');
  return rows.filter(row => row.id && row.make && row.model && row.year && !row.is_conceptual && Number(row.price) > 0);
}

const baseHtml = await readFile(path.join(OUT, 'index.html'), 'utf8');
let vehicles = [];
try {
  vehicles = await fetchPublished();
} catch (error) {
  console.warn('SEO: não foi possível carregar o catálogo publicado:', error.message);
  if (process.env.SEO_REQUIRE_CATALOG === '1') throw error;
}
const urls = [{ loc: SITE + '/', lastmod: '' }];
for (const row of vehicles) {
  const rel = vehiclePath(row);
  const canonical = SITE + rel;
  const title = `${row.make} ${row.model} ${row.year} em Ibitinga | Marques Veículos`;
  const desc = description(row);
  const offer = {
    '@type': 'Offer',
    price: Number(row.price),
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
    url: canonical,
    seller: { '@type': 'AutoDealer', name: 'Marques Veículos Garagem', url: SITE + '/' },
  };
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Car',
    name: `${row.make} ${row.model} ${row.trim || ''}`.trim(),
    brand: { '@type': 'Brand', name: row.make },
    model: row.model,
    description: row.description || desc,
    image: row.image ? [new URL(row.image, SITE).href] : undefined,
    offers: offer,
    url: canonical,
  };
  // Páginas exclusivas contêm conteúdo real no HTML de resposta (sem aguardar JS).
  const content = `<main id="seo-vehicle" style="padding:3rem 1rem;font-family:system-ui;max-width:1000px;margin:auto">
    <a href="/#veiculos">Voltar à vitrine de veículos</a>
    <article><h1>${escapeHtml(row.make)} ${escapeHtml(row.model)} ${escapeHtml(row.trim || '')} ${escapeHtml(row.year)} em Ibitinga</h1>
    ${row.image ? `<img src="${escapeHtml(row.image)}" alt="Foto do ${escapeHtml(row.make)} ${escapeHtml(row.model)}" style="width:100%;max-width:760px;height:auto" />` : ''}
    <p>${escapeHtml(row.description || desc)}</p>
    <p><strong>${escapeHtml(formatPrice(row.price))}</strong></p>
    <dl><dt>Ano/modelo</dt><dd>${escapeHtml(row.year)}</dd><dt>Quilometragem</dt><dd>${escapeHtml(row.km)}</dd><dt>Câmbio</dt><dd>${escapeHtml(row.transmission)}</dd><dt>Combustível</dt><dd>${escapeHtml(row.fuel)}</dd></dl>
    <p>Consulte a disponibilidade e as condições com a Marques Veículos em Ibitinga, SP.</p>
    </article></main>`;
  const head = baseHtml
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(" \/>)/, (_,a,b) => a + escapeHtml(desc) + b)
    .replace(/(<link rel="canonical" href=")[^"]*(" \/>)/, (_,a,b) => a + canonical + b)
    .replace(/(<meta property="og:url" content=")[^"]*(" \/>)/, (_,a,b) => a + canonical + b)
    .replace(/(<meta property="og:title" content=")[^"]*(" \/>)/, (_,a,b) => a + escapeHtml(title) + b)
    .replace(/(<meta property="og:description" content=")[^"]*(" \/>)/, (_,a,b) => a + escapeHtml(desc) + b)
    .replace(/(<meta property="og:image" content=")[^"]*(" \/>)/, (_,a,b) => a + escapeHtml(row.image ? new URL(row.image, SITE).href : SITE + '/images/og-marques.webp') + b)
    .replace('</head>', `  <script type="application/ld+json">${safeJson(jsonLd)}</script>\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${content}</div>`);
  const dir = path.join(OUT, rel.replace(/^\//, ''));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), head, 'utf8');
  urls.push({ loc: canonical, lastmod: xmlTime(row.updated_at || row.created_at) });
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`  <url><loc>${xml(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`).join('\n')}\n</urlset>\n`;
await writeFile(path.join(OUT, 'sitemap.xml'), sitemap, 'utf8');
console.log(`SEO: sitemap gerado com ${urls.length} URLs; ${vehicles.length} fichas publicadas e pré-renderizadas.`);
