import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hospital, Lock, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useHospitalData } from '../hooks/useHospitalData';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useHospitalData();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    const success = await login(email, password);
    
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password. Try admin@hospital.com / admin123');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 border border-slate-100"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-4 rounded-2xl mb-4 shadow-lg shadow-blue-200">
            <Hospital className="text-white w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">MediFlow</h1>
          <p className="text-slate-500 text-sm italic">Healthcare Excellence, Managed.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="admin@hospital.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-4">
            Test Demo Accounts
          </p>
          <div className="flex gap-2 justify-center">
            <button 
              type="button" 
              onClick={() => { setEmail('admin@hospital.com'); setPassword('admin123'); }}
              className="px-3 py-1.5 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
            >
              Demo Admin
            </button>
            <button 
              type="button" 
              onClick={() => { setEmail('rajesh.k@hospital.in'); setPassword('password123'); }}
              className="px-3 py-1.5 text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors border border-indigo-200"
            >
              Demo Doctor
            </button>
            <button 
              type="button" 
              onClick={() => { setEmail('arjun.mehta@example.com'); setPassword('password123'); }}
              className="px-3 py-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
            >
              Demo Patient
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
