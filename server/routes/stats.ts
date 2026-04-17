import express, { Response } from 'express';
import { protect, requireRole, AuthRequest } from '../middleware/auth';
import { Patient } from '../models/Patient';
import { Doctor } from '../models/Doctor';
import { Appointment } from '../models/Appointment';
import { Bill } from '../models/Bill';

const router = express.Router();

router.get('/', protect, requireRole('admin'), async (_req: AuthRequest, res: Response) => {
  const patientCount = await Patient.countDocuments();
  const doctorCount = await Doctor.countDocuments();
  
  const today = new Date().toISOString().split('T')[0]; // Simple YYYY-MM-DD match
  const todayAppointments = await Appointment.countDocuments({ date: today });
  
  const bills = await Bill.find({});
  const totalRevenue = bills.reduce((acc, bill) => acc + bill.totalAmount, 0);

  res.json({
    totalPatients: patientCount,
    totalDoctors: doctorCount,
    appointmentsToday: todayAppointments,
    totalRevenue
  });
});

export default router;
