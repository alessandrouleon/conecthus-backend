import {
  PageRequest,
  UserFilter,
} from '@/@shared/pagination/pagination.interface';
import type { UserRepositoryInterface } from '@/modules/user/domain/repository/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { OutputFindUsersUseCaseDto } from './find-all-user.use-case.dto';

@Injectable()
export class FindAllUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}
  async execute(
    request: PageRequest<UserFilter>,
  ): Promise<OutputFindUsersUseCaseDto> {
    if (request.filter) {
      request.filter = Object.fromEntries(
        Object.entries(request.filter).filter(
          ([_, value]) => value && value !== 'string',
        ),
      );
    }

    const user = await this.userRepository.find(request);

    return {
      result: user.result,
      pagination: user.pagination,
    };
  }
}
