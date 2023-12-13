import { Test, TestingModule } from '@nestjs/testing';
import { LessonsService } from '../lessons.service';
import { getModuleMetadata } from '@/common/moduleMetadata';
import { moduleMetadata } from '../lessons.module';

describe('LessonsService', () => {
  let service: LessonsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata)
    ).compile();

    service = module.get<LessonsService>(LessonsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
