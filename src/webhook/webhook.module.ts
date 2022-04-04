import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { PostWebhookService } from './post.webhook.service';

@Module({
  providers: [
    WebhookService,
    PostWebhookService
  ],
  controllers: [WebhookController]
})
export class WebhookModule {
}
