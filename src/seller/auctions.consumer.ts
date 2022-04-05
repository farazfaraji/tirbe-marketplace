import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { EmailService } from '../email/email.service';
import { Offer } from './schemas/offer.schema';
import { TribeCoreService } from '../tribe-core/tribe-core.service';

@Processor('auctions')
export class AuctionsConsumer {

  constructor(
        protected readonly emailService: EmailService,
        protected readonly core: TribeCoreService,
  ) {
  }

    @Process()
  async transcode(job: Job<unknown>) {
    const offer: Offer = job.data

    await this.core.client.posts.delete({
      id: offer.postId
    })

    if (offer.lastAuction) {
      await this.emailService.youBoughtNFT(offer)
      await this.emailService.youBoughtNFT(offer)
    }
    else {
      await this.emailService.timeExpiredWithoutAnyCustomer(offer);
    }

    return {};
  }
}
