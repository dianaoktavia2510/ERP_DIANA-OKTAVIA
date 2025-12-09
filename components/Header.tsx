import React from 'react';
import { Search, Bell, HelpCircle } from 'lucide-react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10 w-full">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 capitalize tracking-tight">{title}</h2>
        <p className="text-xs text-slate-400 mt-0.5">Welcome back, system operational normal.</p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Search patient, ID, or invoice..."
            className="pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-full text-sm text-slate-700 w-64 focus:ring-2 focus:ring-teal-500/50 focus:bg-white transition-all outline-none"
          />
        </div>

        <button className="relative p-2 text-slate-500 hover:text-teal-600 transition-colors hover:bg-slate-50 rounded-full">
          <Bell size={20} />
          <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <button className="p-2 text-slate-500 hover:text-teal-600 transition-colors hover:bg-slate-50 rounded-full">
            <HelpCircle size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
