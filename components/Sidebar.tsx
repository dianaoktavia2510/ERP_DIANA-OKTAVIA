import React from 'react';
import { LayoutDashboard, Receipt, Users, Package, Settings, Activity } from 'lucide-react';
import { NavigationItem } from '../types';

interface SidebarProps {
  activeTab: NavigationItem;
  setActiveTab: (tab: NavigationItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: NavigationItem; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'finance', label: 'Finance & GL', icon: <Receipt size={20} /> },
    { id: 'patients', label: 'Patient Mgmt', icon: <Users size={20} /> },
    { id: 'inventory', label: 'Supply Chain', icon: <Package size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white flex flex-col h-screen fixed left-0 top-0 z-20 transition-all duration-300 shadow-xl">
      <div className="p-6 flex items-center space-x-3 border-b border-slate-800">
        <div className="bg-teal-500 p-2 rounded-lg shadow-lg shadow-teal-500/20">
          <Activity className="text-white" size={24} />
        </div>
        <div>
            <h1 className="text-xl font-bold tracking-wider">HOSPI-A.I.</h1>
            <p className="text-xs text-slate-400">Enterprise ERP</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50 translate-x-1'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <span className={`${activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-white'}`}>
              {item.icon}
            </span>
            <span className="font-medium text-sm">{item.label}</span>
            {activeTab === item.id && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 rounded-xl p-4 flex items-center space-x-3 cursor-pointer hover:bg-slate-800 transition-colors">
            <img src="https://picsum.photos/100/100" alt="Profile" className="w-10 h-10 rounded-full border-2 border-slate-600" />
            <div>
                <p className="text-sm font-semibold text-white">Dr. A. Smith</p>
                <p className="text-xs text-slate-400">Chief Medical Officer</p>
            </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
