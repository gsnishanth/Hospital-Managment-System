import express, { Request, Response } from 'express';
import { Bill } from '../models/Bill';
import { protect, requireRole, AuthRequest } from '../middleware/auth';
import { z } from 'zod';
import { validate } from '../middleware/validate';

const router = express.Router();

const billSchema = z.object({
  body: z.object({
    patientId: z.string(),
    consultationFee: z.number().min(0),
    medicineFee: z.number().min(0),
    labFee: z.number().min(0),
    totalAmount: z.number().min(0),
    status: z.enum(['pending', 'paid']).optional(),
  }),
});

router.route('/')
  .get(protect, async (req: AuthRequest, res: Response) => {
    const { patientId } = req.query;
    const filter: any = {};
    
    if (req.user.role === 'patient') {
      filter.patientId = req.user.targetId;
    } else if (patientId) {
      filter.patientId = patientId;
    }
    
    const bills = await Bill.find(filter).populate('patientId', 'name');
    res.json(bills);
  })
  .post(protect, requireRole('admin', 'doctor'), validate(billSchema), async (req: Request, res: Response) => {
    const bill = await Bill.create({
      ...req.body,
      date: new Date().toISOString()
    });
    res.status(201).json(bill);
  });

export default router;
