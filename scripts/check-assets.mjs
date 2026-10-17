import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve(import.meta.dirname, '..');
const required = [
  'index.html', 'src/App.tsx', 'src/main.tsx', 'src/index.css',
  'src/data/site.ts', 'public/favicon.svg',
  'public/images/logo-marques.png', 'public/images/capa-marques.webp',
  'public/images/og-marques.webp',
  'public/images/honda-civic.webp', 'public/images/volvo-xc60.webp', 'public/images/pluto.webp',
];
for (const file of required) {
  const fullPath = resolve(root, file);
  assert(existsSync(fullPath), `Arquivo ausente: ${file}`);
  assert(statSync(fullPath).size > 0, `Arquivo vazio: ${file}`);
}
const hero = readFileSync(resolve(root, 'src/components/Hero.tsx'), 'utf8');
assert(hero.includes('/images/capa-marques.webp'), 'A capa do usuário não está conectada ao hero.');
const data = readFileSync(resolve(root, 'src/data/site.ts'), 'utf8');
assert(data.includes('99641-4542'), 'Telefone da garagem ausente.');
assert(data.includes('Valentina Minzone Palanque'), 'Endereço da garagem ausente.');
console.log(`✓ ${required.length} arquivos verificados`);
console.log('✓ Foto de capa conectada ao hero');
console.log('✓ Contatos e endereço presentes');

const collection = readFileSync(resolve(root, 'src/components/Collection.tsx'), 'utf8');
const details = readFileSync(resolve(root, 'src/components/VehicleDetails.tsx'), 'utf8');
assert(collection.includes('Falar no WhatsApp') && collection.includes('Mais detalhes'), 'CTA de veículos ausentes');
assert(details.includes('Ficha técnica') && details.includes('Formas de pagamento'), 'Ficha e pagamentos ausentes');
assert(data.includes('Pluto') && data.includes('Volvo') && data.includes('Civic'), 'Veículos ausentes');
console.log('✓ 3 veículos e fichas de detalhe presentes');
console.log('✓ Botões de detalhes, WhatsApp e seção de pagamentos presentes');
