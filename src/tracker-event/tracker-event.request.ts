import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class Resolution {
  @IsNumber()
  width: number;

  @IsNumber()
  height: number;
}

export class CreateTrackerEvent {
  @IsString()
  applicationId: string;

  @IsNumber()
  timestamp: number;

  @IsString()
  sessionId: string;

  @IsOptional()
  @IsNumber()
  x: number;

  @IsOptional()
  @IsNumber()
  y: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Resolution)
  resolution: Resolution;

  @IsOptional()
  @IsString()
  tag: string;

  @IsOptional()
  @IsString()
  event: string;
}
