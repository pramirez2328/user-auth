import mongoose, { Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  password: string;
  fullname: string;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
});

export const User = mongoose.model<UserDocument>('User', userSchema);
