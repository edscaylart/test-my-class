import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ClassroomsController } from './classrooms/classrooms.controller';
import { ClassroomsModule } from './classrooms/classrooms.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/testmyclass'), UsersModule, AuthModule, ClassroomsModule, QuestionsModule],
  controllers: [AppController, ClassroomsController, QuestionsController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
})
export class AppModule {}
