import React, { useState, useEffect, useCallback } from 'react';
import { Patient, Doctor, Appointment, Bill, Feedback, User } from '../types';

const API_URL = 'http://localhost:3001/api';

export const useHospitalData = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [bills, setBills] = useState<Bill[]>([]);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('hospital_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('hospital_token');
  });

  const authHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };

  const fetchData = useCallback(async () => {
    if (!user || !token) return;
    
    setLoading(true);
    try {
      const [pRes, dRes, aRes, bRes, fRes] = await Promise.all([
        fetch(`${API_URL}/patients`, { headers: authHeaders }),
        fetch(`${API_URL}/doctors`, { headers: authHeaders }),
        fetch(`${API_URL}/appointments`, { headers: authHeaders }),
        fetch(`${API_URL}/bills`, { headers: authHeaders }),
        fetch(`${API_URL}/feedbacks`), // Feedbacks are public
      ]);

      if (pRes.ok) setPatients(await pRes.json());
      if (dRes.ok) setDoctors(await dRes.json());
      if (aRes.ok) setAppointments(await aRes.json());
      if (bRes.ok) setBills(await bRes.json());
      if (fRes.ok) setFeedbacks(await fRes.json());
      
    } catch (error) {
      console.error('Error fetching hospital data:', error);
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (res.ok) {
        const userData = await res.json();
        const { token: jwtToken, ...userInfo } = userData;
        const fullUser = { ...userInfo, isAuthenticated: true };
        
        setUser(fullUser);
        setToken(jwtToken);
        localStorage.setItem('hospital_user', JSON.stringify(fullUser));
        localStorage.setItem('hospital_token', jwtToken);
        localStorage.setItem('hospital_auth', 'true');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('hospital_user');
    localStorage.removeItem('hospital_token');
    localStorage.removeItem('hospital_auth');
  };

  const addPatient = async (patient: Omit<Patient, 'id' | 'createdAt'>) => {
    try {
      const res = await fetch(`${API_URL}/patients`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(patient),
      });
      if (res.ok) {
        const newPatient = await res.json();
        setPatients(prev => [...prev, newPatient]);
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const updatePatient = async (id: string, updates: Partial<Patient>) => {
    try {
      const res = await fetch(`${API_URL}/patients/${id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updatedPatient = await res.json();
        setPatients(prev => prev.map(p => p.id === id ? updatedPatient : p));
      }
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  const deletePatient = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/patients/${id}`, { 
        method: 'DELETE',
        headers: authHeaders 
      });
      if (res.ok) setPatients(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const addDoctor = async (doctor: Omit<Doctor, 'id'>) => {
    try {
      const res = await fetch(`${API_URL}/doctors`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(doctor),
      });
      if (res.ok) {
        const newDoctor = await res.json();
        setDoctors(prev => [...prev, newDoctor]);
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  const updateDoctor = async (id: string, updates: Partial<Doctor>) => {
    try {
      const res = await fetch(`${API_URL}/doctors/${id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updatedDoctor = await res.json();
        setDoctors(prev => prev.map(d => d.id === id ? updatedDoctor : d));
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const deleteDoctor = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/doctors/${id}`, { 
        method: 'DELETE',
        headers: authHeaders
      });
      if (res.ok) setDoctors(prev => prev.filter(d => d.id !== id));
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const bookAppointment = async (appointment: Omit<Appointment, 'id'>) => {
    try {
      const res = await fetch(`${API_URL}/appointments`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(appointment),
      });
      if (res.ok) {
        const newAppointment = await res.json();
        setAppointments(prev => [...prev, newAppointment]);
      }
    } catch (error) {
      console.error('Error booking appointment:', error);
    }
  };

  const updateAppointment = async (id: string, updates: Partial<Appointment>) => {
    try {
      const res = await fetch(`${API_URL}/appointments/${id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(updates),
      });
      if (res.ok) {
        const updatedAppointment = await res.json();
        setAppointments(prev => prev.map(a => a.id === id ? updatedAppointment : a));
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const updateAppointmentStatus = (id: string, status: Appointment['status']) => {
    updateAppointment(id, { status });
  };

  const generateBill = async (bill: Omit<Bill, 'id' | 'date'>) => {
    try {
      const res = await fetch(`${API_URL}/bills`, {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(bill),
      });
      if (res.ok) {
        const newBill = await res.json();
        setBills(prev => [...prev, newBill]);
        return newBill;
      }
    } catch (error) {
      console.error('Error generating bill:', error);
    }
  };

  return {
    patients,
    doctors,
    appointments,
    bills,
    feedbacks,
    loading,
    user,
    login,
    logout,
    addPatient,
    updatePatient,
    deletePatient,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    bookAppointment,
    updateAppointment,
    updateAppointmentStatus,
    generateBill,
  };
};
