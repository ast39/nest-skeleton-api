import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IJwtToken } from '../../common/interfaces/jwt.interface';
import { LoginDto } from './dto/login.dto';
import { UserDto } from '../user/dto/user.dto';
import { AccessTokenGuard } from '../../common/guards/accessToken.guard';
import { RefreshTokenGuard } from '../../common/guards/refreshToken.guard';
import { IUserCreate } from '../../common/interfaces/user.interface';
import { JwtUser } from '../../common/decorators/user.decorator';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация' })
  @ApiOkResponse({
    description: 'Регистрация',
    type: IJwtToken,
    isArray: false,
    status: 201,
  })
  @Post('signup')
  async registration(@Body() createUser: IUserCreate): Promise<IJwtToken> {
    return await this.authService.signUp(createUser);
  }

  @ApiOperation({ summary: 'Авторизация' })
  @ApiOkResponse({
    description: 'Авторизация',
    type: IJwtToken,
    isArray: false,
    status: 200,
  })
  @Post('signin')
  async login(@Body() loginDto: LoginDto): Promise<IJwtToken> {
    return await this.authService.signIn(loginDto);
  }

  @ApiOperation({ summary: 'Обновление токенов' })
  @ApiOkResponse({
    description: 'Обновление токенов',
    type: IJwtToken,
    isArray: false,
    status: 200,
  })
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(
    @JwtUser('id') userId: number,
    @JwtUser() refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken);
  }

  @ApiOperation({ summary: 'Выход из системы' })
  @ApiOkResponse({
    description: 'Выход из системы',
    type: Boolean,
    status: 200,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('logout')
  async logout(@JwtUser('id') userId: number): Promise<UserDto> {
    return await this.authService.logout(userId);
  }

  @ApiOperation({ summary: 'Информация обо мне' })
  @ApiOkResponse({
    description: 'Информация обо мне',
    type: UserDto,
    isArray: false,
    status: 200,
  })
  @ApiBearerAuth()
  @UseGuards(AccessTokenGuard)
  @Get('me')
  async me(@JwtUser('id') userId: number): Promise<UserDto> {
    return await this.authService.me(userId);
  }
}
