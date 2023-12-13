import {
  IsAlphanumeric,
  IsArray,
  IsBoolean,
  IsDate,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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
  name: string;

  @IsOptional()
  @IsNumberString()
  run: number;

  @IsOptional()
  @IsString()
  approved: string;
}

export class CreateNewJustificationDto {
  // @IsNotEmpty()
  // @IsInt()
  // run: number;

  @IsNotEmpty()
  @IsDateString()
  initAusencia: Date;

  @IsNotEmpty()
  @IsDateString()
  endAusencia: Date;

  // @IsNotEmpty()
  // @IsInt()
  // numInasistente: number;

  @IsNotEmpty()
  @IsString()
  reason: string;

  // @IsNotEmpty()
  // file: string;

  // @IsNotEmpty()
  // @IsString()
  // approved: string;

  // @IsNotEmpty()
  // @IsArray()
  // @ValidateNested({ each: true })
  // @Type(() => AttendanceDto)
  // attendance: AttendanceDto[];
}
