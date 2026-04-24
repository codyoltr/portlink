import axios from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken, clearTokens } from '../utils/tokenHelper';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5265/api'; 

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized hatası aldıysak ve henüz retry denemediysek
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          // Sonsuz döngüden kaçınmak için kendi instance'ımızı değil, sade axios kullanıyoruz
          const refreshResponse = await axios.post(`${baseURL}/auth/refresh`, {
            refreshToken
          });

          // API wrapper modelini çözümle: response.data.data.accessToken
          const newAccessToken = refreshResponse.data?.data?.accessToken;
          const newRefreshToken = refreshResponse.data?.data?.refreshToken;

          if (newAccessToken) {
            setAccessToken(newAccessToken);
            if (newRefreshToken) setRefreshToken(newRefreshToken);

            // Başarısız olan isteğin header'ını yeni token ile güncelle
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            
            // İsteği tekrar gönder
            return apiClient(originalRequest);
          }
        } catch (refreshError) {
          // Refresh token de süresini doldurmuş veya geçersiz
          console.warn("Oturum süresi doldu. Çıkış yapılıyor.");
          clearTokens();
          window.location.href = '/';
          return Promise.reject(refreshError);
        }
      } else {
        // Elimizde refresh token yoksa direkt login'e at
        clearTokens();
        window.location.href = '/';
      }
    }

    // Diğer global hata durumları
    if (error.response?.status === 500) {
      console.error('Sunucu hatası (500):', error.response.data);
    } else if (error.response?.status === 403) {
      console.warn('Erişim reddedildi (403): Bu işlem için yetkiniz yok.');
    }

    return Promise.reject(error);
  }
);
