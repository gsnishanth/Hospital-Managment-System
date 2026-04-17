import mongoose from 'mongoose';

export interface IFeedback extends mongoose.Document {
  userName: string;
  userRole: string;
  comment: string;
  rating: number;
  imageUrl: string;
  date: string;
}

const feedbackSchema = new mongoose.Schema<IFeedback>(
  {
    userName: { type: String, required: true, trim: true },
    userRole: { type: String, required: true, trim: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    imageUrl: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

feedbackSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.__v;
    return ret;
  },
});

export const Feedback = mongoose.model<IFeedback>('Feedback', feedbackSchema);
