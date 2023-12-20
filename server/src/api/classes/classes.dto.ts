import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsString,
  ValidateNested,
  buildMessage,
} from 'class-validator';
export class LessonParams {
  @IsNumberString()
  lessonId: number;
}

export class CreateClassDto {
  @IsNotEmpty()
  @IsInt()
  lessonId: number;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  contents: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceDto)
  attendance: AttendanceDto[];
}

export class UpdateClassDto {
  @IsNotEmpty()
  @IsString()
  contents: string;

  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceDto)
  attendance: AttendanceDto[];
}
export class AttendanceDto {
  @IsNotEmpty()
  @IsInt()
  studentRun: number;

  @IsNotEmpty()
  @IsBoolean()
  attended: boolean;
}

export class ClassParams {
  @IsNumberString()
  classId: number;
}
