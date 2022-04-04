import { Global, Module } from '@nestjs/common';
import { TribeCoreService } from './tribe-core.service';

@Global()
@Module({
  providers: [TribeCoreService],
  exports: [TribeCoreService],
  
})
export class TribeCoreModule {
}
