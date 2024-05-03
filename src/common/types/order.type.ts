import { Outfit } from './outfit.type';
import { Store } from './store.type';
import { User } from './user.type';

export enum OrderStatus {
  ACCEPTED = 'accepted',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  PENDING = 'pending',
}

export interface Order {
  id: string;
  address: string;
  created_at: string;
  latitude: number;
  longitude: number;
  order_item_details: string;
  order_number: string;
  quantity: number;
  status: OrderStatus;
  total_price: number;

  order_item_id: string;
  store_id: string;
  order_by_id: string;
  store: Store;
  order_by: User;
  order_item: Outfit;
}
