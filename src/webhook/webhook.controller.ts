import { Body, Controller, Header, HttpCode, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../common/decorators/auth.guard';
import { WebhookService } from './webhook.service';
import { PostTestDto } from '../dto/post.test.dto';
import { PostDto } from '../dto/post.dto';

@Controller('webhooks')
export class WebhookController {

  constructor(
        protected readonly webhookService: WebhookService
  ) {
  }

    @UseGuards(AuthGuard)
    @Post('')
    @HttpCode(200)
  async newRequestOnWebhook(@Body() post: PostDto) { //for webhook test you need to use PostTestDto
    return await this.webhookService.newRequestOnWebhook(post)
  }
}
