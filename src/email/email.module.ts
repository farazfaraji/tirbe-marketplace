import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Email, EmailSchema } from './schemas/email.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Email.name,
        schema: EmailSchema
      }
    ]),
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {
}
