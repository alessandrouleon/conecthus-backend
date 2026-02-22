import { PageRequest } from '@/@shared/pagination/pagination.interface';
import type { UserRepositoryInterface } from '@/modules/user/domain/repository/user.repository.interface';
import { Inject, Injectable } from '@nestjs/common';
import { OutputFindUsersUseCaseDto } from './find-all-user.use-case.dto';

@Injectable()
export class FindAllUserUseCase {
  constructor(
    @Inject('UserRepositoryInterface')
    private readonly userRepository: UserRepositoryInterface,
  ) {}
  async execute(filter: PageRequest): Promise<OutputFindUsersUseCaseDto> {
    const user = await this.userRepository.find(filter);

    return {
      result: user.result,
      pagination: user.pagination,
    };
  }
}
