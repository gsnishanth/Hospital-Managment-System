import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { connectDB } from './db';

// Routes
import authRoutes from './routes/auth';
import patientRoutes from './routes/patients';
import doctorRoutes from './routes/doctors';
import appointmentRoutes from './routes/appointments';
import billRoutes from './routes/bills';
import feedbackRoutes from './routes/feedbacks';
import statsRoutes from './routes/stats';

import { notFound, errorHandler } from './middleware/errorHandler';

const app = express();
const port = process.env.PORT || 3001;

// Security and utility middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));
app.use(express.json());

// Rate limiting for auth
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: 'Too many login attempts, please try again later'
});
app.use('/api/auth/login', authLimiter);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/stats', statsRoutes);

// Error Handling Middleware (must be registered last)
app.use(notFound);
app.use(errorHandler);

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
  });
};

startServer();
