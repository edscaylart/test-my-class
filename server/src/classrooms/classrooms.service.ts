import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Classroom } from './interfaces/classroom.interface';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { EnterClassroomDto } from './dto/enter-classroom.dto';
import { QueryFeatures } from '../utils/query-features.util';

@Injectable()
export class ClassroomsService {
  constructor(@InjectModel('Classroom') private classModel: Model<Classroom>) {}

  async findAll(userId: any, query: any): Promise<Classroom[]> {
    return new QueryFeatures(this.classModel, query)
      .filter()
      .sort()
      .limitFields()
      .paginate()
      .model;
  }

  async findOne(id: string): Promise<Classroom | undefined> {
    return this.classModel.findOne({ _id: new Types.ObjectId(id) }).exec();
  }

  async findOneWithQuestions(id: string): Promise<Classroom[] | undefined> {
    return this.classModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'questions',
          let: { classroomId: '$_id' },
          pipeline: [{
            $match: {
              $expr: { $eq: ['$classroomId', '$$classroomId'] }
            }
          }],
          as: 'questions'
        }
      }
    ]);
  }

  async create(createClassDto: CreateClassroomDto): Promise<Classroom> {
    const createdClass = new this.classModel(createClassDto);
    return createdClass.save();
  }

  async pushMemberInto({ token, memberId }: EnterClassroomDto): Promise<boolean> {
    return this.classModel.updateOne(
      { token },
      { $push: { members: new Types.ObjectId(memberId) } }
    ).exec()
  }

  async deleteOne(id: string): Promise<boolean> {
    const deleted = await this.classModel.deleteOne({ _id: new Types.ObjectId(id) });
    return deleted.deletedCount > 0;
  }

  async deleteAll(): Promise<boolean> {
    const deleted = await this.classModel.deleteMany({});
    return deleted.deletedCount > 0;
  }
}
