import { Document } from 'mongoose';

export interface Question extends Document {
  classroomId: string,
  question: string,
  alternatives: string[],
  correctAnswers: string[],
  order: number,
}
