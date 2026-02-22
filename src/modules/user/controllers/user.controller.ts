import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserUseCase } from '../use-cases/create-user/create-user.use-case';

//@ApiTags('Users')
// @ApiBearerAuth('access-token')
@Controller('users')
export class UserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  // Apenas ADMIN pode criar usuários
  @Post()
  // @ApiOperation({ summary: 'Criar usuário (USER)' })
  // @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  // @ApiResponse({ status: 400, description: 'Erro de validação' })
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

  //   // ADMIN e MANAGER podem atualizar
  //   @Put(':id')
  //   @ApiOperation({ summary: 'Atualizar usuário (USER)' })
  //   @ApiResponse({ status: 200, description: 'Usuário editado com sucesso' })
  //   @ApiResponse({ status: 400, description: 'Erro de validação' })
  //   async update(
  //     @Param('id') id: string,
  //     @Body() input: UpdateUserDto,
  //     @CurrentUser() currentUser: ICurrentUser,
  //   ) {
  //     try {
  //       input.id = id;
  //       return await this.userFacade.update(input);
  //     } catch (e) {
  //       if (e.name === 'DomainError') {
  //         throw new BadRequestException(e.errors);
  //       }
  //       throw e;
  //     }
  //   }

  //   // Qualquer usuário autenticado pode ver
  //   @Get(':id')
  //   @Roles(ROLES.ADMIN, ROLES.CLIENT_ADMIN, ROLES.USER)
  //   @ApiParam({ name: 'id', type: String })
  //   @ApiOperation({ summary: 'Buscar usuário por ID' })
  //   @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  //   @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  //   async findById(@Param('id') id: string) {
  //     try {
  //       return await this.userFacade.findById(id);
  //     } catch (e) {
  //       if (e.name === 'DomainError') {
  //         throw new BadRequestException(e.errors);
  //       }
  //       throw e;
  //     }
  //   }

  //   // Apenas ADMIN pode listar todos
  //   @Get()
  //   @Roles(ROLES.ADMIN, ROLES.CLIENT_ADMIN, ROLES.MANAGER, ROLES.USER)
  //   @ApiOperation({ summary: 'LISTA DE USUARIOS' })
  //   @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  //   @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  //   async find(@Query() query: FindUsersQueryDto) {
  //     const filter: any = {};
  //     for (const key in query) {
  //       if (key.startsWith('filter[') && key.endsWith(']')) {
  //         const field = key.slice(7, -1);
  //         filter[field] = query[key];
  //       }
  //     }
  //     return this.userFacade.find({ ...query, filter });
  //   }

  //   // Apenas ADMIN pode deletar
  //   @Delete(':id')
  //   @Roles(ROLES.ADMIN)
  //   @ApiParam({ name: 'id', type: String })
  //   @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
  //   async delete(@Param('id') id: string): Promise<void> {
  //     try {
  //       return await this.userFacade.delete(id);
  //     } catch (e) {
  //       if (e.name === 'DomainError') {
  //         throw new BadRequestException(e.errors);
  //       }
  //       throw e;
  //     }
}
