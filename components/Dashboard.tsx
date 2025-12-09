import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { DollarSign, Activity, Users, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
import StatsCard from './StatsCard';
import { MOCK_REVENUE_DATA } from '../constants';
import { generateFinancialInsight } from '../services/aiService';

const Dashboard: React.FC = () => {
  const [insight, setInsight] = useState<string>("Analyzing real-time hospital data stream...");
  const [loadingAI, setLoadingAI] = useState<boolean>(true);

  useEffect(() => {
    // Simulate initial AI load
    const fetchInsight = async () => {
      setLoadingAI(true);
      const promptData = "Revenue for June is 590k, Expenses 410k. Orthopedics department utilization is up 15%. Drug costs stable.";
      const aiText = await generateFinancialInsight(promptData);
      setInsight(aiText);
      setLoadingAI(false);
    };

    fetchInsight();
  }, []);

  const stats = [
    { name: 'Total Revenue', value: 2450000, change: 12.5, trend: 'up' as const },
    { name: 'Active Patients', value: 142, change: 5.2, trend: 'up' as const },
    { name: 'Avg. Occupancy', value: 88, change: -2.1, trend: 'down' as const },
    { name: 'Anomaly Score', value: 4, change: 0, trend: 'neutral' as const },
  ];

  const icons = [
    <DollarSign key="1" size={24} />,
    <Users key="2" size={24} />,
    <Activity key="3" size={24} />,
    <AlertTriangle key="4" size={24} />,
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* AI Insight Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-1 shadow-lg shadow-indigo-200">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-start space-x-4 text-white">
            <div className="p-2 bg-white/20 rounded-lg shrink-0 animate-pulse">
                <Sparkles size={24} />
            </div>
            <div className="flex-1">
                <h3 className="font-bold text-lg mb-1 flex items-center">
                    HOSPI-A.I. Executive Summary
                    {loadingAI && <RefreshCw className="ml-2 animate-spin" size={16} />}
                </h3>
                <p className="text-indigo-50 leading-relaxed text-sm opacity-90">
                    {insight}
                </p>
            </div>
            <button className="px-4 py-2 bg-white text-indigo-700 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors">
                Deep Analysis
            </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} data={stat} icon={icons[idx]} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
                <h3 className="text-lg font-bold text-slate-800">Financial Performance</h3>
                <p className="text-sm text-slate-500">Revenue vs. Operational Expenses</p>
            </div>
            <select className="bg-slate-50 border-none text-sm text-slate-600 rounded-lg px-3 py-2 outline-none">
                <option>Last 6 Months</option>
                <option>This Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_REVENUE_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0d9488" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#0d9488" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#0d9488" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="expenses" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorExp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Secondary Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Patient Demographics</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                  { name: 'Gen', value: 400 },
                  { name: 'Ortho', value: 300 },
                  { name: 'Neuro', value: 200 },
                  { name: 'Cardio', value: 278 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
