import { Document } from 'mongoose';

export interface User extends Document {
  name: string,
  phone: string,
  email: string,
  password: string,
  isCorrectPassword(candidatePassword:string, userPassword:string): boolean
}
