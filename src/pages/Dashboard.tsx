import React from 'react';
import { useHospitalData } from '../hooks/useHospitalData';
import { AdminDashboard } from './AdminDashboard';
import { DoctorDashboard } from './DoctorDashboard';
import { PatientDashboard } from './PatientDashboard';

export const Dashboard = () => {
  const { user, loading } = useHospitalData();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  switch (user?.role) {
    case 'admin':
      return <AdminDashboard />;
    case 'doctor':
      return <DoctorDashboard />;
    case 'patient':
      return <PatientDashboard />;
    default:
      return (
        <div className="text-center py-12">
          <p className="text-slate-500">Redirecting to login...</p>
        </div>
      );
  }
};
