import React from 'react';
import { MOCK_JOURNAL_ENTRIES } from '../constants';
import { ShieldAlert, CheckCircle, FileText, Filter } from 'lucide-react';

const FinanceModule: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">General Ledger & Journal Entries</h2>
          <p className="text-sm text-slate-500">Automated posting and anomaly detection</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm hover:bg-slate-50">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 shadow-lg shadow-teal-200">
            + New Journal Entry
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Reference ID</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Description</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Debit</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Credit</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">AI Risk Score</th>
              <th className="py-4 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_JOURNAL_ENTRIES.map((entry) => (
              <tr key={entry.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-6 text-sm font-medium text-slate-700">{entry.reference}</td>
                <td className="py-4 px-6 text-sm text-slate-500">{entry.date}</td>
                <td className="py-4 px-6 text-sm text-slate-800 font-medium">
                    <div className="flex items-center space-x-2">
                        <FileText size={14} className="text-slate-400" />
                        <span>{entry.description}</span>
                    </div>
                </td>
                <td className="py-4 px-6 text-sm text-slate-600 text-right font-mono">
                    {entry.debit > 0 ? entry.debit.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '-'}
                </td>
                <td className="py-4 px-6 text-sm text-slate-600 text-right font-mono">
                    {entry.credit > 0 ? entry.credit.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '-'}
                </td>
                <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center space-x-1">
                        <div className={`w-16 h-2 rounded-full overflow-hidden bg-slate-100`}>
                            <div 
                                className={`h-full ${entry.riskScore > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`} 
                                style={{ width: `${entry.riskScore}%` }}
                            />
                        </div>
                        <span className={`text-xs font-bold ${entry.riskScore > 50 ? 'text-rose-500' : 'text-slate-400'}`}>
                            {entry.riskScore}
                        </span>
                    </div>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    entry.status === 'Posted' ? 'bg-emerald-100 text-emerald-800' :
                    entry.status === 'Review' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {entry.status === 'Posted' && <CheckCircle size={12} className="mr-1" />}
                    {entry.status === 'Review' && <ShieldAlert size={12} className="mr-1" />}
                    {entry.status}
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

export default FinanceModule;
