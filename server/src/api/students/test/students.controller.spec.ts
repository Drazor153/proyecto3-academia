import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from '../students.controller';
import { getModuleMetadata } from '@/common/moduleMetadata';
import { moduleMetadata } from '../students.module';

describe('StudentsController', () => {
  let controller: StudentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata),
    ).compile();

    controller = module.get<StudentsController>(StudentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
