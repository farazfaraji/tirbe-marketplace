import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { InjectModel } from '@nestjs/mongoose';
import { AuctionClient, Offer, OfferDocument } from '../seller/schemas/offer.schema';
import { Model } from 'mongoose';
import { AcceptBidType } from './types/accept-bid.type';
import { TribeCoreService } from '../tribe-core/tribe-core.service';

@Injectable()
export class BidsService {

  constructor(
      protected readonly emailService: EmailService,
      protected readonly core: TribeCoreService,
      @InjectModel(Offer.name) private offerModel: Model<OfferDocument>) {
  }

  async isNewBidAcceptable(fatherPostId: string, newAmount: number): Promise<boolean> {
    const offer = await this.offerModel.findOne({ postId: fatherPostId });
    return !(offer.price > newAmount)
  }

  async checkClientWallet(email: string): Promise<boolean> {
    return true;
  }

  async acceptBid(acceptBidType: AcceptBidType) {
    const offer = await this.offerModel.findOne({ postId: acceptBidType.fatherPostId });
    const client: AuctionClient = {
      clientId: acceptBidType.customerId,
      clientEmail: acceptBidType.customerEmail,
      price: acceptBidType.newAmount,
      createdAt: new Date()
    }

    offer.clients.push(client)
    offer.lastAuction = client
    offer.lastPrice = acceptBidType.newAmount
    offer.save();

    await this.updatePrice(acceptBidType.fatherPostId, acceptBidType.newAmount)
    await this.emailService.BidAcceptedToBuyer(acceptBidType.customerEmail, acceptBidType.newAmount);
    await this.emailService.newBidReceived(offer, acceptBidType.newAmount);
  }

  async updatePrice(postId: string, newPrice: number) {
    const offer = await this.offerModel.findOne({ postId: postId });
    offer.mappingFields[1].value = offer.mappingFields[1].value.replace(offer.price.toString(), String(newPrice))
    offer.save();
    await this.core.updatePostContent(postId, offer.mappingFields)
  }
}
