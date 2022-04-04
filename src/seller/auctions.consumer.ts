import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('auctions')
export class AuctionsConsumer {

    @Process()
  async transcode(job: Job<unknown>) {
    console.log(job.data);
    return {};
  }
}
