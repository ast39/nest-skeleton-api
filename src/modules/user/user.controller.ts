import {
  Body,
  Controller,
  Param,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UserCreateSchema } from './schemas/user.crate.schema';
import { UserUpdateSchema } from './schemas/user.update.schema';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { AccessTokenGuard } from '../../common/guards/accessToken.guard';
import {
  IUserCreate,
  IUserUpdate,
} from '../../common/interfaces/user.interface';
import { JoiPipe } from 'nestjs-joi';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    summary: 'Список пользователей',
    description: 'Получить список пользователей по фильтрам',
  })
  @ApiOkResponse({
    description: 'Список пользователей',
    type: UserDto,
    isArray: true,
    status: 200,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get()
  public async index(): Promise<UserDto[]> {
    return this.userService.userList({
      page: 1,
      limit: 10,
    });
  }

  @ApiOperation({
    summary: 'Пользователь по ID',
    description: 'Получить информацию о пользователе',
  })
  @ApiOkResponse({
    description: 'Информация о пользователе',
    type: UserDto,
    isArray: false,
    status: 200,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get(':user_id')
  public async show(@Param('user_id') userId: number): Promise<UserDto> {
    return this.userService.getUser(userId);
  }

  @ApiOperation({
    summary: 'Добавление пользователя',
    description: 'Добавление пользователя в БД',
  })
  @ApiOkResponse({
    description: 'Добавленный пользователь',
    type: UserDto,
    isArray: false,
    status: 201,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Post()
  public async create(
    @Body(new JoiPipe(UserCreateSchema)) body: IUserCreate,
  ): Promise<UserDto> {
    return await this.userService.createUser(body);
  }

  @ApiOperation({
    summary: 'Редактирование пользователя',
    description: 'Редактирование пользователя в БД',
  })
  @ApiOkResponse({
    description: 'Обновленный пользователь',
    type: UserDto,
    isArray: false,
    status: 200,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Put(':user_id')
  public async update(
    @Param('user_id') userId: number,
    @Body(new JoiPipe(UserUpdateSchema)) body: IUserUpdate,
  ): Promise<UserDto> {
    return await this.userService.updateUser(userId, body);
  }

  @ApiOperation({
    summary: 'Удаление пользователя',
    description: 'Удалить пользователя из БД',
  })
  @ApiOkResponse({
    description: 'Удаленный пользователь',
    type: UserDto,
    isArray: false,
    status: 200,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Delete(':user_id')
  public async delete(@Param('user_id') userId: number): Promise<UserDto> {
    return await this.userService.deleteUser(userId);
  }
}
