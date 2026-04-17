import React, { useState } from 'react';
import { Plus, Calendar, Clock, User, UserRound, CheckCircle2, XCircle, AlertCircle, Edit2 } from 'lucide-react';
import { useHospitalData } from '../hooks/useHospitalData';
import { Appointment } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';

export const AppointmentsPage = () => {
  const { appointments, patients, doctors, bookAppointment, updateAppointment, updateAppointmentStatus } = useHospitalData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);

  const [formData, setFormData] = useState({
    patientId: patients[0]?.id || '',
    doctorId: doctors[0]?.id || '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '10:00',
  });

  const handleOpenModal = (apt?: Appointment) => {
    if (apt) {
      setEditingAppointment(apt);
      setFormData({
        patientId: apt.patientId,
        doctorId: apt.doctorId,
        date: apt.date,
        time: apt.time,
      });
    } else {
      setEditingAppointment(null);
      setFormData({
        patientId: patients[0]?.id || '',
        doctorId: doctors[0]?.id || '',
        date: format(new Date(), 'yyyy-MM-dd'),
        time: '10:00',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAppointment) {
      updateAppointment(editingAppointment.id, formData);
    } else {
      bookAppointment({
        ...formData,
        status: 'Scheduled',
      });
    }
    setIsModalOpen(false);
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch (status) {
      case 'Scheduled': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Completed': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Appointments</h1>
          <p className="text-slate-500">Schedule and track patient visits.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all shadow-lg shadow-emerald-200"
        >
          <Plus className="w-5 h-5" />
          Book Appointment
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {appointments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((apt) => {
          const patient = patients.find(p => p.id === apt.patientId);
          const doctor = doctors.find(d => d.id === apt.doctorId);

          return (
            <motion.div 
              layout
              key={apt.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-3 min-w-[80px] border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase">{format(new Date(apt.date), 'MMM')}</span>
                  <span className="text-2xl font-bold text-slate-800">{format(new Date(apt.date), 'dd')}</span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="font-bold text-slate-800">{patient?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserRound className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-slate-600">with <span className="font-medium">{doctor?.name}</span></span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2 text-slate-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">{apt.time}</span>
                </div>

                <div className={`px-3 py-1 rounded-full border text-xs font-bold ${getStatusColor(apt.status)}`}>
                  {apt.status}
                </div>

                <div className="flex gap-2">
                  {apt.status === 'Scheduled' && (
                    <>
                      <button 
                        onClick={() => handleOpenModal(apt)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        title="Edit Appointment"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                        className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                        title="Mark as Completed"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => updateAppointmentStatus(apt.id, 'Cancelled')}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        title="Cancel Appointment"
                      >
                        <XCircle className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}

        {appointments.length === 0 && (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
            <AlertCircle className="w-12 h-12 text-slate-300 mb-4" />
            <h3 className="text-lg font-bold text-slate-800">No Appointments Found</h3>
            <p className="text-slate-500">Start by booking a new appointment for a patient.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">
                  {editingAppointment ? 'Edit Appointment' : 'Book Appointment'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <XCircle className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Select Patient</label>
                    <select 
                      required
                      value={formData.patientId}
                      onChange={e => setFormData({...formData, patientId: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Select Doctor</label>
                    <select 
                      required
                      value={formData.doctorId}
                      onChange={e => setFormData({...formData, doctorId: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                    >
                      {doctors.map(d => (
                        <option key={d.id} value={d.id}>{d.name} ({d.specialization})</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                      <input 
                        required
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData({...formData, date: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                      <input 
                        required
                        type="time"
                        value={formData.time}
                        onChange={e => setFormData({...formData, time: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-200"
                  >
                    {editingAppointment ? 'Update Appointment' : 'Confirm Booking'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
