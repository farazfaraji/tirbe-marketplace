import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { PostWebhookService } from './post.webhook.service';
import { SellerModule } from '../seller/seller.module';
import { ReplyWebhookService } from './reply.webhook.service';
import { BidsModule } from '../bids/bids.module';

@Module({
  imports: [
    SellerModule,
    BidsModule
  ],
  providers: [
    WebhookService,
    PostWebhookService,
    ReplyWebhookService
  ],
  controllers: [WebhookController]
})
export class WebhookModule {
}
