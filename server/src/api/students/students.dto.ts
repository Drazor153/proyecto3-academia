import {
  IsAlphanumeric,
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export class PaginatedStudentsQuery {
  @IsNumberString()
  size: string;

  @IsNumberString()
  page: string;

  @IsOptional()
  run?: string;

  @IsOptional()
  level?: string;

  @IsOptional()
  name?: string;

  @IsOptional()
  paid?: string;
}

export class GetLevelsParams {
  @IsNumberString()
  run: number;
}
export class GetClassesParams {
  @IsNumberString()
  lessonId: number;
}
export class StudentCareerParams {
  @IsNumberString()
  run: string;
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

  @IsNotEmpty()
  @IsBoolean()
  paid: boolean;

  @IsOptional()
  @IsEmail()
  email: string;
}

export class UpdateStudentParams {
  @IsNumberString()
  run: string;
}
export class UpdateStudentDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  first_surname: string;

  @IsNotEmpty()
  @IsString()
  level: string;

  @IsNotEmpty()
  @IsBoolean()
  paid: boolean;
  
  @IsOptional()
  @IsEmail()
  email: string;
}
