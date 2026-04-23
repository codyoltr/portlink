import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Ship } from "lucide-react";

const AdminLoginPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Admin şifresi (güvenlik için environment variable'dan alınmalı)
  const ADMIN_PASSWORD = "admin123"; // TODO: .env'ye taşı

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulated delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (password === ADMIN_PASSWORD) {
      // Token'ı localStorage'a kaydet
      localStorage.setItem("adminToken", "true");
      localStorage.setItem("adminLoginTime", new Date().toISOString());
      navigate("/dashboard/admin");
    } else {
      setError("Şifre yanlış. Lütfen tekrar deneyiniz.");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      {/* Arka plan dekorasyonu */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Kart */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white p-3 rounded-xl shadow-lg">
              <Ship size={32} strokeWidth={2} />
            </div>
          </div>

          {/* Başlık */}
          <h1 className="text-3xl font-black text-gray-900 text-center mb-2 tracking-tight">
            Portlink
          </h1>
          <p className="text-center text-gray-500 font-medium mb-8">
            Admin Paneline Hoş Geldiniz
          </p>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Şifre Alanı */}
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-3">
                Admin Şifresi
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifrenizi giriniz..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 transition-colors font-medium"
                  disabled={loading}
                  autoFocus
                />
              </div>
            </div>

            {/* Hata Mesajı */}
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                <p className="text-red-700 font-medium text-sm">{error}</p>
              </div>
            )}

            {/* Giriş Butonu */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Giriş yapılıyor...</span>
                </>
              ) : (
                <>
                  <Lock size={20} />
                  <span>Admin Paneline Gir</span>
                </>
              )}
            </button>
          </form>

          {/* Alt metin */}
          <p className="text-center text-xs text-gray-500 mt-6 font-medium">
            PortLink Yönetim Sistemi © 2024
          </p>
        </div>

        {/* Bilgi kartı */}
        <div className="mt-6 bg-white/50 backdrop-blur-md rounded-xl p-4 border border-white/80">
          <p className="text-xs text-gray-600 text-center font-medium">
            Bu sayfa sadece yetkili yöneticiler içindir.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
