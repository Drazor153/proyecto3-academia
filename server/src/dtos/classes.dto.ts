import { Type } from 'class-transformer';
import {
  IsNumberString,
  IsNotEmpty,
  IsInt,
  IsString,
  IsArray,
  IsBoolean,
  ValidateNested,
} from 'class-validator';
export class LessonParams {
  @IsNumberString()
  lessonId: number;
}

export class Attendance {
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
  @IsInt()
  week: number;

  @IsNotEmpty()
  @IsString()
  contents: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Attendance)
  attendance: Attendance[];
}

export class UpdateClassDto {
  @IsNotEmpty()
  @IsString()
  contents: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Attendance)
  attendance: Attendance[];
}

export class ClassParams {
  @IsNumberString()
  classId: number;
}
