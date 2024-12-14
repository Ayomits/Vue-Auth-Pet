import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

export class Abstract {
  db: PrismaClient;
  configService: ConfigService;
  constructor() {
    this.db = new PrismaClient();
    this.configService = new ConfigService();
  }
}
