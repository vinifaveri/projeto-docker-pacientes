import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreatePatientDto {
  @ApiProperty({
    example: 'Maria da Silva',
  })
  @IsString()
  @IsNotEmpty()
  full_name: string;

  @ApiProperty({
    example: '12345678900',
  })
  @IsString()
  @IsNotEmpty()
  document: string;

  @ApiProperty({
    example: 'O+',
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 5)
  blood_type: string;

  @ApiProperty({
    example: 'Penicilina',
    required: false,
  })
  @IsOptional()
  @IsString()
  allergies?: string;
}
