import { HashService } from '@/@shared/services/hash.service';
import UserFactory from '@/modules/user/domain/factory/user.factory';
import type { UserRepositoryInterface } from '@/modules/user/domain/repository/user.repository.interface';

import { UserMessageHelper } from '@/@shared/utils/message.help';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  InputCreateUserUseCaseDto,
  OutputCreateUserUseCaseDto,
} from './create-user.use-case.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
    private readonly hashService: HashService,
  ) {}

  async execute(
    input: InputCreateUserUseCaseDto,
  ): Promise<OutputCreateUserUseCaseDto> {
    await this.ensureUserIsUnique(input.registration, input.email);

    const user = UserFactory.createUserFactory({
      ...input,
      createdAt: new Date(),
    });
    const hashedPassword = await this.hashService.hash(input.password);
    user.password = hashedPassword;
    const userCreated = await this.userRepository.create(user);

    Logger.log(
      `User created. [ID: ${user.id}][name: ${user.name}]`,
      'CreateUserUseCase.execute',
    );

    return userCreated.toJSON();
  }

  private async ensureUserIsUnique(
    registration: string,
    email: string,
  ): Promise<void> {
    const [existingByRegistration, existingByEmail] = await Promise.all([
      this.userRepository.findByUserRegistration(registration),
      this.userRepository.findByEmail(email),
    ]);

    if (existingByRegistration) {
      throw new HttpException(
        UserMessageHelper.EXIST_REGISTRATION,
        HttpStatus.CONFLICT,
      );
    }

    if (existingByEmail) {
      throw new HttpException(
        UserMessageHelper.EXIST_EMAIL,
        HttpStatus.CONFLICT,
      );
    }
  }
}
