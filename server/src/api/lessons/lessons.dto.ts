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

class LessonDto {
  @IsString()
  @Length(1, 1)
  lesson: string;

  @IsString()
  @IsEnum(LevelCodes)
  levelCode: LevelCodes;

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

  @IsPositive()
  topicId: number;

  @IsString()
  @IsEnum(LevelCodes)
  levelCode: LevelCodes;
}

export class SemesterDto{
  @IsPositive()
  semester: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LessonDto)
  lessons: LessonDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizDto)
  quizzes: QuizDto[];
}
export class CreateLessonsDto {
  @IsPositive()
  year: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SemesterDto)
  semesters: SemesterDto[];

}

