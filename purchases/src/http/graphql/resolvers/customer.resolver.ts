import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Purchase } from '@prisma/client';
import { CurrentUser, IAuthUser } from 'src/http/auth/current-user';
import { CustomersService } from 'src/services/customers.service';
import { PurchasesService } from 'src/services/purchases.service';
import { AuthorizationGuard } from '../../auth/authorization.guard';
import { Customer } from '../models/customer';

@Resolver(() => Customer)
export class CustomersResolver {

  constructor(
    private customersService: CustomersService,
    private purchaseService: PurchasesService
  ) {}

  @ResolveField()
  async purchases(@Parent() purchase: Purchase[], @CurrentUser() user: IAuthUser) {

    const customer = await this.customersService.getCustomerByAuthUserId(user.sub);
    if (!customer) {
      throw new Error('Customer not found.')
    }
    
    return this.purchaseService.listAllFromCustomer(customer.id);
  }

  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me (@CurrentUser() user: IAuthUser) {
    return this.customersService.getCustomerByAuthUserId(user.sub);
  };
};