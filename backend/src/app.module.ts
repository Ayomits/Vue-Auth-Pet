import { Module } from '@nestjs/common';
import { PrivateModule } from './app/private/private.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PrivateModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
