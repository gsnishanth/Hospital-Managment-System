import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../models/User';
import { validate } from '../middleware/validate';
import { protect, AuthRequest } from '../middleware/auth';

const router = express.Router();

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'dev_secret', {
    expiresIn: '30d',
  });
};

router.post('/login', validate(loginSchema), async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    res.json({
      ...user.toJSON(),
      token: generateToken(user._id.toString()),
    });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

router.get('/me', protect, async (req: AuthRequest, res: Response) => {
  res.json(req.user);
});

export default router;
