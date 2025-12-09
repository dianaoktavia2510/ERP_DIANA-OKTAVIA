import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { MetricData } from '../types';

interface StatsCardProps {
  data: MetricData;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ data, icon }) => {
  const isPositive = data.trend === 'up';
  const isNeutral = data.trend === 'neutral';

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-slate-50 rounded-xl text-teal-600">
          {icon}
        </div>
        <span
          className={`flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
            isPositive
              ? 'bg-emerald-50 text-emerald-600'
              : isNeutral
              ? 'bg-slate-100 text-slate-600'
              : 'bg-rose-50 text-rose-600'
          }`}
        >
          {isPositive ? <ArrowUpRight size={14} /> : isNeutral ? <Minus size={14} /> : <ArrowDownRight size={14} />}
          <span>{Math.abs(data.change)}%</span>
        </span>
      </div>
      <div>
        <p className="text-slate-500 text-sm font-medium">{data.name}</p>
        <h3 className="text-2xl font-bold text-slate-800 mt-1">{data.value.toLocaleString()}</h3>
      </div>
    </div>
  );
};

export default StatsCard;
