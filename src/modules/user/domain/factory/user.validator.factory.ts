import ValidatorInterface from '@/@shared/domain/validator/validator.interface';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { UserJoiValidator } from '../validator/user.validator';

export class UserValidatorFactory {
    static create(): ValidatorInterface<UserEntity> {
        return new UserJoiValidator();
    }
}
