import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email, EmailDocument } from './schemas/email.schema';
import { Offer } from '../seller/schemas/offer.schema';
import {
  BID_HAS_BEEN_ACCEPTED, EXPIRE_AND_NO_CUSTOMER,
  NEW_BID_RECEIVED,
  NEW_OFFER_EMAIL_TEMPLATE,
  NFT_HAS_BEEN_SOLD, YOU_BOUGHT_NFT
} from './consts/email.const';
import * as mustache from 'mustache'

@Injectable()
export class EmailService {
  //as we don't have email service, I will save email to DB instead.
  constructor(@InjectModel(Email.name) private emailModel: Model<EmailDocument>,) {
  }

  async sendOfferConfirmation(data: Offer) {
    await this.emailModel.create({
      to: data.memberEmail,
      text: NEW_OFFER_EMAIL_TEMPLATE
    })
  }

  async BidAcceptedToBuyer(to: string, amount) {
    await this.emailModel.create({
      to,
      text: mustache.render(BID_HAS_BEEN_ACCEPTED, { price: amount })
    })
  }

  async newBidReceived(data: Offer, newAmount: number) {
    await this.emailModel.create({
      to: data.memberEmail,
      text: mustache.render(NEW_BID_RECEIVED, { email: data.memberEmail, price: newAmount })
    })
  }

  async NFTHasBeenSold(data: Offer) {
    await this.emailModel.create({
      to: data.memberEmail,
      text: mustache.render(NFT_HAS_BEEN_SOLD, { email: data.memberEmail, price: data.lastPrice })
    })
  }

  async youBoughtNFT(data: Offer) {
    await this.emailModel.create({
      to: data.lastAuction.clientEmail,
      text: YOU_BOUGHT_NFT
    })
  }

  async timeExpiredWithoutAnyCustomer(data: Offer) {
    await this.emailModel.create({
      to: data.memberEmail,
      text: EXPIRE_AND_NO_CUSTOMER
    })
  }
}
