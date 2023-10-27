import {
  IsOptional,
  IsString,
  IsNumberString,
  IsArray,
  IsNotEmpty,
  IsBase64,
  ArrayNotEmpty,
  IsDateString,
  IsNumber,
} from 'class-validator';
export class AnnouncementParams {
  @IsNumberString()
  page: string;
}

export class AnnouncementQuery {
  @IsNumberString()
  size: string;

  @IsNumberString()
  page: string;
}

export class CreateAnnouncementDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsBase64()
  image?: Buffer;

  @IsNotEmpty()
  @IsNumber()
  category: number;

  @IsNotEmpty()
  @IsDateString()
  expiresAt: Date;

  @IsArray()
  @ArrayNotEmpty()
  target: number[];
}

export class UpdateAnnouncementDto extends CreateAnnouncementDto {}

export class DeleteAnnouncementParams {
  @IsNumberString()
  id: string;
}
