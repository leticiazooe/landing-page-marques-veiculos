export const contact = {
  company: 'Marques Veículos Garagem',
  city: 'Ibitinga, São Paulo',
  phoneDisplay: '(16) 99641-4542',
  phoneE164: '+5516996414542',
  address: 'R. Valentina Minzone Palanque, Ibitinga, SP, 14940-000',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Rua%20Valentina%20Minzone%20Palanque%2C%20Ibitinga%2C%20SP',
  schedule: [
    { days: 'Segunda a sexta', hours: '08:00 – 17:00' },
    { days: 'Sábado', hours: '08:00 – 13:00' },
    { days: 'Domingo', hours: 'Fechado' },
  ],
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/5516996414542?text=${encodeURIComponent(message)}`;
}

export type VehicleCategory = 'suv' | 'sedan' | 'esportivo';

export interface VehicleCollection {
  id: VehicleCategory;
  name: string;
  descriptor: string;
  subtitle: string;
  image: string;
  position: string;
}

// Categorias de apresentação, não veículos disponíveis para venda.
// Fotografias de terceiros são ilustrativas; disponibilidade deve ser confirmada com a garagem.
export const collections: VehicleCollection[] = [
  {
    id: 'suv',
    name: 'SUVs',
    descriptor: 'Espaço para ir além',
    subtitle: 'Modelos para diferentes trajetos e rotinas.',
    image: 'https://images.unsplash.com/photo-1660108407012-22a8af96e999?auto=format&fit=crop&w=1200&q=85',
    position: 'center',
  },
  {
    id: 'sedan',
    name: 'Sedãs',
    descriptor: 'Conforto em movimento',
    subtitle: 'Opções para quem valoriza dirigir.',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
    position: 'center',
  },
  {
    id: 'esportivo',
    name: 'Esportivos',
    descriptor: 'Design que marca presença',
    subtitle: 'Para quem gosta da experiência ao volante.',
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1200&q=85',
    position: 'center',
  },
];

export const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Veículos', href: '#veiculos' },
  { label: 'A garagem', href: '#garagem' },
  { label: 'Localização', href: '#localizacao' },
] as const;
