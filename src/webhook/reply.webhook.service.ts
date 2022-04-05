import { Injectable } from '@nestjs/common';
import { PostDto } from '../dto/post.dto';
import { TribeCoreService } from '../tribe-core/tribe-core.service';
import { BidsService } from '../bids/bids.service';

@Injectable()
export class ReplyWebhookService {
  constructor(
        protected readonly core: TribeCoreService,
        private readonly bidService: BidsService
  ) {
  }

  async handler(post: PostDto) {
    const fatherPost = post.data.object.repliedToId;
    const price = ReplyWebhookService.removeHTMLTags(post.data.object.mappingFields[0].value);
    const member = await this.core.getMemberById(post.data.object.createdById)
    const isAcceptable = await this.bidService.isNewBidAcceptable(fatherPost, price) && await this.bidService.checkClientWallet(member.email)
    if (isAcceptable) {
      await this.bidService.acceptBid({
        fatherPostId: fatherPost,
        newAmount: price,
        customerEmail: member.email,
        customerId: post.data.object.createdById,
      });
    }
    else {
      await this.removeReply(post.data.object.id)
    }

  }

  private async removeReply(postId: string) {
    await this.core.client.posts.delete({
      id: postId
    });
  }

  static removeHTMLTags(content: string): number {
    return parseFloat(content.replace(/\D/g, ''))
  }


}
