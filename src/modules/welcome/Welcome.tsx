import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Flame, BookOpen, Map, Settings, Anchor } from 'lucide-react';
import AgencyMap from '../../components/ui/AgencyMap';

export default function Welcome() {
  return (
    <div className="min-h-full bg-gray-50 flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
      {/* Background Decorative Graphic */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] rounded-full bg-indigo-100/40 blur-[80px]" />
      </div>

      <div className="max-w-7xl w-full z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Side: Information & Links */}
        <div className="space-y-8">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
              <Anchor className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-loose">
              Liman ve Acenta Sistemine <br className="hidden md:block" /> Hoş Geldiniz
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-xl leading-relaxed">
              Limanlardaki acenta faaliyetlerini tek bir merkezden kolayca yönetin, gemi operasyonlarını izleyin ve sistem durumunu anlık takip edin.
            </p>
          </motion.div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <Link to="/dashboard" className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all group">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors shrink-0">
                <Settings className="w-6 h-6" />
              </div>
              <span className="font-semibold text-gray-800">Yönetim Paneli</span>
            </Link>
            
            <Link to="/assets" className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-orange-200 transition-all group">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors shrink-0">
                <Flame className="w-6 h-6" />
              </div>
              <span className="font-semibold text-gray-800">Cihaz / Varlıklar</span>
            </Link>

            <Link to="/map" className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-indigo-200 transition-all group">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors shrink-0">
                <Map className="w-6 h-6" />
              </div>
              <span className="font-semibold text-gray-800">Tesis Haritası</span>
            </Link>

            <Link to="/training" className="flex items-center gap-4 p-5 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all group">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:bg-green-50 group-hover:text-green-600 transition-colors shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="font-semibold text-gray-800">Eğitimler</span>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Interactive Agency Map Component */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.6, delay: 0.3 }}
           className="w-full flex justify-center"
        >
          <AgencyMap />
        </motion.div>
      </div>
    </div>
  );
}
