import { Injectable } from '@nestjs/common';
import { Offer, OfferDocument } from './schemas/offer.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SellerService {

  constructor(
        @InjectModel(Offer.name) private offerModel: Model<OfferDocument>) {
    // const testData = {
    //   postId: '88BiWRdtqbFVgPp',
    //   attachmentId: 'mHxnnaGHnC5MaS7Tb6lEs',
    //   memberId: 'oxCyrNIzXa',
    //   memberEmail: 'faraz.faraji.91@gmail.com',
    //   price: 1200,
    //   endDate: '2022-10-12T00:00:00.000Z'
    // };
    // //this.createNewOffer(testData);
  }

  public async createNewOffer(offer: Offer) {
    await this.offerModel.create(offer)
  }
}
