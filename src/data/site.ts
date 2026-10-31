export const contact = {
  company: 'Marques Veículos Garagem',
  city: 'Ibitinga, São Paulo',
  phoneDisplay: '(16) 99641-4542',
  phoneE164: '+5516996414542',
  address: 'R. Valentina Minzone Palanque, Ibitinga, SP, 14940-000',
  mapsUrl: 'https://maps.app.goo.gl/C5MeAGeo2HLYkg2dA',
  mapEmbedUrl: 'https://www.google.com/maps?q=Marques%20Ve%C3%ADculos%2C%20Rua%20Valentina%20Minzone%20Palanque%2C%20Ibitinga%2C%20SP%2C%20Brasil&z=16&output=embed',
  schedule: [
    { days: 'Segunda a sexta', hours: '08:00 – 18:00' },
    { days: 'Sábado', hours: '08:00 – 12:00' },
    { days: 'Domingo', hours: 'Fechado' },
  ],
} as const;

export function whatsappUrl(message: string): string {
  return `https://wa.me/5516996414542?text=${encodeURIComponent(message)}`;
}

export type VehicleCategory = 'sedan' | 'suv' | 'hatch' | 'picape' | 'esportivo' | 'outro';
export type Vehicle = {
  id: string;
  make: string;
  model: string;
  trim: string;
  category: VehicleCategory;
  year: string;
  km: string;
  transmission: string;
  transmissionDetail: string;
  fuel: string;
  engine: string;
  doors: string;
  color: string;
  drive: string;
  price: number;
  image: string;
  description: string;
  equipment: string[];
  conceptual?: boolean;
  illustrative?: boolean;
  gallery?: string[];
  paymentMethods?: string[];
  status?: 'draft' | 'published' | 'sold';
};

/** O catálogo público é alimentado exclusivamente pelo inventário do Supabase. */
export const vehicles: Vehicle[] = [];

export const paymentMethods = [
  { title: 'PIX ou transferência', description: 'Consulte a garagem sobre pagamento à vista e instruções para transferência.' },
  { title: 'Financiamento', description: 'Consulte a possibilidade de financiamento, entrada e condições de crédito.' },
  { title: 'Veículo na troca', description: 'Pergunte sobre a avaliação de um veículo usado como parte do pagamento.' },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(price);

export const navLinks = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Veículos', href: '/#veiculos' },
  { label: 'A garagem', href: '/#garagem' },
  { label: 'Localização', href: '/#localizacao' },
] as const;
