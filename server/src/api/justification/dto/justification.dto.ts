import {
    IsNumberString,
    IsString,
    IsNotEmpty,
    IsAlphanumeric,
    IsOptional,
    IsInt,
    IsDate,
    IsArray,
    ValidateNested,
    IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AttendanceDto{
    @IsNotEmpty()
    @IsInt()
    classId: number;

    @IsNotEmpty()
    @IsInt()
    studentRun: number;
    
}

export class GetJustificationsDto{
    @IsOptional()
    name: string;

    @IsOptional()
    @IsNumberString()
    run: number; 

    @IsOptional()
    @IsString()
    approved: string;


}

export class CreateNewJustificationDto{
    @IsNotEmpty()
    @IsInt()
    run: number;

    @IsNotEmpty()
    @IsDate()
    initAusencia: Date;

    @IsNotEmpty()
    @IsDate()
    endAusencia: Date;

    @IsNotEmpty()
    @IsInt()
    numInasistente: number;

    @IsNotEmpty()
    @IsString()
    reason_i: string;

    @IsNotEmpty()
    @IsString()
    file_i: string;

    @IsNotEmpty()
    @IsString()
    approved_i: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => AttendanceDto)
    attendance: AttendanceDto[];

}