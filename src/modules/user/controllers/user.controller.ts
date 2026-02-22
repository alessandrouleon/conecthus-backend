import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserUseCase } from '../use-cases/create-user/create-user.use-case';
import { DeleteUserUseCase } from '../use-cases/delete-user/delete-user.use-case';
import { FindAllUserUseCase } from '../use-cases/find-all-user/find-all-user.use-case';
import { FindByIdUserUseCase } from '../use-cases/find-by-id-user/find-by-id-user.use-case';
import { UpdateUserUseCase } from '../use-cases/update-user/update-user.use-case';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findByIdUserUseCase: FindByIdUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly findAllUserUseCase: FindAllUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar usuário (USER)' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  async create(@Body() input: CreateUserDto) {
    try {
      return await this.createUserUseCase.execute(input);
    } catch (e) {
      if (e.name === 'DomainError') {
        throw new BadRequestException(e.errors);
      }
      throw e;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar usuário (USER)' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  async update(@Param('id') id: string, @Body() input: UpdateUserDto) {
    try {
      input.id = id;
      return await this.updateUserUseCase.execute(input);
    } catch (e) {
      if (e.name === 'DomainError') {
        throw new BadRequestException(e.errors);
      }
      throw e;
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiOperation({ summary: 'Buscar usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  async findById(@Param('id') id: string) {
    try {
      return await this.findByIdUserUseCase.execute(id);
    } catch (e) {
      if (e.name === 'DomainError') {
        throw new BadRequestException(e.errors);
      }
      throw e;
    }
  }

  @Get()
  @ApiOperation({ summary: 'LISTA DE USUARIOS' })
  // @ApiQuery({
  //   name: 'filter',
  //   required: false,
  //   style: 'deepObject',
  //   explode: true,
  //   type: UserFilterDto,
  // })
  async find(@Query() query: any) {
    const filter: any = {};
    for (const key in query) {
      if (key.startsWith('filter[') && key.endsWith(']')) {
        const field = key.slice(7, -1);
        filter[field] = query[key];
      }
    }
    return this.findAllUserUseCase.execute({ ...query, filter });
  }

  @Delete(':id')
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
  async delete(@Param('id') id: string): Promise<void> {
    try {
      return await this.deleteUserUseCase.execute(id);
    } catch (e) {
      if (e.name === 'DomainError') {
        throw new BadRequestException(e.errors);
      }
      throw e;
    }
  }
}
