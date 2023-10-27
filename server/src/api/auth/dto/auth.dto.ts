import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class LoginFormDto {
  @IsNotEmpty()
  @IsInt()
  run: number;

  @IsNotEmpty()
  @IsString()
  password: string;
}
