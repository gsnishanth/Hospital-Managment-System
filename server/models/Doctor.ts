import mongoose from 'mongoose';

export interface IDoctor extends mongoose.Document {
  name: string;
  specialization: string;
  experience: number;
  contact: string;
  email: string;
  available: boolean;
}

const doctorSchema = new mongoose.Schema<IDoctor>(
  {
    name: { type: String, required: true, trim: true },
    specialization: { type: String, required: true, trim: true },
    experience: { type: Number, required: true, min: 0 },
    contact: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

doctorSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Doctor = mongoose.model<IDoctor>('Doctor', doctorSchema);
