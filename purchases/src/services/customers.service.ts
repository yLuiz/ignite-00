import { Injectable } from "@nestjs/common";
import { CurrentUser } from "src/http/auth/current-user";
import { PrismaService } from "src/prisma/prisma.service";


interface CreateCustomerParams {
  authUserId: string;
}

@Injectable()
export class CustomersService {
  constructor(
    private prisma: PrismaService
  ) {}

  async getCustomerByAuthUserId(authUserId: string) {
    return await this.prisma.customer.findUnique({
      where: {
        authUserId,
      }
    })
  }

  async createCustomer({ authUserId }: CreateCustomerParams) {
    const userAlreadyExists = await this.prisma.customer.findUnique({
      where: { authUserId },
    });

    if (userAlreadyExists) {
      throw new Error('User already exists.');
    };

    return await this.prisma.customer.create({
      data: {
        authUserId,
      }
    });
  };
};