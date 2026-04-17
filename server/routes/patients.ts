import express, { Request, Response } from 'express';
import { Patient } from '../models/Patient';
import { User } from '../models/User';
import { protect, requireRole, AuthRequest } from '../middleware/auth';
import { z } from 'zod';
import { validate } from '../middleware/validate';

const router = express.Router();

const patientSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    age: z.number().min(0),
    gender: z.enum(['Male', 'Female', 'Other']),
    phone: z.string().min(1),
    disease: z.string().min(1),
    email: z.string().email().optional(),
    assignedDoctorId: z.string().optional().nullable(),
  }),
});

router.route('/')
  .get(protect, async (req: AuthRequest, res: Response) => {
    // If patient, only return their own data.
    if (req.user.role === 'patient') {
      const patient = await Patient.findById(req.user.targetId);
      res.json(patient ? [patient] : []);
    } else {
      const patients = await Patient.find().populate('assignedDoctorId', 'name');
      res.json(patients);
    }
  })
  .post(protect, requireRole('admin', 'doctor'), validate(patientSchema), async (req: Request, res: Response) => {
    const { name, age, gender, phone, disease, email, assignedDoctorId } = req.body;
    
    // Create patient
    const newPatient = await Patient.create({
      name, age, gender, phone, disease, email, assignedDoctorId
    });
    
    // Create user account for patient if email provided
    if (email) {
      await User.create({
        email,
        password: 'password123', // Admin will communicate this default password
        role: 'patient',
        targetId: newPatient._id
      });
    }
    
    res.status(201).json(newPatient);
  });

router.route('/:id')
  .get(protect, async (req: AuthRequest, res: Response): Promise<void> => {
    const patient = await Patient.findById(req.params.id).populate('assignedDoctorId', 'name');
    if (!patient) {
      res.status(404).json({ error: 'Patient not found' });
      return;
    }
    // Access control
    if (req.user.role === 'patient' && req.user.targetId?.toString() !== patient._id.toString()) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
    res.json(patient);
  })
  .put(protect, requireRole('admin', 'doctor'), async (req: Request, res: Response) => {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPatient);
  })
  .delete(protect, requireRole('admin'), async (req: Request, res: Response) => {
    await Patient.findByIdAndDelete(req.params.id);
    await User.findOneAndDelete({ targetId: req.params.id, role: 'patient' });
    res.status(204).send();
  });

export default router;
