import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const root = resolve('dist');
const domain = 'https://www.marquesveiculos.com.br';
const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
const homepage = await readFile(join(root, 'index.html'), 'utf8');

assert(sitemap.startsWith('<?xml version="1.0" encoding="UTF-8"?>'), 'Sitemap sem XML válido');
assert(sitemap.includes('<loc>' + domain + '/</loc>'), 'Sitemap sem URL principal');
assert(robots.includes('Sitemap: ' + domain + '/sitemap.xml'), 'robots.txt sem sitemap');
assert(homepage.includes('rel="canonical" href="' + domain + '/"'), 'Canonical da homepage ausente');
assert(homepage.includes('"@type": "AutoDealer"'), 'Dados estruturados do negócio ausentes');

const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), match => match[1]);
const uniques = new Set(urls);
assert.equal(uniques.size, urls.length, 'Sitemap contém URLs duplicadas');
for (const url of urls) {
  assert(url.startsWith(domain + '/'), `URL fora do domínio: ${url}`);
  if (url === domain + '/') continue;
  const rel = new URL(url).pathname.replace(/^\//, '');
  const file = join(root, rel, 'index.html');
  assert((await stat(file)).isFile(), `Ficha ausente no build: ${file}`);
  const html = await readFile(file, 'utf8');
  assert(html.includes('rel="canonical" href="' + url + '"'), `Canonical incorreto: ${url}`);
  assert(html.includes('"@type":"Car"'), `Schema Car ausente: ${url}`);
  assert(html.includes('id="seo-vehicle"'), `HTML de veículo ausente: ${url}`);
}

const files = await readdir(root);
assert(files.includes('index.html'), 'index.html não gerado');
console.log(`✓ SEO: ${urls.length} URLs no sitemap, canonical e fichas verificadas`);
