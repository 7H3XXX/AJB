import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SchemaDto {
  @IsString()
  @ApiProperty({ example: '567f039c-6d06-4c4b-bf6c-372c78dbd74c' })
  id: string;

  @IsString()
  @ApiProperty({
    example: '2023-03-15T12:00:00Z',
    description: 'ISO 8601 formatted date string',
  })
  createdAt: Date;

  @IsString()
  @ApiProperty({
    example: '2023-03-15T12:00:00Z',
    description: 'ISO 8601 formatted date string',
  })
  updatedAt: Date;
}
