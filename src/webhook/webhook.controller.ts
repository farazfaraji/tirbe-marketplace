import { Body, Controller, Header, HttpCode, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../common/decorators/auth.guard';
import { WebhookService } from './webhook.service';
import { PostDto } from '../dto/post.dto';

@Controller('webhook')
export class WebhookController {

  constructor(
        protected readonly webhookService: WebhookService
  ) {
  }

    @UseGuards(AuthGuard)
    @Post('new-posts')
    @HttpCode(200)
  async newOfferOnWebhook(@Body() post: PostDto) {
    return await this.webhookService.newPostHandler(post)
  }
}
