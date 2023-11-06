import { Test, TestingModule } from '@nestjs/testing';
import { TeachersService } from '../teachers.service';
import { getModuleMetadata } from '@/common/moduleMetadata';
import { moduleMetadata } from '../teachers.module';

describe('TeachersService', () => {
  let service: TeachersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata),
    ).compile();

    service = module.get<TeachersService>(TeachersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
