import { HashService } from '@/@shared/services/hash.service';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repository/user.repository';
import { CreateUserUseCase } from './use-cases/create-user/create-user.use-case';
import { DeleteUserUseCase } from './use-cases/delete-user/delete-user.use-case';
import { FindByIdUserUseCase } from './use-cases/find-by-id-user/find-by-id-user.use-case';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },

    HashService,
    CreateUserUseCase,
    // UpdateUserUseCase,
    FindByIdUserUseCase,
    // FindAllUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [],
})
export class UserModule {}
