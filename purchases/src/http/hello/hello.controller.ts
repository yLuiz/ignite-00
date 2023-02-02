import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from '../auth/authorization.guard';

@Controller('test')
export class HelloController {
  @Get()
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'hello JWT';
  };
};