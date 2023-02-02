import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HelloController } from './hello/hello.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [HelloController]
})
export class HttpModule {}
