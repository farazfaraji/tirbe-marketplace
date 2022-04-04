import { Injectable } from '@nestjs/common';
import { PostDto } from '../dto/post.dto';
import { POST } from '../dto/enums/post-types.enum';
import { PostWebhookService } from './post.webhook.service';

@Injectable()
export class WebhookService {

  constructor(
        protected readonly postWebhookService: PostWebhookService,
  ) {
  }

  public async newRequestOnWebhook(post: PostDto) {
    if (post.data.name === POST.NEW_POST)
      await this.postWebhookService.handler(post)

    return WebhookService.sendResponse(post.type, (post.data.challenge) ? post.data.challenge : post.data.id)
  }
  

  private static sendResponse(type: string, challengeId: string) {
    return {
      'type': type,
      'status': 'SUCCEEDED',
      'data': {
        'challenge': challengeId,
        'id': challengeId
      }
    }
  }

}
