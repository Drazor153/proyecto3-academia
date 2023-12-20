import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class GetTeacherLessonsParams {
  @IsNumberString()
  run: number;
}

export class GetLevelsQuizzesParams {
  @IsNumberString()
  year: number;

  @IsNumberString()
  semester: number;

  @IsString()
  level: string;
}

export class GetQuizGradesParams {
  @IsNumberString()
  quizId: number;
}

export class Grades {
  @IsNotEmpty()
  @IsInt()
  run: number;

  @IsNotEmpty()
  @IsNumber()
  grade: number;
}

export class PostQuizzesGradesBody {
  @IsNotEmpty()
  @IsInt()
  quizId: number;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Grades)
  grades: Grades[];
}
