import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsString, Length } from 'class-validator';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @IsString()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @IsString()
  @Length(2, 50)
  @Column()
  name: string;
}
