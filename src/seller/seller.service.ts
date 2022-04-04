import { Injectable } from '@nestjs/common';
import { Offer, OfferDocument } from './schemas/offer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { EmailService } from '../email/email.service';

const TEST_DURATION_END_TIME = 3 * 60 * 1000

@Injectable()
export class SellerService {

  constructor(
        protected readonly emailService: EmailService,
        @InjectModel(Offer.name) private offerModel: Model<OfferDocument>,
        @InjectQueue('auctions') private auctionsQueue: Queue
  ) {

    const testData = {
      postId: '88BiWRdtqbFVgPp',
      attachmentId: 'mHxnnaGHnC5MaS7Tb6lEs',
      memberId: 'oxCyrNIzXa',
      memberEmail: 'faraz.faraji.91@gmail.com',
      price: 1200,
      endDate: '2022-10-12T00:00:00.000Z'
    };
    //this.createNewOffer(testData);
  }


  public async createNewOffer(offer: Offer) {
    const data = await this.offerModel.create(offer)
    const now = new Date();
    const endDate = new Date(offer.endDate);
    const msToExpire = (endDate.getTime() - now.getTime());
    //here for test I'm changing end time to 5 min after creating
    await this.auctionsQueue.add(data, { delay: TEST_DURATION_END_TIME });
    await this.emailService.sendOfferConfirmation(data)
  }

}
