import mongoose from 'mongoose';

export interface IPatient extends mongoose.Document {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  disease: string;
  email?: string;
  assignedDoctorId?: mongoose.Types.ObjectId;
}

const patientSchema = new mongoose.Schema<IPatient>(
  {
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, min: 0, max: 150 },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    phone: { type: String, required: true, trim: true },
    disease: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    assignedDoctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', default: null },
  },
  { timestamps: true }
);

patientSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Patient = mongoose.model<IPatient>('Patient', patientSchema);
