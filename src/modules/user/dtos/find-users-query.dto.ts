import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { UserFilterDto } from './user.filter.dto';

export class FindUsersQueryDto {
  @IsOptional()
  @ApiPropertyOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserFilterDto)
  @ApiPropertyOptional({ type: UserFilterDto })
  filter?: UserFilterDto;
}
