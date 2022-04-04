import { Injectable } from '@nestjs/common';
import { PostDto } from '../dto/post.dto';
import { TribeCoreService } from '../tribe-core/tribe-core.service';

@Injectable()
export class PostWebhookService {
  constructor(
        protected readonly core: TribeCoreService
  ) {
  }

  async handler(post: PostDto) {
    const postObject = post.data.object;
    if (postObject.imageIds.length !== 1) {
      // better to show error on client side
      // but as we dont have this option, I will
      // remove the wrong structure post
      await this.removePost(postObject.id)
    }
    
  }

  private async removePost(postId: string) {
    await this.core.client.posts.delete({
      id: postId
    });
  }
}
