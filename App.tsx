import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import FinanceModule from './components/FinanceModule';
import PatientModule from './components/PatientModule';
import InventoryModule from './components/InventoryModule';
import { NavigationItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationItem>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'finance':
        return <FinanceModule />;
      case 'patients':
        return <PatientModule />;
      case 'inventory':
        return <InventoryModule />;
      default:
        return (
            <div className="flex flex-col items-center justify-center h-96 text-slate-400">
                <p>Module under construction</p>
            </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 flex flex-col min-h-screen transition-all duration-300">
        <Header title={activeTab === 'dashboard' ? 'Executive Dashboard' : activeTab} />
        
        <div className="p-8 flex-1 overflow-y-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
