export interface FilterStoresOptions {
  limit?: number;
  page?: number;
  storename?: string | null;
  address?: string | null;
  available?: boolean | null;
}

export interface Address {
  id: string;
  city: string;
  country: string;
  description: string | null;
  district: string | null;
  latitude: number;
  longitude: number;
  street: string | null;
}

export interface Store {
  id: string;
  available: boolean;
  category: string;
  created_at: string;
  email: string;
  password: string;
  photo_url: string;
  phone_number: string[];
  role: StoreRole;
  storename: string;
  type: StoreType;

  address_id: string | null;
  address?: Address | null;
}

export enum StoreCategory {
  OUTFITS = 'outfits',
}

export enum StoreRole {
  ADMIN = 'admin',
  STORE = 'store',
}

export enum StoreType {
  ONLINE = 'online',
  PHYSICAL = 'physical',
}
