import { vehicles, type Vehicle, type VehicleCategory } from '../data/site';
import { catalogConfigured, supabase } from './supabase';

export type VehicleStatus = 'draft' | 'published' | 'sold';

export interface VehicleRow {
  id: string;
  make: string;
  model: string;
  trim: string;
  category: VehicleCategory;
  year: string;
  km: string;
  transmission: string;
  transmission_detail: string;
  fuel: string;
  engine: string;
  doors: string;
  color: string;
  drive: string;
  price: number;
  image: string;
  gallery: string[];
  description: string;
  equipment: string[];
  payment_methods: string[];
  is_conceptual: boolean;
  status: VehicleStatus;
  featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export function rowToVehicle(row: VehicleRow): Vehicle {
  return {
    id: row.id,
    make: row.make,
    model: row.model,
    trim: row.trim,
    category: row.category,
    year: row.year,
    km: row.km,
    transmission: row.transmission,
    transmissionDetail: row.transmission_detail,
    fuel: row.fuel,
    engine: row.engine,
    doors: row.doors,
    color: row.color,
    drive: row.drive,
    price: Number(row.price),
    image: row.image,
    gallery: row.gallery ?? [],
    description: row.description,
    equipment: row.equipment ?? [],
    paymentMethods: row.payment_methods ?? [],
    conceptual: row.is_conceptual,
    illustrative: false,
    status: row.status,
  };
}

/** Only published records leave the database. RLS enforces this for visitors. */
export async function getPublicVehicles(): Promise<Vehicle[]> {
  if (!catalogConfigured || !supabase) return vehicles;
  const { data, error } = await supabase
    .from('marques_vehicles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });
  if (error) throw error;
  const published = ((data ?? []) as VehicleRow[]).map(rowToVehicle);
  // Preserve the original demonstration cards without changing the real Supabase inventory.
  // Demonstration vehicles are explicitly labeled as illustrative in the UI.
  const realIds = new Set(published.map(vehicle => vehicle.id));
  return [...published, ...vehicles.filter(vehicle => !realIds.has(vehicle.id))];
}
