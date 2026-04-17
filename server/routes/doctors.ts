import express, { Request, Response } from 'express';
import { Doctor } from '../models/Doctor';
import { User } from '../models/User';
import { protect, requireRole, AuthRequest } from '../middleware/auth';
import { z } from 'zod';
import { validate } from '../middleware/validate';

const router = express.Router();

const doctorSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    specialization: z.string().min(1),
    experience: z.number().min(0),
    contact: z.string().min(1),
    email: z.string().email(),
  }),
});

router.route('/')
  .get(protect, async (req: AuthRequest, res: Response) => {
    // Anyone logged in can see the doctor list
    const doctors = await Doctor.find();
    res.json(doctors);
  })
  .post(protect, requireRole('admin'), validate(doctorSchema), async (req: Request, res: Response) => {
    const doctor = await Doctor.create(req.body);
    await User.create({
      email: doctor.email,
      password: 'password123', // Admin defined initially
      role: 'doctor',
      targetId: doctor._id
    });
    res.status(201).json(doctor);
  });

router.route('/:id')
  .get(protect, async (req: AuthRequest, res: Response): Promise<void> => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      res.status(404).json({ error: 'Doctor not found' });
      return;
    }
    res.json(doctor);
  })
  .put(protect, requireRole('admin'), async (req: Request, res: Response) => {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDoctor);
  })
  .delete(protect, requireRole('admin'), async (req: Request, res: Response) => {
    await Doctor.findByIdAndDelete(req.params.id);
    await User.findOneAndDelete({ targetId: req.params.id, role: 'doctor' });
    res.status(204).send();
  });

export default router;
