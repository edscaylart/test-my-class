import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  readonly name: string;
  readonly phone: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;
}