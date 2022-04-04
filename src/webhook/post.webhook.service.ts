import { Injectable } from '@nestjs/common';
import { MappingFields, PostDto } from '../dto/post.dto';
import { TribeCoreService } from '../tribe-core/tribe-core.service';
import { AuctionType } from './types/auction.type';

@Injectable()
export class PostWebhookService {
  constructor(
        protected readonly core: TribeCoreService
  ) {
  }

  async handler(post: PostDto) {
    const postObject = post.data.object;
    console.log(postObject)
    if (postObject.attachmentIds.length !== 1) {
      // better to show error on client side
      // but as we dont have this option, I will
      // remove the wrong structure post
      await this.removePost(postObject.id)
    }
    PostWebhookService.getDataFromContent(postObject.mappingFields)
  }

  private async removePost(postId: string) {
    await this.core.client.posts.delete({
      id: postId
    });
  }

  private static getDataFromContent(fields: MappingFields[]): AuctionType | boolean {
    if (fields.length !== 2)
      return false
    const content = PostWebhookService.removeHtmlTagFromContent(fields[1].value);
    if (!content)
      return false;

  }

  private static removeHtmlTagFromContent(value: string): AuctionType | boolean {
    value = value.substring(4)
    value = value.slice(0, -5);
    const data = value.split('<br>');
    if (data.length !== 2)
      return false
    return { price: data[0], endDate: data[1] }
  }
}
