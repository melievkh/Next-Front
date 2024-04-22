export interface SignInFormValues {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  userId: string;
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

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  error: any;
  pending: boolean;
}
