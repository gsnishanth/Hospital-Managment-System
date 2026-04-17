import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User } from './models/User';
import { Doctor } from './models/Doctor';
import { Patient } from './models/Patient';
import { Appointment } from './models/Appointment';
import { Bill } from './models/Bill';
import { Feedback } from './models/Feedback';
import { MOCK_PATIENTS, MOCK_DOCTORS, MOCK_APPOINTMENTS, MOCK_FEEDBACKS, MOCK_BILLS } from '../src/mockData';

dotenv.config();

let mongod: MongoMemoryServer | null = null;

export const connectDB = async () => {
  try {
    // Try Atlas first; fall back to in-memory if it fails
    const atlasUri = process.env.MONGODB_URI || '';
    let uri = atlasUri;

    try {
      if (atlasUri) {
        await mongoose.connect(atlasUri, { serverSelectionTimeoutMS: 5000 });
        console.log('Connected to MongoDB Atlas');
      } else {
        throw new Error('No Atlas URI');
      }
    } catch (_atlasErr) {
      console.log('Atlas unavailable – starting local in-memory MongoDB...');
      mongod = await MongoMemoryServer.create();
      uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log('Connected to in-memory MongoDB at', uri);
    }

    await seedData();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

async function seedData() {
  const userCount = await User.countDocuments();
  
  if (userCount === 0) {
    console.log('Seeding initial data into MongoDB...');
    
    try {
      // Clear any partial data
      await Promise.all([
        Doctor.deleteMany({}),
        Patient.deleteMany({}),
        Appointment.deleteMany({}),
        Bill.deleteMany({}),
        Feedback.deleteMany({}),
        User.deleteMany({})
      ]);

      // Seed Admin
      await User.create({ email: 'admin@hospital.com', password: 'admin123', role: 'admin' });

      // Seed Doctors and Users
      const doctorMapping: Record<string, string> = {};
      for (const d of MOCK_DOCTORS) {
        const { id, ...doctorData } = d;
        const newDoctor = await Doctor.create(doctorData);
        doctorMapping[id] = newDoctor._id.toString();
        await User.create({ 
          email: d.email, 
          password: 'password123', 
          role: 'doctor', 
          targetId: newDoctor._id.toString() 
        });
      }

      // Seed Patients and Users
      const patientMapping: Record<string, string> = {};
      for (const p of MOCK_PATIENTS) {
        const { id, ...patientData } = p;
        const patientEmail = `${p.name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
        const newPatient = await Patient.create({ 
          ...patientData, 
          email: patientEmail,
          assignedDoctorId: doctorMapping[p.assignedDoctorId] || null
        });
        patientMapping[id] = newPatient._id.toString();
        await User.create({ 
          email: patientEmail, 
          password: 'password123', 
          role: 'patient', 
          targetId: newPatient._id.toString() 
        });
      }

      // Seed Appointments
      for (const a of MOCK_APPOINTMENTS) {
        const { id, ...appData } = a;
        await Appointment.create({
          ...appData,
          patientId: patientMapping[a.patientId],
          doctorId: doctorMapping[a.doctorId]
        });
      }

      // Seed Bills
      for (const b of MOCK_BILLS) {
        const { id, ...billData } = b;
        await Bill.create({
          ...billData,
          patientId: patientMapping[b.patientId]
        });
      }

      // Seed Feedbacks
      for (const f of MOCK_FEEDBACKS) {
        const { id, ...feedbackData } = f;
        await Feedback.create(feedbackData);
      }

      console.log('MongoDB Seeding completed successfully!');
    } catch (error) {
      console.error('Error seeding MongoDB:', error);
    }
  }
}
