import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RoleCreateSchema } from './schemas/role.crate.schema';
import { RoleUpdateSchema } from './schemas/role.update.schema';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { AccessTokenGuard } from '../../common/guards/accessToken.guard';
import { JoiPipe } from 'nestjs-joi';
import { JoiValidationPipe } from '../../common/pipes/joy.validation.pipe';
import {
  IRoleCreate,
  IRoleUpdate,
} from '../../common/interfaces/role.interface';

@ApiTags('Роли')
@Controller('role')
export class RoleController {
  constructor(private roleService: RoleService) {}

  @ApiOperation({
    summary: 'Список ролей',
    description: 'Получить список ролей по фильтрам',
  })
  @ApiOkResponse({
    description: 'Список ролей',
    type: RoleDto,
    isArray: true,
    status: 200,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get()
  public async index(): Promise<RoleDto[]> {
    return this.roleService.roleList({
      page: 1,
      limit: 10,
    });
  }

  @ApiOperation({
    summary: 'Роль по ID',
    description: 'Получить роль',
  })
  @ApiOkResponse({
    description: 'Информация о роли',
    type: RoleDto,
    isArray: false,
    status: 200,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get(':role_id')
  public async show(
    @Param('role_id', ParseIntPipe) roleId: number,
  ): Promise<RoleDto> {
    return this.roleService.getRole(roleId);
  }

  @ApiOperation({
    summary: 'Добавление роли',
    description: 'Добавление роли в БД',
  })
  @ApiOkResponse({
    description: 'Добавленная роль',
    type: RoleDto,
    isArray: false,
    status: 201,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @UsePipes(new JoiValidationPipe(RoleCreateSchema))
  @Post()
  public async create(@Body() body: IRoleCreate): Promise<RoleDto> {
    return await this.roleService.createRole(body);
  }

  @ApiOperation({
    summary: 'Редактирование роли',
    description: 'Редактирование роли в БД',
  })
  @ApiOkResponse({
    description: 'Обновленная роль',
    type: RoleDto,
    isArray: false,
    status: 200,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put(':role_id')
  public async update(
    @Param('role_id', ParseIntPipe) roleId: number,
    @Body(new JoiPipe(RoleUpdateSchema)) body: IRoleUpdate,
  ): Promise<RoleDto> {
    return await this.roleService.updateRole(roleId, body);
  }

  @ApiOperation({
    summary: 'Удаление роли',
    description: 'Удалить роль из БД',
  })
  @ApiOkResponse({
    description: 'Удаленная роль',
    type: RoleDto,
    isArray: false,
    status: 200,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete(':role_id')
  public async delete(
    @Param('role_id', ParseIntPipe) roleId: number,
  ): Promise<RoleDto> {
    return await this.roleService.deleteRole(roleId);
  }
}
