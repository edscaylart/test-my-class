import * as mongoose from 'mongoose';
import * as crypto from 'crypto'
import {Classroom} from '../interfaces/classroom.interface';

export const ClassroomSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: String,
  description: String,
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  token: String,
});

ClassroomSchema.pre<Classroom>('save', async function(next) {
  if (!this.isNew) return next();

  this.token = await crypto.randomBytes(6).toString('HEX');
})