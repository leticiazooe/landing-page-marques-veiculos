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

export type VehicleCategory = 'sedan' | 'suv' | 'hatch';
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
};

/** Conteúdo 100% DEMONSTRATIVO: não é estoque ou anúncio comercial real. */
export const vehicles: Vehicle[] = [
  {
    id: 'honda-civic', make: 'Honda', model: 'Civic', trim: 'Touring 1.5 Turbo', category: 'sedan',
    year: '2021/2021', km: '46.000 km', transmission: 'Automático', transmissionDetail: 'CVT',
    fuel: 'Gasolina', engine: '1.5 Turbo', doors: '4 portas', color: 'Preto', drive: 'Dianteira',
    price: 139900, image: '/images/honda-civic.webp',
    description: 'Um sedã de presença marcante, com proposta de conforto e tecnologia para o dia a dia. Esta ficha é um exemplo de apresentação e não descreve uma unidade disponível.',
    equipment: ['Ar-condicionado digital', 'Bancos em couro', 'Central multimídia', 'Câmera de ré', 'Controle de estabilidade', 'Piloto automático'],
  },
  {
    id: 'volvo-xc60', make: 'Volvo', model: 'XC60', trim: 'T5 Momentum 2.0', category: 'suv',
    year: '2020/2020', km: '56.000 km', transmission: 'Automático', transmissionDetail: '8 marchas',
    fuel: 'Gasolina', engine: '2.0 Turbo', doors: '4 portas', color: 'Preto', drive: 'Sob consulta',
    price: 189900, image: '/images/volvo-xc60.webp',
    description: 'Um SUV sofisticado, com espaço e conforto. Ano, versão, quilometragem e itens foram escolhidos para ilustrar o formato de uma ficha comercial.',
    equipment: ['Bancos em couro', 'Ar-condicionado digital', 'Sensores de estacionamento', 'Central multimídia', 'Assistente de permanência em faixa', 'Controle de estabilidade'],
  },
  {
    id: 'pluto-concept', make: 'Pluto', model: 'Concept', trim: '1.0 Turbo AT', category: 'hatch',
    year: '2023/2024', km: '21.500 km', transmission: 'Automático', transmissionDetail: '6 marchas (ilustrativo)',
    fuel: 'Flex (ilustrativo)', engine: '1.0 Turbo (ilustrativo)', doors: '4 portas', color: 'Preto', drive: 'Dianteira (ilustrativo)',
    price: 92900, image: '/images/pluto.webp', conceptual: true,
    description: 'Veículo conceitual criado exclusivamente para apresentar o terceiro card do catálogo. Pluto Concept não corresponde a um modelo identificado em estoque.',
    equipment: ['Ar-condicionado', 'Central multimídia', 'Câmera de ré', 'Rodas de liga leve', 'Sensor de estacionamento', 'Controle de estabilidade'],
  },
];

export const paymentMethods = [
  { title: 'PIX ou transferência', description: 'Pagamento à vista, sujeito à confirmação dos dados e condições pela garagem.' },
  { title: 'Financiamento', description: 'Consultar disponibilidade, análise de crédito, entrada, taxa e instituição financeira.' },
  { title: 'Veículo na troca', description: 'Possibilidade a consultar, mediante avaliação do veículo e negociação individual.' },
];

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(price);

export const navLinks = [
  { label: 'Início', href: '/#inicio' },
  { label: 'Veículos', href: '/#veiculos' },
  { label: 'A garagem', href: '/#garagem' },
  { label: 'Localização', href: '/#localizacao' },
] as const;
