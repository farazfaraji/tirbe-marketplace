import { Injectable } from '@nestjs/common';
import { PostDto } from '../dto/post.dto';

@Injectable()
export class WebhookService {

  public async newPostHandler(post: PostDto) {
    console.log(post);
    return WebhookService.sendResponse(post.type, post.data.challenge)
  }

  private static sendResponse(type: string, challengeId: string) {
    return {
      'type': type,
      'status': 'SUCCEEDED',
      'data': {
        'challenge': challengeId
      }
    }
  }

}
