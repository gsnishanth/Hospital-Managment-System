import express, { Response } from 'express';
import { Feedback } from '../models/Feedback';
import { protect, AuthRequest } from '../middleware/auth';
import { validate } from '../middleware/validate';
import { z } from 'zod';

const router = express.Router();

const feedbackSchema = z.object({
  body: z.object({
    userName: z.string().min(1),
    userRole: z.string().min(1),
    comment: z.string().min(1),
    rating: z.number().min(1).max(5),
    imageUrl: z.string().url().optional().or(z.literal('')),
  })
});

router.route('/')
  .get(async (_req, res: Response) => {
    // Feedbacks are public to render on landing page
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  })
  .post(protect, validate(feedbackSchema), async (req: AuthRequest, res: Response) => {
    const feedback = await Feedback.create({
      ...req.body,
      date: new Date().toISOString()
    });
    res.status(201).json(feedback);
  });

export default router;
