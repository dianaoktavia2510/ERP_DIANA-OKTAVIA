import React from 'react';
import { MOCK_PATIENTS } from '../constants';
import { User, Calendar, Activity } from 'lucide-react';

const PatientModule: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Patient Directory</h2>
            <button className="px-4 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 shadow-lg shadow-teal-200">
                + Admit Patient
            </button>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_PATIENTS.map((patient) => (
          <div key={patient.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">{patient.name}</h3>
                  <p className="text-xs text-slate-500 font-mono">{patient.id}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                patient.status === 'Critical' ? 'bg-rose-100 text-rose-600' :
                patient.status === 'Admitted' ? 'bg-emerald-100 text-emerald-600' :
                'bg-slate-100 text-slate-600'
              }`}>
                {patient.status}
              </span>
            </div>
            
            <div className="space-y-3">
                <div className="flex items-center text-sm text-slate-600">
                    <Activity size={16} className="mr-2 text-slate-400" />
                    <span className="font-medium mr-1">Diagnosis:</span> {patient.diagnosis}
                </div>
                <div className="flex items-center text-sm text-slate-600">
                    <Calendar size={16} className="mr-2 text-slate-400" />
                    <span className="font-medium mr-1">Admitted:</span> {patient.admissionDate}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">{patient.department}</span>
                <button className="text-sm text-teal-600 font-semibold hover:underline">View Record</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientModule;
