import { Controller, Get, Post, Body, Param, Query, Delete, UseGuards } from '@nestjs/common';
import { ClassroomsService } from './classrooms.service';
import { EnterClassroomDto } from './dto/enter-classroom.dto';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { Classroom } from './interfaces/classroom.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../decorators/users.decorator';

@Controller('classrooms')
export class ClassroomsController {
  constructor(private readonly classService: ClassroomsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(@CurrentUser('userId') userId: any, @Query() query): Promise<Classroom[]> {
    return this.classService.findAll(userId, query);
  }

  @Get(':id')
  async findOneWithQuestions(@Param('id') id: string): Promise<Classroom[]> {
    return this.classService.findOneWithQuestions(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@CurrentUser('userId') userId: any, @Body() createClassDto: CreateClassroomDto) {
    if (!createClassDto.ownerId) {
      createClassDto.ownerId = userId;
    }
    return await this.classService.create(createClassDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('enter')
  async enter(@CurrentUser('userId') userId: any, @Body() enterClassDto: EnterClassroomDto) {
    if (!enterClassDto.memberId) {
      enterClassDto.memberId = userId;
    }
    await this.classService.pushMemberInto(enterClassDto); 
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    await this.classService.deleteOne(id);
  }

  @Delete()
  async deleteAll() {
    await this.classService.deleteAll();
  }
}
