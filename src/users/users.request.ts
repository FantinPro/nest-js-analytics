import { IsEmail, IsString, IsStrongPassword, Length } from 'class-validator';

export class CreateUser {
  @IsString()
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  @Length(2, 50)
  name: string;
}
