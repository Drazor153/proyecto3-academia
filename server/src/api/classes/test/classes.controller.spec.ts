import { Test, TestingModule } from '@nestjs/testing';
import { ClassesController } from '../classes.controller';
import { moduleMetadata } from '../classes.module';
import { getModuleMetadata } from '@/common/moduleMetadata';

describe('ClassesController', () => {
  let controller: ClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata)
    ).compile();

    controller = module.get<ClassesController>(ClassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
