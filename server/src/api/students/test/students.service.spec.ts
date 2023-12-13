import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from '../students.service';
import { getModuleMetadata } from '@/common/moduleMetadata';
import { moduleMetadata } from '../students.module';

describe('StudentsService', () => {
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata)
    ).compile();

    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
