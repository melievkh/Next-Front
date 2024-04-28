export interface SignInFormValues {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  userId: string;
  userRole: UserRole;
}

export interface RegisterResponse {
  message: string;
  success: boolean;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  email: string;
  password: string;
}

export enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  USER = 'user',
}

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  userRole: UserRole | null;
  error: any;
  pending: boolean;
}
