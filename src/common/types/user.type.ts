export interface User {
  id: string;
  telegram_id: string;
  first_name: string;
  username: string;
  phone_number: string;
  address_id?: string | null;
}
