import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  id: string;

  @ApiProperty({ example: 'Administrador' })
  @IsString()
  name: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  registration: string;

  @ApiProperty({ example: 'admin@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Admin@123' })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  isActive: boolean;
}
