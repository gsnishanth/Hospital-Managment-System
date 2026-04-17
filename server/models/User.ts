import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends mongoose.Document {
  email: string;
  password: string;
  role: 'admin' | 'doctor' | 'patient';
  targetId?: mongoose.Types.ObjectId;
  comparePassword(candidate: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['admin', 'doctor', 'patient'], required: true },
    targetId: { type: mongoose.Schema.Types.ObjectId, refPath: 'role' },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.password);
};

// Expose id as string
userSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    delete ret.__v;
    delete ret.password; // Never send password to client
    return ret;
  },
});

export const User = mongoose.model<IUser>('User', userSchema);
