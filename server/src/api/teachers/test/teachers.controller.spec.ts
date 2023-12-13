import { Test, TestingModule } from '@nestjs/testing';
import { TeachersController } from '../teachers.controller';
import { getModuleMetadata } from '@/common/moduleMetadata';
import { moduleMetadata } from '../teachers.module';

describe('TeachersController', () => {
  let controller: TeachersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata)
    ).compile();

    controller = module.get<TeachersController>(TeachersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
