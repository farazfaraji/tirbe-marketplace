import { Injectable } from '@nestjs/common';
import { Offer } from './schemas/offer.schema';

@Injectable()
export class SellerService {
  public async createNewOffer(offer: Offer) {

  }
}
