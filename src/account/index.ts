import { ModelDefinition } from '@nestjs/mongoose';
import { Account, AccountSchema } from './account.schema';
import { Customer, CustomerSchema } from './customer.schema';
import { Invite, InviteSchema } from './invite.schema';
import { Merchant, MerchantSchema } from './merchant.schema';

export const accountModels: ModelDefinition[] = [
  {
    name: Account.name,
    schema: AccountSchema,
    discriminators: [
      { name: Customer.name, schema: CustomerSchema },
      { name: Merchant.name, schema: MerchantSchema },
    ],
  },
  { name: Invite.name, schema: InviteSchema },
];
