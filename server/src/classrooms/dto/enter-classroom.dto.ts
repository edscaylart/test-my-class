import { IsNotEmpty } from 'class-validator';

export class EnterClassroomDto {
  memberId?: string;
  
  @IsNotEmpty()
  readonly token: string;
}