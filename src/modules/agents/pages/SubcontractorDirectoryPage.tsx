import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { agencyService } from '../../../services/agencyService';
import { Subcontractor } from '../../../types/agency.types';
import SubcontractorCard from '../../../components/ui/SubcontractorCard';

const SubcontractorDirectoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubcontractors();
  }, []);

  const fetchSubcontractors = async () => {
    setLoading(true);
    const data = await agencyService.getSubcontractors();
    setSubcontractors(data);
    setLoading(false);
  };

  const filteredData = subcontractors.filter(item => 
    item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (item.city && item.city.toLowerCase().includes(searchTerm.toLowerCase())) ||
    item.expertiseTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700 px-4">
      
      {/* BAŞLIK ALANI */}
      <div className="space-y-1 py-2">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Taşeron Rehberi</h2>
        <p className="text-slate-500 text-sm font-medium">Kayıtlı hizmet sağlayıcıları ve uzmanlık envanterini buradan takip edebilirsiniz.</p>
      </div>

      {/* ÜST ÖZET KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between group">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4"><span className="material-icons-round">business</span></div>
          <div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Toplam Taşeron</p>
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter">{subcontractors.length}</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-4"><span className="material-icons-round">verified</span></div>
          <div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Onaylı Taşeronlar</p>
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter">{subcontractors.filter(s => s.isVerified).length}</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mb-4"><span className="material-icons-round">star_rate</span></div>
          <div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Ort. Performans</p>
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter">
              {subcontractors.length > 0 ? (subcontractors.reduce((acc, curr) => acc + curr.rating, 0) / subcontractors.length).toFixed(1) : '0'}
            </h3>
          </div>
        </div>
      </div>

      {/* ARAMA BARI */}
      <div className="bg-white p-4 rounded-[24px] shadow-sm border border-slate-100">
        <div className="relative w-full">
          <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">search</span>
          <input 
            type="text" 
            placeholder="Firma adı, uzmanlık veya bölge ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-xl outline-none text-sm font-medium border border-transparent focus:bg-white focus:border-primary/10 transition-all placeholder:text-slate-300"
          />
        </div>
      </div>

      {/* KARTLAR */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {filteredData.map((item) => (
            <SubcontractorCard 
              key={item.id} 
              data={item} 
              onView={(id) => navigate(`/dashboard/agent/subcontractor-directory/${id}`)} 
            />
          ))}
          {filteredData.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500">
              <span className="material-icons-round text-4xl mb-2 text-slate-300">search_off</span>
              <p>Arama kriterlerinize uygun taşeron bulunamadı.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SubcontractorDirectoryPage;
