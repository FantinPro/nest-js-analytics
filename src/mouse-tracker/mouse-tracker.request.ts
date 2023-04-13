import { Type } from 'class-transformer';
import { IsNumber, IsString, ValidateNested } from 'class-validator';

export class Resolution {
  @IsNumber()
  width: number;

  @IsNumber()
  height: number;
}

export class CreateMouseTracker {
  @IsString()
  applicationId: string;

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @ValidateNested({ each: true })
  @Type(() => Resolution)
  resolution: Resolution;

  @IsNumber()
  timestamp: number;

  @IsString()
  sessionId: string;
}
