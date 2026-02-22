// import { HashService } from '@/@shared/services/hash.service';
// import UserFactory from '@/modules/user/domain/factory/user.factory';
// import type { UserRepositoryInterface } from '@/modules/user/domain/repository/user.repository.interface';
// import { UserMessageHelper } from '@/utils/message/message.help';
// import {
//   HttpException,
//   HttpStatus,
//   Inject,
//   Injectable,
//   Logger,
// } from '@nestjs/common';
// import {
//   InputUpdateUserUseCaseDto,
//   OutputUpdateUserUseCaseDto,
// } from './update-user.use-case.dto';

// @Injectable()
// export class UpdateUserUseCase {
//   constructor(
//     @Inject('UserRepositoryInterface')
//     private readonly userRepository: UserRepositoryInterface,
//     private readonly hashService: HashService,
//   ) {}
//   async execute(
//     input: InputUpdateUserUseCaseDto,
//   ): Promise<OutputUpdateUserUseCaseDto> {
//     // const existeUser = await this.userRepository.findOneById(input.id);
//     const existingUser = await this.userRepository.findOneById(input.id);

//     if (!existingUser) {
//       throw new HttpException(
//         UserMessageHelper.ID_NOT_EXIST,
//         HttpStatus.BAD_REQUEST,
//       );
//     }

//     if (!existingUser.isActive) {
//       throw new HttpException(
//         UserMessageHelper.USER_NOT_ACTIVE,
//         HttpStatus.CONFLICT,
//       );
//     }

//     // if (input && input.email !== existeUser.email) {
//     //   const getEmail = await this.userRepository.findByEmail(input.email);
//     //   if (getEmail) {
//     //     throw new HttpException(
//     //       UserMessageHelper.EXIST_EMAIL_FOR_UPDATE,
//     //       HttpStatus.CONFLICT,
//     //     );
//     //   }
//     // }

//     // if (!existeUser.isActive) {
//     //   throw new HttpException(
//     //     UserMessageHelper.USER_NOT_ACTIVE,
//     //     HttpStatus.CONFLICT,
//     //   );
//     // }

//     // let passwordToSave = existeUser.password;

//     // if (input.password && input.password.trim() !== '') {
//     //   passwordToSave = await this.hashService.hash(input.password);
//     // }

//     // const user = UserFactory.createUserFactory({
//     //   id: input.id,
//     //   name: input.name,
//     //   registration: input.registration,
//     //   email: input.email,
//     //   password: passwordToSave,
//     //   isActive: input.isActive,
//     //   createdAt: existeUser.createdAt,
//     // });

//      await this.ensureUniqueFieldsOnUpdate(input, existingUser);

//     const password = await this.resolvePassword(input.password, existingUser.password);

//     const user = UserFactory.createUserFactory({
//       ...input,
//       password,
//       createdAt: existingUser.createdAt,
//     });

//     const userUpdated = await this.userRepository.update(user);

//     Logger.log(
//       `User updated. [ID: ${user.id}][name: ${user.name}]`,
//       'UpdateUserUseCase.execute',
//     );

//     return userUpdated.toJSON();
//   }
// }
