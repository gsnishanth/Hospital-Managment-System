import express, { Request, Response } from 'express';
import { Appointment } from '../models/Appointment';
import { protect, requireRole, AuthRequest } from '../middleware/auth';
import { z } from 'zod';
import { validate } from '../middleware/validate';

const router = express.Router();

const appointmentSchema = z.object({
  body: z.object({
    patientId: z.string(),
    doctorId: z.string(),
    date: z.string(),
    time: z.string(),
    status: z.enum(['Scheduled', 'Completed', 'Cancelled']).optional(),
    notes: z.string().optional(),
  }),
});

router.route('/')
  .get(protect, async (req: AuthRequest, res: Response) => {
    const { patientId, doctorId } = req.query;
    const filter: any = {};
    
    // RBAC enforced at the query level
    if (req.user.role === 'patient') {
      filter.patientId = req.user.targetId;
    } else if (req.user.role === 'doctor') {
      filter.doctorId = req.user.targetId;
    } else {
      // Admin sees requested filters, or all
      if (patientId) filter.patientId = patientId;
      if (doctorId) filter.doctorId = doctorId;
    }
    
    const appointments = await Appointment.find(filter)
      .populate('patientId', 'name')
      .populate('doctorId', 'name specialization');
      
    res.json(appointments);
  })
  .post(protect, validate(appointmentSchema), async (req: AuthRequest, res: Response): Promise<void> => {
    if (req.user.role === 'patient' && req.user.targetId?.toString() !== req.body.patientId) {
      res.status(403).json({ error: 'Cannot book appointment for another patient' });
      return;
    }
    const appointment = await Appointment.create(req.body);
    res.status(201).json(appointment);
  });

router.route('/:id')
  .put(protect, async (req: AuthRequest, res: Response): Promise<void> => {
    // Both doctors and admins can update. Patient can only cancel? Let's leave simple logic for now.
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  })
  .delete(protect, requireRole('admin'), async (req: Request, res: Response) => {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(204).send();
  });

export default router;
