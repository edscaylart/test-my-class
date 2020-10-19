import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
  classroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true
  },
  question: String,
  alternatives: [String],
  correctAnswers: [String],
  order: Number,
});
