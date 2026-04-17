import mongoose from 'mongoose';

export interface IBill extends mongoose.Document {
  patientId: mongoose.Types.ObjectId;
  consultationFee: number;
  medicineFee: number;
  labFee: number;
  totalAmount: number;
  status: 'pending' | 'paid';
  date: string;
}

const billSchema = new mongoose.Schema<IBill>(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    consultationFee: { type: Number, required: true, min: 0 },
    medicineFee: { type: Number, required: true, min: 0 },
    labFee: { type: Number, required: true, min: 0 },
    totalAmount: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

billSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Bill = mongoose.model<IBill>('Bill', billSchema);
