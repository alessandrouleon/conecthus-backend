import { UserMessageHelper } from '@/@shared/utils/message.help';
import type { UserRepositoryInterface } from '@/modules/user/domain/repository/user.repository.interface';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { OutputFindByIdUserUseCaseDto } from './find-by-id-user.use-case.dto';

@Injectable()
export class FindByIdUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}
  async execute(id: string): Promise<OutputFindByIdUserUseCaseDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpException(
        UserMessageHelper.ID_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }

    Logger.log(
      `User found. [ID: ${user.id}][name: ${user.name}]`,
      'FindByIdUserUseCase.execute',
    );

    return user?.toJSON();
  }
}
