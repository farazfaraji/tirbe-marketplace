import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Email, EmailDocument } from './schemas/email.schema';
import { Offer } from '../seller/schemas/offer.schema';
import { NEW_OFFER_EMAIL_TEMPLATE } from './consts/email.const';

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
}
