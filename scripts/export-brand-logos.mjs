/**
 * Gera uma vez, durante o build, somente os 10 SVGs utilizados pela faixa.
 * O pacote @cardog-icons/react não será enviado ao navegador.
 */
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import {
  AudiIconDark, BMWIconDark, ChevroletIconDark, FiatIconDark, HondaIconDark,
  HyundaiIconDark, JeepIconDark, ToyotaIconDark, VolkswagenIconDark, VolvoIconDark,
} from '@cardog-icons/react';

const logos = [
  ['audi', AudiIconDark],
  ['bmw', BMWIconDark],
  ['chevrolet', ChevroletIconDark],
  ['fiat', FiatIconDark],
  ['honda', HondaIconDark],
  ['hyundai', HyundaiIconDark],
  ['jeep', JeepIconDark],
  ['toyota', ToyotaIconDark],
  ['volkswagen', VolkswagenIconDark],
  ['volvo', VolvoIconDark],
];
const dir = path.resolve('public/images/brands');
await mkdir(dir, { recursive: true });
for (const [slug, Component] of logos) {
  let svg = renderToStaticMarkup(createElement(Component, { width: 80, height: 80, 'aria-hidden': true }));
  if (!svg.startsWith('<svg')) throw new Error('Ícone sem SVG: ' + slug);
  if (!svg.includes('xmlns=')) svg = svg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  await writeFile(path.join(dir, slug + '.svg'), svg + '\n', 'utf8');
}
console.log('✓ 10 logos automotivos exportados para SVG estático');
