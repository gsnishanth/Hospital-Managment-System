import { Patient, Doctor, Appointment, Feedback, Bill } from './types';

export const MOCK_DOCTORS: Doctor[] = [
  { id: 'd1', name: 'Dr. Rajesh Kumar', specialization: 'Cardiology', experience: 12, contact: '98765-43210', email: 'rajesh.k@hospital.in' },
  { id: 'd2', name: 'Dr. Priya Sharma', specialization: 'Neurology', experience: 8, contact: '98765-43211', email: 'priya.s@hospital.in' },
  { id: 'd3', name: 'Dr. Amit Patel', specialization: 'Pediatrics', experience: 15, contact: '98765-43212', email: 'amit.p@hospital.in' },
  { id: 'd4', name: 'Dr. Sunita Gupta', specialization: 'Orthopedics', experience: 10, contact: '98765-43213', email: 'sunita.g@hospital.in' },
  { id: 'd5', name: 'Dr. Vikram Singh', specialization: 'Dermatology', experience: 6, contact: '98765-43214', email: 'vikram.s@hospital.in' },
  { id: 'd6', name: 'Dr. Meera Iyer', specialization: 'Oncology', experience: 20, contact: '98765-43215', email: 'meera.i@hospital.in' },
  { id: 'd7', name: 'Dr. Sanjay Reddy', specialization: 'Psychiatry', experience: 14, contact: '98765-43216', email: 'sanjay.r@hospital.in' },
  { id: 'd8', name: 'Dr. Anjali Desai', specialization: 'General Surgery', experience: 18, contact: '98765-43217', email: 'anjali.d@hospital.in' },
];

export const MOCK_PATIENTS: Patient[] = [
  { id: 'p1', name: 'Arjun Mehta', age: 45, gender: 'Male', phone: '91234-56780', disease: 'Hypertension', assignedDoctorId: 'd1', createdAt: new Date().toISOString() },
  { id: 'p2', name: 'Deepika Padukone', age: 32, gender: 'Female', phone: '91234-56781', disease: 'Migraine', assignedDoctorId: 'd2', createdAt: new Date().toISOString() },
  { id: 'p3', name: 'Rahul Dravid', age: 8, gender: 'Male', phone: '91234-56782', disease: 'Fever', assignedDoctorId: 'd3', createdAt: new Date().toISOString() },
  { id: 'p4', name: 'Kavita Krishnamurthy', age: 29, gender: 'Female', phone: '91234-56783', disease: 'Skin Rash', assignedDoctorId: 'd5', createdAt: new Date().toISOString() },
  { id: 'p5', name: 'Suresh Raina', age: 52, gender: 'Male', phone: '91234-56784', disease: 'Back Pain', assignedDoctorId: 'd4', createdAt: new Date().toISOString() },
  { id: 'p6', name: 'Priyanka Chopra', age: 35, gender: 'Female', phone: '91234-56785', disease: 'Anxiety', assignedDoctorId: 'd7', createdAt: new Date().toISOString() },
  { id: 'p7', name: 'Sachin Tendulkar', age: 48, gender: 'Male', phone: '91234-56786', disease: 'Diabetes', assignedDoctorId: 'd1', createdAt: new Date().toISOString() },
  { id: 'p8', name: 'Lata Mangeshkar', age: 24, gender: 'Female', phone: '91234-56787', disease: 'Asthma', assignedDoctorId: 'd8', createdAt: new Date().toISOString() },
  { id: 'p9', name: 'Amitabh Bachchan', age: 65, gender: 'Male', phone: '91234-56788', disease: 'Arthritis', assignedDoctorId: 'd4', createdAt: new Date().toISOString() },
  { id: 'p10', name: 'Smriti Mandhana', age: 31, gender: 'Female', phone: '91234-56789', disease: 'Flu', assignedDoctorId: 'd3', createdAt: new Date().toISOString() },
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'a1', patientId: 'p1', doctorId: 'd1', date: '2024-03-10', time: '10:00', status: 'Scheduled' },
  { id: 'a2', patientId: 'p2', doctorId: 'd2', date: '2024-03-11', time: '14:30', status: 'Scheduled' },
  { id: 'a3', patientId: 'p4', doctorId: 'd5', date: '2024-03-12', time: '09:15', status: 'Completed' },
  { id: 'a4', patientId: 'p6', doctorId: 'd7', date: '2024-03-12', time: '11:00', status: 'Scheduled' },
  { id: 'a5', patientId: 'p5', doctorId: 'd4', date: '2024-03-13', time: '16:00', status: 'Scheduled' },
  { id: 'a6', patientId: 'p8', doctorId: 'd8', date: '2024-03-14', time: '10:30', status: 'Cancelled' },
  { id: 'a7', patientId: 'p3', doctorId: 'd3', date: '2024-03-15', time: '13:00', status: 'Scheduled' },
];

export const MOCK_BILLS: Bill[] = [
  { id: 'b1', patientId: 'p1', consultationFee: 1500, medicineFee: 450, labFee: 2000, totalAmount: 3950, date: '2024-03-01' },
  { id: 'b2', patientId: 'p2', consultationFee: 1200, medicineFee: 300, labFee: 0, totalAmount: 1500, date: '2024-03-02' },
  { id: 'b3', patientId: 'p3', consultationFee: 800, medicineFee: 150, labFee: 500, totalAmount: 1450, date: '2024-03-03' },
  { id: 'b4', patientId: 'p4', consultationFee: 1000, medicineFee: 600, labFee: 1200, totalAmount: 2800, date: '2024-03-04' },
  { id: 'b5', patientId: 'p5', consultationFee: 2000, medicineFee: 850, labFee: 3500, totalAmount: 6350, date: '2024-03-05' },
  { id: 'b6', patientId: 'p6', consultationFee: 1500, medicineFee: 400, labFee: 0, totalAmount: 1900, date: '2024-03-06' },
  { id: 'b7', patientId: 'p7', consultationFee: 1800, medicineFee: 550, labFee: 2200, totalAmount: 4550, date: '2024-03-07' },
  { id: 'b8', patientId: 'p8', consultationFee: 1100, medicineFee: 250, labFee: 900, totalAmount: 2250, date: '2024-03-08' },
  { id: 'b9', patientId: 'p9', consultationFee: 2500, medicineFee: 1200, labFee: 4000, totalAmount: 7700, date: '2024-03-09' },
  { id: 'b10', patientId: 'p10', consultationFee: 900, medicineFee: 200, labFee: 0, totalAmount: 1100, date: '2024-03-10' },
];

export const MOCK_FEEDBACKS: Feedback[] = [
  {
    id: 'f1',
    userName: 'Dr. Rajesh Kumar',
    userRole: 'Chief Surgeon',
    comment: 'The intuitive interface has significantly reduced our administrative overhead. A game changer for hospital management.',
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/doctor1/200/200',
    date: '2024-03-01'
  },
  {
    id: 'f2',
    userName: 'Priya Sharma',
    userRole: 'Patient Care Coordinator',
    comment: 'Managing patient records has never been easier. The real-time updates are incredibly helpful for our team.',
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/staff1/200/200',
    date: '2024-03-02'
  },
  {
    id: 'f3',
    userName: 'Amit Patel',
    userRole: 'Hospital Administrator',
    comment: 'MediFlow provides the best analytics dashboard I have seen. It helps us make data-driven decisions daily.',
    rating: 4,
    imageUrl: 'https://picsum.photos/seed/admin1/200/200',
    date: '2024-03-03'
  },
  {
    id: 'f4',
    userName: 'Dr. Sunita Gupta',
    userRole: 'Pediatrician',
    comment: 'The appointment scheduling is seamless. My patients love the clarity and the staff loves the efficiency.',
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/doctor2/200/200',
    date: '2024-03-04'
  },
  {
    id: 'f5',
    userName: 'Anjali Desai',
    userRole: 'Head Nurse',
    comment: 'The billing system is transparent and fast. It has eliminated many errors we used to face with manual entries.',
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/nurse1/200/200',
    date: '2024-03-05'
  },
  {
    id: 'f6',
    userName: 'Vikram Singh',
    userRole: 'IT Director',
    comment: 'Integration was smooth and the platform is highly scalable. Exactly what a large hospital needs.',
    rating: 4,
    imageUrl: 'https://picsum.photos/seed/it1/200/200',
    date: '2024-03-06'
  },
  {
    id: 'f7',
    userName: 'Dr. Sanjay Reddy',
    userRole: 'Cardiologist',
    comment: 'The patient management module is very detailed. It allows me to track history with just a few clicks.',
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/doctor3/200/200',
    date: '2024-03-07'
  },
  {
    id: 'f8',
    userName: 'Meera Iyer',
    userRole: 'Receptionist',
    comment: 'The search and filter features are lifesavers when we have a long queue of patients.',
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/staff2/200/200',
    date: '2024-03-08'
  },
  {
    id: 'f9',
    userName: 'Sanjay Gupta',
    userRole: 'Finance Manager',
    comment: 'The billing reports are comprehensive. It has made our end-of-month reconciliation much faster.',
    rating: 4,
    imageUrl: 'https://picsum.photos/seed/finance1/200/200',
    date: '2024-03-09'
  },
  {
    id: 'f10',
    userName: 'Dr. Anjali Desai',
    userRole: 'Neurologist',
    comment: 'A very polished platform. It feels modern and works reliably. Highly recommended for any medical facility.',
    rating: 5,
    imageUrl: 'https://picsum.photos/seed/doctor4/200/200',
    date: '2024-03-10'
  }
];
