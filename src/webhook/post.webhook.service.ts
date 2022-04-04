import { Injectable } from '@nestjs/common';
import { MappingFields, PostDto } from '../dto/post.dto';
import { TribeCoreService } from '../tribe-core/tribe-core.service';
import { AuctionType } from '../common/types/auction.type';
import { SellerService } from '../seller/seller.service';
import { Offer } from '../seller/schemas/offer.schema';

@Injectable()
export class PostWebhookService {
  constructor(
        protected readonly core: TribeCoreService,
        private readonly sellerService: SellerService
  ) {
  }

  async handler(post: PostDto) {
    const postObject = post.data.object;
    console.log(postObject)
    if (postObject.attachmentIds.length !== 1) {
      // better to show error on client side
      // but as we don't have this option, I will
      // remove the wrong structure post
      await this.removePost(postObject.id)
    }
    const content = PostWebhookService.getDataFromContent(postObject.mappingFields)
    if (!content)
      await this.removePost(postObject.id);
    if (typeof content !== 'boolean') {
      await this.sellerService.createNewOffer({
        post_id: postObject.id,
        attachmentId: postObject.attachmentIds[0],
        member_id: postObject.createdById,
        member_email: 'faraz',
        price: parseFloat(content.price.replace(/\D/g, '')),
        end_date: content.endDate
      })
    }
  }

  private async removePost(postId: string) {
    await this.core.client.posts.delete({
      id: postId
    });
  }

  private static getDataFromContent(fields: MappingFields[]): AuctionType | boolean {
    if (fields.length !== 2)
      return false
    return PostWebhookService.removeHtmlTagFromContent(fields[1].value);
  }

  private static removeHtmlTagFromContent(value: string): AuctionType | boolean {
    value = value.substring(4)
    value = value.slice(0, -5);
    const data = value.split('<br>');
    if (data.length !== 2)
      return false
    return { price: data[0], endDate: new Date(data[1]) }
  }
}
