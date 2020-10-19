import { Document } from 'mongoose';

export interface Classroom extends Document {
  ownerId: string,
  title: string,
  description?: string,
  members: string[],
  token: string,
  questions?: Document[],
}
