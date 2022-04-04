import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';
import * as mongoose from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema()
export class Offer {
    @Prop({ required: true })
      postId: string;

    @Prop({ required: true })
      memberId: string;

    @Prop({ required: true })
      memberEmail: string;

    @Prop({ required: true })
      attachmentId: string;

    @Prop({ required: true, type: mongoose.Schema.Types.Number })
      price: number;

    @Prop({ required: true, type: mongoose.Schema.Types.Date })
      endDate: string;

    @Prop({ required: true })
      clients?: AuctionClient[];

    @Prop({ default: 0, type: mongoose.Schema.Types.Number })
      lastPrice?: number;

    _id?: mongoose.Types.ObjectId
}

class AuctionClient {
    @Prop({ required: true })
      clientId: string;

    @Prop({ required: true })
      clientEmail: string;

    @Prop({ required: true })
      price: number;

    @Prop({ required: true })
      createdAt: Date;
}

export const OfferSchema = SchemaFactory.createForClass(Offer);
