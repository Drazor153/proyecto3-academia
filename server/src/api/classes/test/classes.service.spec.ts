import { Test, TestingModule } from '@nestjs/testing';
import { ClassesService } from '../classes.service';
import { moduleMetadata } from '../classes.module';
import { getModuleMetadata } from '@/common/moduleMetadata';

describe('ClassesService', () => {
  let service: ClassesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata),
    ).compile();

    service = module.get<ClassesService>(ClassesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
