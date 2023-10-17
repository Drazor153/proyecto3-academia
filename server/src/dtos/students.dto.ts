import {
  IsNumberString,
  IsString,
  IsNotEmpty,
  IsInt,
  IsAlphanumeric,
} from 'class-validator';

export class GetLevelsParams {
  @IsNumberString()
  run: number;
}
export class GetClassesParams {
  @IsNumberString()
  lessonId: number;
}

export class GetStudentGradesParams {
  @IsNumberString()
  year: number;
  @IsNumberString()
  semester: number;
  @IsString()
  level: string;
}

export class CreateNewStudentDto {
  @IsNotEmpty()
  @IsInt()
  run: number;

  @IsNotEmpty()
  @IsAlphanumeric()
  dv: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  first_surname: string;

  @IsNotEmpty()
  @IsString()
  level: string;
}
