import {
  PageRequest,
  PageResponse,
  UserFilter,
} from '@/@shared/pagination/pagination.interface';
import { UserEntity } from '../entities/user.entity';

export interface UserRepositoryInterface {
  create(entity: UserEntity): Promise<UserEntity>;
  update(entity: UserEntity): Promise<UserEntity>;
  delete(id: string): Promise<UserEntity>;
  findOneById(id: string): Promise<UserEntity | null>;
  findByUserRegistration(registration: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  find(request: PageRequest<UserFilter>): Promise<PageResponse<UserEntity>>;
}
