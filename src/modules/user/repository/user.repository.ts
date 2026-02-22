import { PrismaService } from '@/@shared/config/prisma/prisma.service';
import {
  PageRequest,
  PageResponse,
  UserFilter,
} from '@/@shared/pagination/pagination.interface';

import {
  UserEntity,
  UserIterfaces,
} from '@/modules/user/domain/entities/user.entity';
import { UserRepositoryInterface } from '@/modules/user/domain/repository/user.repository.interface';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly repository: PrismaService) {}

  async create(entity: UserEntity): Promise<UserEntity> {
    const persistedUser = await this.repository.user.create({
      data: {
        id: entity.id,
        name: entity.name,
        registration: entity.registration,
        email: entity.email,
        password: entity.password,
        isActive: entity.isActive,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        deletedAt: entity.deletedAt,
      },
    });

    return this.toDomain(persistedUser);
  }

  async update(entity: UserEntity): Promise<UserEntity> {
    const updatedUser = await this.repository.user.update({
      where: { id: entity.id },
      data: {
        id: entity.id,
        name: entity.name,
        registration: entity.registration,
        email: entity.email,
        password: entity.password,
        isActive: entity.isActive,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
        deletedAt: entity.deletedAt,
      },
    });
    return this.toDomain(updatedUser);
  }
  async delete(id: string): Promise<UserEntity> {
    const deletedUser = await this.repository.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return this.toDomain(deletedUser);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.repository.user.findUnique({
      where: { id, deletedAt: null },
    });
    if (!user) return null;
    return this.toDomain(user);
  }

  async findByRegistration(registration: string): Promise<UserEntity | null> {
    const user = await this.repository.user.findFirst({
      where: { registration },
    });
    if (!user) return null;
    return this.toDomain(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.repository.user.findUnique({
      where: { email },
    });
    if (!user) return null;
    return this.toDomain(user);
  }

  async find(
    query: PageRequest<UserFilter>,
  ): Promise<PageResponse<UserEntity>> {
    const { filter = {}, order = 'desc', orderBy = 'createdAt' } = query;

    const limit = Number(query.limit) || 5;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      deletedAt: null,
    };

    const OR: Prisma.UserWhereInput[] = [];

    if (filter.name) {
      OR.push({ name: { contains: filter.name } });
    } else if (filter.search) {
      OR.push({ name: { contains: filter.search } });
    }

    if (filter.registration) {
      OR.push({ registration: { contains: filter.registration } });
    } else if (filter.search) {
      OR.push({ registration: { contains: filter.search } });
    }

    if (filter.email) {
      OR.push({ email: { contains: filter.email } });
    } else if (filter.search) {
      OR.push({ email: { contains: filter.search } });
    }

    if (OR.length > 0) {
      where.OR = OR;
    }

    const [users, total] = await Promise.all([
      this.repository.user.findMany({
        where,
        orderBy: { [orderBy]: order },
        skip,
        take: Number(limit),
      }),
      this.repository.user.count({ where }),
    ]);

    return {
      result: users.map((user) => this.toDomain(user)),
      pagination: {
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        size: Number(limit),
        total,
      },
    };
  }

  private toDomain(entity: UserIterfaces): UserEntity {
    return new UserEntity({
      id: entity.id,
      name: entity.name,
      registration: entity.registration,
      email: entity.email,
      password: entity.password,
      isActive: entity.isActive,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    });
  }
}
