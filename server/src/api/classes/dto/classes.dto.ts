import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
export class LessonParams {
  @IsNumberString()
  lessonId: number;
}

export class AttendanceDto {
  @IsNotEmpty()
  @IsInt()
  studentRun: number;

  @IsNotEmpty()
  @IsBoolean()
  attended: boolean;
}

export class CreateClassDto {
  @IsNotEmpty()
  @IsInt()
  lessonId: number;

  @IsNotEmpty()
  @IsDate()
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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceDto)
  attendance: AttendanceDto[];
}

export class ClassParams {
  @IsNumberString()
  classId: number;
}
