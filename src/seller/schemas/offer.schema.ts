import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mSchema } from 'mongoose';

export type OfferDocument = Offer & Document;

@Schema()
export class Offer {
    @Prop({ required: true })
      post_id: string;

    @Prop({ required: true })
      member_id: string;

    @Prop({ required: true })
      member_email: string;

    @Prop({ required: true })
      attachmentId: string;

    @Prop({ required: true })
      price: number;

    @Prop({ required: true })
      end_date: Date;
}

export const UserSchema = SchemaFactory.createForClass(Offer);
