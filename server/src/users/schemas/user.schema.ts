import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';
import {User} from '../interfaces/user.interface';

export const UserSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  password: String,
})

UserSchema.pre<User>('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.isCorrectPassword = async function(
  candidatePassword, 
  userPassword
) {
  const encrypted = await bcrypt.compare(candidatePassword, userPassword);
  return encrypted;
}