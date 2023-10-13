import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class LoginFormDto {
  @IsNotEmpty()
  @IsInt()
  run: number;

  @IsNotEmpty()
  @IsString()
  password: string;
}
