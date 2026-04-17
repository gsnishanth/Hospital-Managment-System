import React from 'react';
import { Bell, Search, User as UserIcon } from 'lucide-react';
import { useHospitalData } from '../hooks/useHospitalData';

export const Header = () => {
  const { user } = useHospitalData();
  
  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'admin': return 'Hospital Administrator';
      case 'doctor': return 'Medical Doctor';
      case 'patient': return 'Care Patient';
      default: return 'User';
    }
  };

  return (
    <header className="h-16 bg-white/40 backdrop-blur-xl border-b border-white/20 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 bg-white/50 px-4 py-2 rounded-full border border-white/30 w-96 shadow-sm">
        <Search className="w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search patients, records..." 
          className="bg-transparent border-none outline-none text-sm w-full text-slate-600 placeholder:text-slate-400"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors bg-white/50 rounded-xl border border-white/30 shadow-sm">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200/50">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-800 truncate max-w-[150px]">
              {user?.email.split('@')[0] || 'Guest'}
            </p>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">
              {getRoleLabel(user?.role)}
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
            <UserIcon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </header>
  );
};
