import { Module } from '@nestjs/common';
import { PrivateModule } from './app/private/private.module';
import { ConfigModule } from '@nestjs/config';
import { PublicModule } from './app/public/public.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    PublicModule,
    PrivateModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
