import { ArrowUpRight, ArrowDownRight } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: string | number;
  change?: string;
};

const StatsCard = ({ title, value, change }: StatsCardProps) => {
  const isPositive = change?.includes("+") || change?.includes("↑");
  
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Başlık */}
      <p className="text-sm font-medium text-gray-600 mb-3">{title}</p>
      
      {/* Ana Değer */}
      <h3 className="text-3xl font-black text-gray-900 mb-3">{value}</h3>
      
      {/* Değişim */}
      {change && (
        <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? (
            <ArrowUpRight size={16} className="flex-shrink-0" />
          ) : (
            <ArrowDownRight size={16} className="flex-shrink-0" />
          )}
          <span>{change}</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;