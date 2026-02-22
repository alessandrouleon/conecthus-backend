import { ApiPropertyOptional } from '@nestjs/swagger';

export class UserFilterDto {
  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  registration?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  search?: string;
}
