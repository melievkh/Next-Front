export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export interface Order {
  _id: string;
  order_number: string;
  status: OrderStatus;
  quantity: number;
  size: string;
  color: string;
  created_at: string;
  address: string;
  address_longitude: number;
  address_latitude: number;
  order_by: {
    _id: string;
    phone_number: string;
  };
  deliver: {
    _id: string;
    phone_number: string;
  };
  product: {
    _id: string;
    code: string;
    price: number;
    title: string;
    brand: string;
  };
}
