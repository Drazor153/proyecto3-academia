import { Type } from 'class-transformer';
import {
  IsArray,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

class LessonDto {
  @IsString()
  @Length(1, 1)
  lesson: string;

  @IsString()
  @Length(2, 2)
  levelCode: string;

  @IsPositive()
  teacherRun: number;
}

export class CreateLessonsDto {
  @IsPositive()
  year: number;

  @IsPositive()
  semester: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LessonDto)
  lessons: LessonDto[];
}
