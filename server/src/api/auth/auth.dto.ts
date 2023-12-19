import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumberString, IsPositive, IsString } from 'class-validator';

export class LoginFormDto {
  @IsNotEmpty()
  @IsInt()
  run: number;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  newPassword: string;
}

export class ResetPasswordParams {
  @IsNotEmpty()
  @IsNumberString()
  run: number;
}
