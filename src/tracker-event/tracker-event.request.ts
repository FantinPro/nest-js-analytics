import { IsNumber, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  visitorId: string;

  @IsOptional()
  dimensions: Record<string, any>;
}
