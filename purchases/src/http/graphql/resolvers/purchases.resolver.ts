import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CurrentUser, IAuthUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/services/customers.service';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { Product } from '../models/product';
import { Purchase } from '../models/purchase';

@Resolver(() => Purchase)
export class PurchasesResolver {

  constructor(
    private purchasesService: PurchasesService,
    private productsService: ProductsService,
    private customersService: CustomersService
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  };

  @ResolveField(() => Product)
  product(
    @Parent() purchase: Purchase
  ) {
    return this.productsService.getProductById(purchase.productId);
  }


  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @Args('data') data: CreatePurchaseInput, 
    @CurrentUser() user: IAuthUser
  ) {  
    
    let customer = await this.customersService.getCustomerByAuthUserId(user.sub);
    
    if (!customer) {
      customer = await this.customersService.createCustomer({ authUserId: user.sub });
    }

    return await this.purchasesService.createPurchase({
      ...data, 
      customerId: customer.id
    });
  }
};