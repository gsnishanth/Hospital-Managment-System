import React from 'react';
import { 
  CalendarCheck, 
  ReceiptText, 
  UserRound, 
  Clock,
  ArrowUpRight,
  Stethoscope,
  HeartPulse
} from 'lucide-react';
import { useHospitalData } from '../hooks/useHospitalData';
import { motion } from 'motion/react';

export const PatientDashboard = () => {
  const { appointments, bills, doctors, user } = useHospitalData();
  
  const upcomingAppointments = appointments
    .filter(a => a.status === 'Scheduled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const recentBills = bills
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Hello, {user?.email.split('@')[0]}</h1>
          <p className="text-slate-500">Welcome to your health portal. Here's your overview.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 flex items-center gap-2">
          <HeartPulse className="w-4 h-4 text-red-500" />
          Health Score: 92/100
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl text-white shadow-lg shadow-blue-200">
          <CalendarCheck className="w-8 h-8 mb-4 opacity-80" />
          <h3 className="text-blue-100 text-sm font-medium mb-1">Upcoming Appointments</h3>
          <p className="text-3xl font-bold">{upcomingAppointments.length}</p>
        </motion.div>
        
        <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
              <ReceiptText className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">Total Outstanding</h3>
          <p className="text-2xl font-bold text-slate-800">₹{bills.reduce((sum, b) => sum + b.totalAmount, 0).toLocaleString()}</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
              <Stethoscope className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">Assigned Support</h3>
          <p className="text-2xl font-bold text-slate-800">24/7 Available</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Your Next Appointments</h2>
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((app) => {
                const doctor = doctors.find(d => d.id === app.doctorId);
                return (
                  <div key={app.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                        <UserRound className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{doctor?.name || 'Doctor'}</p>
                        <p className="text-xs text-slate-500">{doctor?.specialization}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">{app.date}</p>
                      <p className="text-xs text-slate-500 flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3" /> {app.time}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-slate-500 text-center py-8 italic">No upcoming appointments found.</p>
            )}
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Billing</h2>
          <div className="space-y-4">
            {recentBills.length > 0 ? (
              recentBills.map((bill) => (
                <div key={bill.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <ReceiptText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">Medical Invoice</p>
                      <p className="text-xs text-slate-500">{bill.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-800">₹{bill.totalAmount}</span>
                    <button className="p-2 bg-white border border-slate-200 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-center py-8 italic">No billing history found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
