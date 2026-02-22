import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  id: string;

  @ApiProperty({ example: 'Administrador' })
  name: string;

  @ApiProperty({ example: '12345678' })
  registration: string;

  @ApiProperty({ example: 'admin@email.com' })
  email: string;

  @ApiProperty({ example: 'Admin@123' })
  password: string;

  @ApiProperty({ example: true })
  isActive: boolean;
}
