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
  }


  public async createNewOffer(offer: Offer) {
    offer.lastPrice = offer.price;
    const data = await this.offerModel.create(offer)
    const now = new Date();
    const endDate = new Date(offer.endDate);
    const msToExpire = (endDate.getTime() - now.getTime());
    //here for test I'm changing end time to 3 min after creating
    await this.auctionsQueue.add(data, { delay: TEST_DURATION_END_TIME });
    await this.emailService.sendOfferConfirmation(data)
  }

}
