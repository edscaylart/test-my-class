import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomsController } from './classrooms.controller';
import { ClassroomsService } from './classrooms.service';
import { ClassroomSchema } from './schemas/classroom.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Classroom', schema: ClassroomSchema}])],
  controllers: [ClassroomsController],
  providers: [ClassroomsService],
  exports: [ClassroomsService]
})
export class ClassroomsModule {}
