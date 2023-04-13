import { IsString, Length } from 'class-validator';

export class CreateApplication {
  @IsString()
  @Length(2, 50)
  name: string;
}
