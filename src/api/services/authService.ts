import { apiClient } from '../axios';

export interface User {
  id: string;
  email: string;
  role: 'agent' | 'subcontractor';
  isVerified: boolean;
  profile: {
    fullName: string;
    companyName: string;
    phone: string;
    country: string;
    city: string;
    logoUrl: string | null;
    rating: number;
    totalJobs: number;
    isVerified: boolean;
  };
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginResponseData extends AuthTokens {
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string | null;
  data: T;
}

export const authService = {
  login: async (credentials: any): Promise<LoginResponseData> => {
    // API wrapper ApiResponse<T> olarak döndüğü için tipi belirtiyoruz
    const response = await apiClient.post<ApiResponse<LoginResponseData>>('/auth/login', credentials);
    
    // axios'un response.data'sı içinden bizim wrapper'ın data'sını dönüyoruz
    return response.data.data;
  },

  registerAgent: async (data: any): Promise<LoginResponseData> => {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>('/auth/register/agent', data);
    return response.data.data;
  },

  registerSubcontractor: async (data: any): Promise<LoginResponseData> => {
    const response = await apiClient.post<ApiResponse<LoginResponseData>>('/auth/register/subcontractor', data);
    return response.data.data;
  },

  logout: async () => {
    // İhtiyaç varsa backend tarafında da token'ı invalide etmek için bir endpoint çağrılabilir
    // await apiClient.post('/auth/logout');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  }
};
