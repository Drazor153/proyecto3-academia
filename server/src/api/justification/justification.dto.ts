import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

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
