import React from 'react';
import { MOCK_INVENTORY } from '../constants';
import { Package, AlertCircle, TrendingUp } from 'lucide-react';

const InventoryModule: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
         <div>
            <h2 className="text-xl font-bold text-slate-800">Pharmacy & Supply Chain</h2>
            <p className="text-sm text-slate-500">Real-time stock tracking with batch control</p>
         </div>
         <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-200">
            Create Purchase Order
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-teal-200">
            <div className="flex items-center justify-between mb-4">
                <Package className="text-teal-100" />
                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">LIVE</span>
            </div>
            <p className="text-teal-100 text-sm">Total SKU Value</p>
            <h3 className="text-3xl font-bold mt-1">$1.2M</h3>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <p className="text-slate-500 text-sm font-medium">Low Stock Alerts</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">12</h3>
            <p className="text-xs text-rose-500 flex items-center mt-2 font-semibold">
                <AlertCircle size={12} className="mr-1" /> Action Required
            </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <p className="text-slate-500 text-sm font-medium">Expiring Soon (30d)</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">8</h3>
             <p className="text-xs text-amber-500 flex items-center mt-2 font-semibold">
                 bato-992, bat-112...
            </p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <p className="text-slate-500 text-sm font-medium">Turnover Rate</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">14%</h3>
             <p className="text-xs text-emerald-500 flex items-center mt-2 font-semibold">
                <TrendingUp size={12} className="mr-1" /> +2.4% vs last month
            </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase">Item Name</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase">Batch #</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase">Expiry</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase text-right">Quantity</th>
                    <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase text-center">Status</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
                {MOCK_INVENTORY.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                        <td className="py-4 px-6">
                            <p className="text-sm font-bold text-slate-800">{item.name}</p>
                            <p className="text-xs text-slate-400">{item.id}</p>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600 font-mono">{item.batchNumber}</td>
                        <td className="py-4 px-6 text-sm text-slate-600">{item.expiryDate}</td>
                        <td className="py-4 px-6 text-sm text-slate-800 font-bold text-right">{item.quantity.toLocaleString()} <span className="text-slate-400 font-normal text-xs">{item.unit}</span></td>
                        <td className="py-4 px-6 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                item.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' :
                                item.status === 'Expired' ? 'bg-rose-100 text-rose-700' :
                                'bg-emerald-100 text-emerald-700'
                            }`}>
                                {item.status}
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryModule;
