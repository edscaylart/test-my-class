import { IsNotEmpty } from 'class-validator';

export class CreateClassroomDto {
  ownerId?: string;

  @IsNotEmpty()
  readonly title: string;
  
  readonly description?: string;
  readonly members: string[];
  readonly token?: string;
}