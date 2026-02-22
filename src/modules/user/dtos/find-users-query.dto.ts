import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { UserFilterDto } from './user.filter.dto';

export class FindUsersQueryDto {
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UserFilterDto)
  filter?: UserFilterDto;
}
