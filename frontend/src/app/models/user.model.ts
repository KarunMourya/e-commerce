export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterAuthResponse {
  message: string;
  data?: {
    id: string;
    name: string;
    email: string;
  };
}

export interface LoginAuthResponse {
  message: string;
  data?: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}