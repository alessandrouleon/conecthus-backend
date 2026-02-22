import { UserMessageHelper } from '@/@shared/utils/message.help';
import type { UserRepositoryInterface } from '@/modules/user/domain/repository/user.repository.interface';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  async execute(id: string): Promise<void> {
    const existsUser = await this.userRepository.findById(id);

    if (!existsUser) {
      throw new HttpException(
        UserMessageHelper.ID_NOT_FOUND_FOR_DELETE,
        HttpStatus.BAD_REQUEST,
      );
    }

    const deleteUser = await this.userRepository.delete(id);

    Logger.log(
      `User deleted. [ID: ${deleteUser.id}][name: ${deleteUser.name}]`,
      'DeleteUserUseCase.execute',
    );
  }
}
