import React, { useState } from 'react';
import { ReceiptText, Search, Plus, Download, Printer, User, IndianRupee, Calendar } from 'lucide-react';
import { useHospitalData } from '../hooks/useHospitalData';
import { motion, AnimatePresence } from 'motion/react';
import { format } from 'date-fns';

export const BillingPage = () => {
  const { bills, patients, generateBill } = useHospitalData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    patientId: patients[0]?.id || '',
    consultationFee: 50,
    medicineFee: 0,
    labFee: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalAmount = Number(formData.consultationFee) + Number(formData.medicineFee) + Number(formData.labFee);
    generateBill({
      ...formData,
      consultationFee: Number(formData.consultationFee),
      medicineFee: Number(formData.medicineFee),
      labFee: Number(formData.labFee),
      totalAmount,
    });
    setIsModalOpen(false);
  };

  const filteredBills = bills.filter(b => {
    const patient = patients.find(p => p.id === b.patientId);
    return patient?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const downloadBill = (bill: any) => {
    const patient = patients.find(p => p.id === bill.patientId);
    const content = `
------------------------------------------
       MEDIFLOW HOSPITAL INVOICE
------------------------------------------
Invoice ID: ${bill.id.toUpperCase()}
Date: ${format(new Date(bill.date), 'dd MMM yyyy')}
------------------------------------------
PATIENT DETAILS:
Name: ${patient?.name}
Patient ID: ${patient?.id}
------------------------------------------
BILLING DETAILS:
Consultation Fee: ₹${bill.consultationFee.toFixed(2)}
Medicine Fee:     ₹${bill.medicineFee.toFixed(2)}
Lab Test Fee:     ₹${bill.labFee.toFixed(2)}
------------------------------------------
TOTAL AMOUNT:     ₹${bill.totalAmount.toFixed(2)}
------------------------------------------
Status: PAID
------------------------------------------
Thank you for choosing MediFlow.
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Invoice_${bill.id.slice(-6).toUpperCase()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Billing & Invoices</h1>
          <p className="text-slate-500">Manage patient payments and generate bills.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 font-medium transition-all shadow-lg shadow-blue-200"
        >
          <Plus className="w-5 h-5" />
          Generate New Bill
        </button>
      </div>

      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-white/40">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by patient name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Invoice ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100/50">
              {filteredBills.map((bill) => {
                const patient = patients.find(p => p.id === bill.patientId);
                return (
                  <tr key={bill.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 text-sm font-mono text-slate-400">#{bill.id.slice(-6).toUpperCase()}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-100">
                          {patient?.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">{patient?.name}</p>
                          <p className="text-xs text-slate-400 font-medium">Patient ID: {patient?.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {format(new Date(bill.date), 'MMM dd, yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800 text-lg">₹{bill.totalAmount.toFixed(2)}</span>
                        <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Paid</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => downloadBill(bill)}
                          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm hover:shadow-md bg-white border border-slate-100"
                          title="Download Invoice"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => window.print()}
                          className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-all shadow-sm hover:shadow-md bg-white border border-slate-100"
                          title="Print Invoice"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-blue-600 text-white">
                <div className="flex items-center gap-3">
                  <ReceiptText className="w-6 h-6" />
                  <h2 className="text-xl font-bold">Generate Invoice</h2>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400" />
                      Select Patient
                    </label>
                    <select 
                      required
                      value={formData.patientId}
                      onChange={e => setFormData({...formData, patientId: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      {patients.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Consultation Fee</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          required
                          type="number"
                          value={formData.consultationFee}
                          onChange={e => setFormData({...formData, consultationFee: Number(e.target.value)})}
                          className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Medicine Fee</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          required
                          type="number"
                          value={formData.medicineFee}
                          onChange={e => setFormData({...formData, medicineFee: Number(e.target.value)})}
                          className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Lab Test Charges</label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          required
                          type="number"
                          value={formData.labFee}
                          onChange={e => setFormData({...formData, labFee: Number(e.target.value)})}
                          className="w-full pl-8 pr-4 py-2 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Total Amount</span>
                    <span className="text-2xl font-bold text-slate-800">
                      ₹{(Number(formData.consultationFee) + Number(formData.medicineFee) + Number(formData.labFee)).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 px-4 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
                  >
                    Generate Bill
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

const XCircle = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
);
