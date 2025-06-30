import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @ApiProperty({ example: 'johndoe@mail.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '10xDev' })
  password: string;
}
