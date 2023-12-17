import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { JustificationStatus } from '@/common/constants';

export class AttendanceDto {
  @IsNotEmpty()
  @IsInt()
  classId: number;

  @IsNotEmpty()
  @IsInt()
  studentRun: number;
}

export class GetJustificationsDto {
  @IsNumberString()
  size: string;

  @IsNumberString()
  page: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  run?: number;

  @IsOptional()
  approved?: string;
}

export class CreateNewJustificationDto {
  @IsNotEmpty()
  @IsDateString()
  initAusencia: Date;

  @IsNotEmpty()
  @IsDateString()
  endAusencia: Date;

  @IsNotEmpty()
  @IsString()
  reason: string;
}

export class SetJustificationStatusParams {
  @IsNumberString()
  id: number;
}

export class SetJustificationStatusDto {
  @IsNotEmpty()
  @IsEnum(JustificationStatus)
  status: JustificationStatus;
}
