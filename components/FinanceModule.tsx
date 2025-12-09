import React, { useState } from 'react';
import { MOCK_JOURNAL_ENTRIES } from '../constants';
import { ShieldAlert, CheckCircle, FileText, Filter, Plus, X, Sparkles, Loader2 } from 'lucide-react';
import { analyzeJournalEntry } from '../services/aiService';
import { JournalEntry } from '../types';

const FinanceModule: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [entries, setEntries] = useState<JournalEntry[]>(MOCK_JOURNAL_ENTRIES);
  
  // Form State
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState<'debit' | 'credit'>('debit');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ riskScore: number; reason: string } | null>(null);

  const handleAnalyze = async () => {
    if (!description || !amount) return;
    setIsAnalyzing(true);
    const result = await analyzeJournalEntry(description, parseFloat(amount), type);
    setAnalysisResult(result);
    setIsAnalyzing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: JournalEntry = {
      id: `JE-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`,
      date: new Date().toISOString().split('T')[0],
      description,
      reference: `MANUAL-${Math.floor(Math.random() * 100)}`,
      debit: type === 'debit' ? parseFloat(amount) : 0,
      credit: type === 'credit' ? parseFloat(amount) : 0,
      status: (analysisResult?.riskScore || 0) > 50 ? 'Review' : 'Posted',
      riskScore: analysisResult?.riskScore || 0,
    };
    
    setEntries([newEntry, ...entries]);
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setAnalysisResult(null);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800">General Ledger & Journal Entries</h2>
          <p className="text-sm text-slate-500">Automated posting and anomaly detection</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 text-sm hover:bg-slate-50 transition-colors">
            <Filter size={16} />
            <span>Filter</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 shadow-lg shadow-teal-200 transition-all active:scale-95"
          >
            <Plus size={16} />
            <span>New Journal Entry</span>
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
            {entries.map((entry) => (
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

      {/* New Journal Entry Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm transition-all">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">New Journal Entry</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <input 
                  type="text" 
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Monthly Consultant Fees"
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($)</label>
                  <input 
                    type="number" 
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Type</label>
                  <select 
                    value={type}
                    onChange={(e) => setType(e.target.value as 'debit' | 'credit')}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all outline-none"
                  >
                    <option value="debit">Debit</option>
                    <option value="credit">Credit</option>
                  </select>
                </div>
              </div>

              {/* AI Analysis Section */}
              <div className="pt-2">
                {!analysisResult ? (
                  <button 
                    type="button"
                    onClick={handleAnalyze}
                    disabled={!description || !amount || isAnalyzing}
                    className="w-full flex items-center justify-center space-x-2 py-3 border border-indigo-100 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors disabled:opacity-50"
                  >
                    {isAnalyzing ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
                    <span className="font-semibold text-sm">Analyze Risk with Gemini AI</span>
                  </button>
                ) : (
                  <div className={`p-4 rounded-xl border ${analysisResult.riskScore > 50 ? 'bg-rose-50 border-rose-100' : 'bg-emerald-50 border-emerald-100'}`}>
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-xs font-bold uppercase tracking-wide ${analysisResult.riskScore > 50 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        Risk Score: {analysisResult.riskScore}/100
                      </span>
                    </div>
                    <p className={`text-sm ${analysisResult.riskScore > 50 ? 'text-rose-700' : 'text-emerald-700'}`}>
                      {analysisResult.reason}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={!description || !amount}
                  className="flex-1 py-2.5 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 shadow-lg shadow-teal-200 transition-colors disabled:opacity-50"
                >
                  Post Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceModule;