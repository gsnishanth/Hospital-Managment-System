export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  disease: string;
  email?: string;
  assignedDoctorId: string;
  createdAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  contact: string;
  email: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
}

export interface Bill {
  id: string;
  patientId: string;
  consultationFee: number;
  medicineFee: number;
  labFee: number;
  totalAmount: number;
  date: string;
}

export interface Feedback {
  id: string;
  userName: string;
  userRole: string;
  comment: string;
  rating: number;
  imageUrl: string;
  date: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'doctor' | 'patient';
  targetId?: string;
  isAuthenticated: boolean;
}
