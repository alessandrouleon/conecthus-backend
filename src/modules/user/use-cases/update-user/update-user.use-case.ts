import { HashService } from '@/@shared/services/hash.service';
import { UserMessageHelper } from '@/@shared/utils/message.help';
import UserFactory from '@/modules/user/domain/factory/user.factory';
import type { UserRepositoryInterface } from '@/modules/user/domain/repository/user.repository.interface';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  InputUpdateUserUseCaseDto,
  OutputUpdateUserUseCaseDto,
} from './update-user.use-case.dto';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly hashService: HashService,
  ) {}
  async execute(
    input: InputUpdateUserUseCaseDto,
  ): Promise<OutputUpdateUserUseCaseDto> {
    const existingUser = await this.userRepository.findById(input.id);

    if (!existingUser) {
      throw new HttpException(
        UserMessageHelper.ID_NOT_EXIST,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!existingUser.isActive) {
      throw new HttpException(
        UserMessageHelper.USER_NOT_ACTIVE,
        HttpStatus.CONFLICT,
      );
    }

    if (input && input.email !== existingUser.email) {
      const getEmail = await this.userRepository.findByEmail(input.email);
      if (getEmail) {
        throw new HttpException(
          UserMessageHelper.EXIST_EMAIL_FOR_UPDATE,
          HttpStatus.CONFLICT,
        );
      }
    }

    if (!existingUser.isActive) {
      throw new HttpException(
        UserMessageHelper.USER_NOT_ACTIVE,
        HttpStatus.CONFLICT,
      );
    }

    let passwordToSave = existingUser.password;

    if (input.password && input.password.trim() !== '') {
      passwordToSave = await this.hashService.hash(input.password);
    }

    const user = UserFactory.createUserFactory({
      id: existingUser.id,
      name: input.name ?? existingUser.name,
      email: input.email ?? existingUser.email,
      registration: input.registration ?? existingUser.registration,
      password: passwordToSave,
      isActive: existingUser.isActive,
      createdAt: existingUser.createdAt,
      updatedAt: new Date(),
      deletedAt: existingUser.deletedAt,
    });
    const userUpdated = await this.userRepository.update(user);

    Logger.log(
      `User updated. [ID: ${user.id}][name: ${user.name}]`,
      'UpdateUserUseCase.execute',
    );

    return userUpdated.toJSON();
  }
}
