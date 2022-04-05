import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';
import * as mongoose from 'mongoose';

export type OfferDocument = Offer & Document;

export class AuctionClient {
    @Prop({ required: true })
      clientId: string;

    @Prop({ required: true })
      clientEmail: string;

    @Prop({ required: true })
      price: number;

    @Prop({ required: true })
      createdAt: Date;
}

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
      mappingFields: MappingField[];

    @Prop({ required: true })
      clients?: AuctionClient[];

    @Prop({ default: 0, type: mongoose.Schema.Types.Number })
      lastPrice?: number;

    @Prop({ required: true })
      lastAuction?: AuctionClient;


    _id?: mongoose.Types.ObjectId
}

export class MappingField {
    @Prop()
      key?: string;

    @Prop()
      type?: string;

    @Prop()
      value?: string
}


export const OfferSchema = SchemaFactory.createForClass(Offer);
