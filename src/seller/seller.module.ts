import { Module } from '@nestjs/common';
import { SellerService } from './seller.service';
import { TribeCoreService } from '../tribe-core/tribe-core.service';

@Module({
  providers: [SellerService],
})
export class SellerModule {
}
