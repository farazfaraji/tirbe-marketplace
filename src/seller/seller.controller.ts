import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../common/decorators/auth.guard';
import { SellerService } from './seller.service';

@Controller('seller')
export class SellerController {

  constructor(
        protected readonly sellerService: SellerService
  ) {
  }

    @UseGuards(AuthGuard)
    @Post('webhook-new-offer')
  async newOfferOnWebhook() {
    return await this.sellerService.newOfferOnWebhook()
  }
}
