import { Transform } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class CreateApplication {
  @IsString()
  @Length(2, 50)
  name: string;

  @IsString()
  @Length(2, 255)
  @Transform(({ value }) => value.toLowerCase().trim())
  origin: string;
}

export class AddUserToApplication {
  @IsString()
  userId: string;
}
