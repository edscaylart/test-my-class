import { IsNotEmpty, IsArray } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  readonly classroomId: string;
  @IsNotEmpty()
  readonly question: string;
  @IsNotEmpty()
  @IsArray()
  readonly alternatives: string[];
  @IsNotEmpty()
  @IsArray()
  readonly correctAnswers: string[];

  readonly order?: number;
}