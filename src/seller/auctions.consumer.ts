import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from '../email/email.service';
import { Offer, OfferDocument } from './schemas/offer.schema';
import { TribeCoreService } from '../tribe-core/tribe-core.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Processor('auctions')
export class AuctionsConsumer {

  constructor(
        protected readonly emailService: EmailService,
        protected readonly core: TribeCoreService,
        @InjectModel(Offer.name) private offerModel: Model<OfferDocument>,
  ) {
  }

    @Process()
  async transcode(job: Job<unknown>) {
    const offer = await this.offerModel.findOne({ postId: job.data.postId })

    await this.core.client.posts.delete({
      id: offer.postId
    })

    if (offer.clients.length > 0) {
      await this.emailService.youBoughtNFT(offer)
      await this.emailService.NFTHasBeenSold(offer)
    }
    else {
      await this.emailService.timeExpiredWithoutAnyCustomer(offer);
    }

    return {};
  }
}
