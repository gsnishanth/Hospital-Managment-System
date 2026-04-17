import mongoose from 'mongoose';

export interface IAppointment extends mongoose.Document {
  patientId: mongoose.Types.ObjectId;
  doctorId: mongoose.Types.ObjectId;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled';
  notes?: string;
}

const appointmentSchema = new mongoose.Schema<IAppointment>(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: {
      type: String,
      enum: ['Scheduled', 'Completed', 'Cancelled'],
      default: 'Scheduled',
      required: true,
    },
    notes: { type: String, default: '' },
  },
  { timestamps: true }
);

appointmentSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Appointment = mongoose.model<IAppointment>('Appointment', appointmentSchema);
