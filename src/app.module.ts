import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { JOIPIPE_OPTIONS } from 'nestjs-joi';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './prisma';
import { AuthModule } from './modules/auth/auth.module';
import { JoiPipe } from 'nestjs-joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    PrismaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: JoiPipe,
    },
    {
      provide: JOIPIPE_OPTIONS,
      useValue: {
        usePipeValidationException: true,
      },
    },
  ],
})
export class AppModule {}
