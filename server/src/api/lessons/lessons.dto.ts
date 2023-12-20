import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { LevelCodes } from '@/common/constants';
export class CreateLessonsDto {
  @IsPositive()
  year: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SemesterDto)
  semesters: SemesterDto[];
}
export class SemesterDto {
  @IsPositive()
  semester: number;

  @IsDateString()
  starts_at: Date;

  @IsDateString()
  ends_at: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LevelDto)
  levels: LevelDto[];
}
class LevelDto {
  @IsString()
  @IsEnum(LevelCodes)
  code: LevelCodes;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LessonDto)
  lessons: LessonDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizDto)
  quizzes: QuizDto[];
}

class LessonDto {
  @IsString()
  @Length(1, 1)
  lesson: string;

  @IsArray()
  @IsPositive({ each: true })
  teachersRun: number[];
}
class QuizDto {
  @IsPositive()
  number: number;

  @IsDateString()
  starts_at: Date;

  @IsDateString()
  ends_at: Date;
}
