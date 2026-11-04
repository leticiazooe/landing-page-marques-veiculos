import type { Vehicle } from '../data/site';

export const SITE_URL = 'https://www.marquesveiculos.com.br';
export const HOME_TITLE = 'Marques Veículos | Garagem de Carros em Ibitinga, SP';
export const HOME_DESCRIPTION = 'Procura uma garagem de carros em Ibitinga e região? Conheça a Marques Veículos, consulte os veículos disponíveis e fale com nossa equipe pelo WhatsApp.';

export function vehiclePath(vehicle: Vehicle): string {
  const slug = [vehicle.make, vehicle.model, vehicle.year]
    .join(' ')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 90)
    .replace(/-$/g, '');
  return `/veiculos/${slug}-${encodeURIComponent(vehicle.id)}/`;
}

export function vehicleTitle(vehicle: Vehicle): string {
  return `${vehicle.make} ${vehicle.model} ${vehicle.year} em Ibitinga | Marques Veículos`;
}

export function vehicleDescription(vehicle: Vehicle): string {
  return `Confira ${vehicle.make} ${vehicle.model} ${vehicle.year}, ${vehicle.km}, ${vehicle.transmission} e preço de ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(vehicle.price)} na Marques Veículos em Ibitinga, SP. Consulte disponibilidade.`;
}
