import { Test, TestingModule } from '@nestjs/testing';
import { TribeCoreService } from './tribe-core.service';

describe('TribeCoreService', () => {
  let service: TribeCoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TribeCoreService],
    }).compile();

    service = module.get<TribeCoreService>(TribeCoreService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
