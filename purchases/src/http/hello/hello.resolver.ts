import { UseGuards } from '@nestjs/common';
import { Resolver, Query } from '@nestjs/graphql';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthorizationGuard } from '../auth/authorization.guard';

@Resolver()
export class HelloResolver {

  constructor(
    private prisma: PrismaService,
  ) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  async hello() {
    return 'Hello World';
  };
};