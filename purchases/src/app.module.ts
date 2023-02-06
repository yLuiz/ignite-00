import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from './http/http.module';
import { PrismaService } from './prisma/prisma.service';
import { ProductsService } from './services/products.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
