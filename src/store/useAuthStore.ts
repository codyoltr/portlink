import { create } from 'zustand';
import { authService, type User } from '../api/services/authService';
import { setAccessToken, setRefreshToken, clearTokens, getAccessToken } from '../utils/tokenHelper';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<User>;
  registerAgent: (data: any) => Promise<void>;
  registerSubcontractor: (data: any) => Promise<void>;
  logout: (redirect?: boolean) => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!getAccessToken(),
  isLoading: false,

  login: async (credentials) => {
    try {
      set({ isLoading: true });
      const data = await authService.login(credentials);
      
      // Tokenları helpers aracılığıyla kaydet
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      
      set({ 
        user: data.user, 
        isAuthenticated: true,
        isLoading: false
      });
      return data.user;
    } catch (error) {
      set({ isLoading: false });
      console.error('Login error:', error);
      throw error; // UI bileşenine hatayı fırlat
    }
  },

  registerAgent: async (data) => {
    try {
      set({ isLoading: true });
      const responseData = await authService.registerAgent(data);
      setAccessToken(responseData.accessToken);
      setRefreshToken(responseData.refreshToken);
      set({ user: responseData.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Agent register error:', error);
      throw error;
    }
  },

  registerSubcontractor: async (data) => {
    try {
      set({ isLoading: true });
      const responseData = await authService.registerSubcontractor(data);
      setAccessToken(responseData.accessToken);
      setRefreshToken(responseData.refreshToken);
      set({ user: responseData.user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      console.error('Subcontractor register error:', error);
      throw error;
    }
  },

  logout: (redirect = true) => {
    clearTokens();
    set({ user: null, isAuthenticated: false });
    authService.logout().catch(console.error); // Opsiyonel backend çağrısı
    if (redirect) {
      window.location.href = '/';
    }
  },

  // Sayfa yüklendiğinde eldeki token ile kullanıcı bilgilerini getirmek için
  checkAuth: async () => {
    if (!getAccessToken()) return;
    
    try {
      set({ isLoading: true });
      const user = await authService.getCurrentUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      console.error('Oturum süresi dolmuş veya geçersiz.', error);
      clearTokens();
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  }
}));
