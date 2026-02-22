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
    const [existsRegistration, existsEmail] = await Promise.all([
      this.userRepository.findByRegistration(input.registration),
      this.userRepository.findByEmail(input.email),
    ]);

    if (existsRegistration) {
      // if (existsRegistration.registration === input.registration) {
      throw new HttpException(
        UserMessageHelper.REGISTRATION_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
      //  }
    }

    if (existsEmail) {
      // if (existsEmail.email === input.email) {
      throw new HttpException(
        UserMessageHelper.EMAIL_ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
      //}
    }
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
}
