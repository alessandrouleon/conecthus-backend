import { PageRequest } from '@/@shared/pagination/pagination.interface';
import { UserIterfaces } from '../../domain/entities/user.entity';

export class InputFindUserUseCaseDto {
  name: string;
  registration: string;
  email: string;
  isActive: boolean;
}

export interface OutputFindUsersUseCaseDto {
  result: UserIterfaces[];
  pagination: PageRequest;
}
