import { Injectable } from '@nestjs/common';
import { MappingFields, PostDto } from '../dto/post.dto';
import { TribeCoreService } from '../tribe-core/tribe-core.service';
import { AuctionType } from '../common/types/auction.type';
import { SellerService } from '../seller/seller.service';

@Injectable()
export class PostWebhookService {
  constructor(
        protected readonly core: TribeCoreService,
        private readonly sellerService: SellerService
  ) {
  }

  async handler(post: PostDto) {
    const postObject = post.data.object;
    if (postObject.imageIds.length !== 1) {
      // better to show error on client side
      // but as we don't have this option, I will
      // remove the wrong structure post
      await this.removePost(postObject.id)
    }
    const content = PostWebhookService.getDataFromContent(postObject.mappingFields)
    if (!content)
      await this.removePost(postObject.id);
    if (typeof content !== 'boolean') {
      if (new Date(content.endDate) > new Date()) {
        const member = await this.core.getMemberById(postObject.createdById)
        await this.sellerService.createNewOffer({
          postId: postObject.id,
          attachmentId: postObject.imageIds[0],
          memberId: postObject.createdById,
          memberEmail: member.email,
          price: parseFloat(content.price.replace(/\D/g, '')),
          endDate: content.endDate,
          mappingFields: postObject.mappingFields
        })
      }
      else {
        await this.removePost(postObject.id)
      }
    }
  }

  private async removePost(postId: string) {
    await this.core.client.posts.delete({
      id: postId
    });
  }

  private static getDataFromContent(fields: MappingFields[]): AuctionType | boolean {
    if (fields.length < 2)
      return false
    return PostWebhookService.removeHtmlTagFromContent(fields[1].value);
  }

  private static removeHtmlTagFromContent(value: string): AuctionType | boolean {
    value = value.substring(4) //remove "<p>
    const lines = value.split('<br>')
    if (lines.length < 2)
      return false

    const endDate = lines[1].split('</p>')[0];
    return { price: lines[0], endDate: endDate }
  }
}
