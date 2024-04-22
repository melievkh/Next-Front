export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
}

export interface User {
  _id: string;
  email: string;
  role: UserRole;
  telegram_id: string;
  first_name: string;
  username: string;
  phone_number: string;
}
