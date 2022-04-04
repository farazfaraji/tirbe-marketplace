import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmailDocument = Email & Document;

@Schema()
export class Email {
    @Prop({ required: true })
      to: string;

    @Prop({ required: true })
      text: string;


}


export const EmailSchema = SchemaFactory.createForClass(Email);
