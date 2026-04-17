import React from 'react';
import { 
  CalendarCheck, 
  Users, 
  Clock,
  ArrowUpRight,
  ClipboardList,
  AlertCircle
} from 'lucide-react';
import { useHospitalData } from '../hooks/useHospitalData';
import { motion } from 'motion/react';

export const DoctorDashboard = () => {
  const { appointments, patients, user } = useHospitalData();
  
  // Specifically for this doctor
  const myAppointments = appointments.filter(a => a.doctorId === user?.targetId);
  const myPatientsCount = patients.filter(p => p.assignedDoctorId === user?.targetId).length;
  
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = myAppointments.filter(a => a.date === today && a.status === 'Scheduled');

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Welcome, Doctor</h1>
          <p className="text-slate-500">You have {todayAppointments.length} appointments scheduled for today.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          Shift Status: On Duty
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-blue-50 text-blue-600">
              <CalendarCheck className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">Today's Schedule</h3>
          <p className="text-2xl font-bold text-slate-800">{todayAppointments.length} Appointments</p>
        </motion.div>
        
        <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-600">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">Assigned Patients</h3>
          <p className="text-2xl font-bold text-slate-800">{myPatientsCount} Patients</p>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600">
              <ClipboardList className="w-6 h-6" />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium mb-1">Completed Reviews</h3>
          <p className="text-2xl font-bold text-slate-800">14 Today</p>
        </motion.div>
      </div>

      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-800">Upcoming Appointments Today</h2>
          <button className="text-blue-600 text-sm font-semibold hover:underline">View Full Schedule</button>
        </div>
        <div className="space-y-4">
          {todayAppointments.length > 0 ? (
            todayAppointments.map((app) => {
              const patient = patients.find(p => p.id === app.patientId);
              return (
                <div key={app.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-white hover:shadow-md transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {patient?.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{patient?.name}</p>
                      <p className="text-xs text-slate-500">{patient?.disease} • {patient?.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-800">{app.time}</p>
                      <p className="text-xs text-slate-400 flex items-center justify-end gap-1">
                        <Clock className="w-3 h-3" /> 15 mins
                      </p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <ArrowUpRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No more appointments scheduled for today.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
