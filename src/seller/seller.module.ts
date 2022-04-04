import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { TribeCoreService } from '../tribe-core/tribe-core.service';
import { Offer, OfferSchema } from './schemas/offer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { AuctionsConsumer } from './auctions.consumer';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'auctions',
    }),
    MongooseModule.forFeature([
      {
        name: Offer.name,
        schema: OfferSchema
      }
    ])
  ],
  providers: [
    SellerService,
    AuctionsConsumer
  ],
  exports: [SellerService]
})
export class SellerModule {
}
