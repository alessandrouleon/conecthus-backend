import NotificationErros from '@/@shared/domain/notification/notification.error';
import ValidatorInterface from '@/@shared/domain/validator/validator.interface';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import {
  PASSWORD_INVALID_MESSAGE,
  PASSWORD_REGEX,
} from '@/modules/user/domain/value-objects/password.vo';
import Joi from 'joi';

export class UserJoiValidator implements ValidatorInterface<UserEntity> {
  validate(entity: UserEntity): void {
    const schema = this.getSchema();

    const data = {
      id: entity.id,
      name: entity.name,
      registration: entity.registration,
      email: entity.email,
      password: entity.password,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };

    const { error } = schema.validate(data, {
      abortEarly: false,
      allowUnknown: true,
    });

    if (error) {
      throw new NotificationErros(
        error.details.map((detail) => {
          const notificationErrors = {
            context: 'user',
            message: detail.message,
          };
          return notificationErrors;
        }),
      );
    }
  }

  getSchema(): Joi.ObjectSchema {
    return Joi.object({
      name: Joi.string().trim().min(2).max(100).required().messages({
        'any.required': 'Name is required',
        'string.empty': 'Name cannot be empty',
        'string.min': 'Name must be at least 2 characters',
        'string.max': 'Name cannot exceed 100 characters',
        'string.base': 'Name must be a string',
      }),

      registration: Joi.string().trim().min(2).max(50).required().messages({
        'any.required': 'Registration is required',
        'string.empty': 'Registration cannot be empty',
        'string.min': 'Registration must be at least 2 characters',
        'string.max': 'Registration cannot exceed 50 characters',
        'string.base': 'Registration must be a string',
      }),

      email: Joi.string().trim().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email cannot be empty',
        'string.email': 'Email must be a valid address',
        'string.base': 'Email must be a string',
      }),

      password: Joi.string()
        .trim()
        .min(8)
        .max(80)
        .pattern(PASSWORD_REGEX)
        .required()
        .messages({
          'any.required': 'Password is required',
          'string.empty': 'Password cannot be empty',
          'string.min': 'Password must be at least 8 characters',
          'string.max': 'Password must be at most 80 characters',
          'string.base': 'Password must be a string',
          'string.pattern.base': PASSWORD_INVALID_MESSAGE,
        }),

      isActive: Joi.boolean().required().messages({
        'any.required': 'isActive is required',
      }),
    });
  }
}
