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

  product: {
    id: string;
    code: string;
    price: number;
    title: string;
    brand: string;
  };
}
