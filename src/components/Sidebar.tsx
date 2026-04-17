import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserRound, 
  CalendarCheck, 
  ReceiptText, 
  LogOut,
  Hospital
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useHospitalData } from '../hooks/useHospitalData';

export const Sidebar = () => {
  const { user, logout } = useHospitalData();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: user?.role === 'patient' ? 'My Dashboard' : 'Dashboard', 
      path: '/',
      roles: ['admin', 'doctor', 'patient']
    },
    { 
      icon: Users, 
      label: 'Patients', 
      path: '/patients',
      roles: ['admin', 'doctor']
    },
    { 
      icon: UserRound, 
      label: 'Doctors', 
      path: '/doctors',
      roles: ['admin']
    },
    { 
      icon: CalendarCheck, 
      label: user?.role === 'patient' ? 'My Appointments' : 'Appointments', 
      path: '/appointments',
      roles: ['admin', 'doctor', 'patient']
    },
    { 
      icon: ReceiptText, 
      label: user?.role === 'patient' ? 'My Bills' : 'Billing', 
      path: '/billing',
      roles: ['admin', 'patient']
    },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(user?.role || ''));

  return (
    <div className="w-64 bg-white/40 backdrop-blur-xl border-r border-white/20 flex flex-col h-screen sticky top-0 z-20">
      <div className="p-6 flex items-center gap-3 border-b border-slate-100/50">
        <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-200">
          <Hospital className="text-white w-6 h-6" />
        </div>
        <span className="font-bold text-xl text-slate-800 tracking-tight">MediFlow</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {filteredItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
              isActive 
                ? "bg-blue-600 text-white font-bold shadow-lg shadow-blue-200" 
                : "text-slate-500 hover:bg-white/50 hover:text-slate-900"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              "transition-colors duration-200"
            )} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100/50">
        <div className="px-4 py-3 mb-4 bg-slate-50/50 rounded-xl">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Signed in as</p>
          <p className="text-sm font-bold text-slate-700 truncate">{user?.email}</p>
          <span className="inline-block px-2 py-0.5 mt-1 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-md uppercase">
            {user?.role}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50/50 rounded-xl transition-all duration-200 font-medium"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
