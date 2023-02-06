import { ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import path from 'node:path';
import { CustomersResolver } from 'src/http/graphql/resolvers/customer.resolver';
import { PurchasesResolver } from 'src/http/graphql/resolvers/purchases.resolver';
import { CustomersService } from 'src/services/customers.service';
import { ProductsService } from 'src/services/products.service';
import { PurchasesService } from 'src/services/purchases.service';
import { DatabaseModule } from '../database/database.module';
import { ProductsResolver } from './graphql/resolvers/products.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    DatabaseModule,
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), 'src/schema.gql')
    })
  ],
  providers: [
    // Resovers
    ProductsResolver, 
    PurchasesResolver,
    CustomersResolver,

    // Services
    ProductsService, 
    PurchasesService,
    CustomersService,
  ]
})
export class HttpModule {}
