import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import assert from 'node:assert/strict';

const dist = resolve('dist');
const assets = await readdir(join(dist, 'assets'));
const main = assets.find(name => /^index-[\w-]+\.js$/.test(name));
const css = assets.find(name => /^index-[\w-]+\.css$/.test(name));
assert(main && css, 'Assets principais do Vite não encontrados');
const jsBytes = (await stat(join(dist, 'assets', main))).size;
const cssBytes = (await stat(join(dist, 'assets', css))).size;
assert(jsBytes < 550000, `JS inicial acima do teto de 550 KB: ${jsBytes} bytes`);
assert(cssBytes < 100000, `CSS acima do teto de 100 KB: ${cssBytes} bytes`);

const html = await readFile(join(dist, 'index.html'), 'utf8');
assert(html.includes('rel="preload" href="/images/capa-marques.webp"'), 'Preload da capa/LCP ausente');
assert(!html.includes('fonts.googleapis.com/css2?'), 'CSS remoto de fontes voltou a bloquear o HTML');
const logos = await readdir(join(dist, 'images', 'brands'));
assert.equal(logos.filter(name => name.endsWith('.svg')).length, 10, 'Os 10 SVGs da faixa não foram exportados');
console.log(`✓ Performance budget: JS inicial ${Math.round(jsBytes / 1024)} KiB / 537 KiB; CSS ${Math.round(cssBytes / 1024)} KiB / 98 KiB; 10 logos SVGs`);
