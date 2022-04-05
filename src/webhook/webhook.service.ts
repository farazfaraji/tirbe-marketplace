import { Injectable } from '@nestjs/common';
import { POST } from '../dto/enums/post-types.enum';
import { PostWebhookService } from './post.webhook.service';
import { ReplyWebhookService } from './reply.webhook.service';

@Injectable()
export class WebhookService {

  constructor(
        protected readonly postWebhookService: PostWebhookService,
        protected readonly replyWebhookService: ReplyWebhookService
  ) {
  }

  public async newRequestOnWebhook(data) {
    console.log(data)
    if (data.data.name === POST.NEW_POST)
      if (!data.data.object.isReply)
        await this.postWebhookService.handler(data)
      else
        await this.replyWebhookService.handler(data)

    return WebhookService.sendResponse(data.type, (data.data.challenge) ? data.data.challenge : data.data.id)
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
