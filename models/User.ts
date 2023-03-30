import { Schema, model } from 'mongoose';
import { UserI } from '../types';

const userSchema = new Schema<UserI>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatarURL: {
    type: String,
  },
  moviesList: {
    type: [],
    required: true,
  },
  showsList: {
    type: [],
    required: true,
  },
});

const User = model<UserI>('User', userSchema);
User.createIndexes();

export default User;