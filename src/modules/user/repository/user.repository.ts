import { PrismaService } from '@/@shared/config/prisma/prisma.service';
import {
  PageRequest,
  PageResponse,
  UserFilter,
} from '@/@shared/pagination/pagination.interface';

import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { UserRepositoryInterface } from '@/modules/user/domain/repository/user.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private readonly repository: PrismaService) {}
  update(entity: UserEntity): Promise<UserEntity> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<UserEntity> {
    const raw = await this.repository.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
    return this.toDomain(raw);
  }
  async findOneById(id: string): Promise<UserEntity | null> {
    const raw = await this.repository.user.findUnique({
      where: { id, deletedAt: null },
    });
    if (!raw) return null;
    return this.toDomain(raw);
  }
  async findByUserRegistration(
    registration: string,
  ): Promise<UserEntity | null> {
    const raw = await this.repository.user.findUnique({
      where: { registration, deletedAt: null },
    });
    if (!raw) return null;
    return this.toDomain(raw);
  }
  async findByEmail(email: string): Promise<UserEntity | null> {
    const raw = await this.repository.user.findUnique({
      where: { email, deletedAt: null },
    });
    if (!raw) return null;
    return this.toDomain(raw);
  }
  find(request: PageRequest<UserFilter>): Promise<PageResponse<UserEntity>> {
    throw new Error('Method not implemented.');
  }
  async create(entity: UserEntity): Promise<UserEntity> {
    const raw = await this.repository.user.create({
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

    return this.toDomain(raw);
  }

  private toDomain(raw: any): UserEntity {
    return new UserEntity({
      // id: raw.id,
      name: raw.name,
      registration: raw.registration,
      email: raw.email,
      password: raw.password,
      isActive: raw.isActive,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      deletedAt: raw.deletedAt,
    });
  }
}
