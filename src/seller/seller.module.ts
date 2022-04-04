import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { TribeCoreService } from '../tribe-core/tribe-core.service';
import { Offer, OfferSchema } from './schemas/offer.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Offer.name,
        schema: OfferSchema
      }
    ])
  ],
  providers: [SellerService],
  exports: [SellerService]
})
export class SellerModule {
}
