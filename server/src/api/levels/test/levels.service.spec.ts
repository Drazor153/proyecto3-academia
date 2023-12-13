import { Test, TestingModule } from '@nestjs/testing';
import { LevelsService } from '../levels.service';
import { getModuleMetadata } from '@/common/moduleMetadata';
import { moduleMetadata } from '../levels.module';

describe('LevelsService', () => {
  let service: LevelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata)
    ).compile();

    service = module.get<LevelsService>(LevelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
