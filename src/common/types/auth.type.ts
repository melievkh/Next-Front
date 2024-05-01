export interface SignInFormValues {
  email: string;
  password: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponse {
  tokens: Tokens;
  userId: string;
  role: Role;
}

export interface LoginParams {
  email: string;
  password: string;
}

export enum Role {
  ADMIN = 'admin',
  STORE = 'store',
}

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  role: Role | null;
  error: any;
  pending: boolean;
}
