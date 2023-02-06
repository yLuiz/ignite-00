import { Injectable } from "@nestjs/common";
import slugify from "slugify";
import { PrismaService } from "src/prisma/prisma.service";

interface CreatePurchaseParams {
  customerId: string;
  productId: string;
}

@Injectable()
export class PurchasesService {
  constructor(
    private prisma: PrismaService
  ) {}

  async listAllPurchases() {
    return await this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
  };

  async listAllFromCustomer(customerId: string) {
    return await this.prisma.purchase.findMany({
      where: {
        customerId
      }
    });
  };

  async createPurchase({ productId, customerId }: CreatePurchaseParams) {

    const product = await this.prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    if(!product) {
      throw new Error('Product not found.')
    }

    return await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      }
    })
  };
};