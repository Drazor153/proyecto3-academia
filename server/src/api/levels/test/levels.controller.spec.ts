import { Test, TestingModule } from '@nestjs/testing';
import { LevelsController } from '../levels.controller';
import { getModuleMetadata } from '@/common/moduleMetadata';
import { moduleMetadata } from '../levels.module';

describe('LevelsController', () => {
  let controller: LevelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata),
    ).compile();

    controller = module.get<LevelsController>(LevelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
