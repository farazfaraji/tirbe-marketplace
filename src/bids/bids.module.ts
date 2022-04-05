import { Module } from '@nestjs/common';
import { BidsService } from './bids.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Offer, OfferSchema } from '../seller/schemas/offer.schema';
import { EmailModule } from '../email/email.module';
import { TribeCoreModule } from '../tribe-core/tribe-core.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Offer.name,
        schema: OfferSchema
      }
    ]),
    EmailModule,
    TribeCoreModule
  ],
  providers: [BidsService],
  exports: [BidsService]
})
export class BidsModule {
}
