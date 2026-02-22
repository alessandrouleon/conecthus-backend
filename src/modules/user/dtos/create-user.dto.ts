import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Usuário' })
  name: string;

  @ApiProperty({ example: 'registration' })
  registration: string;

  @ApiProperty({ example: 'email@email.com' })
  email: string;

  @ApiProperty({ example: 'User@123' })
  password: string;

  @ApiProperty({ example: true })
  isActive: boolean;
}
