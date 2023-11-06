import { Test, TestingModule } from '@nestjs/testing';
import { LessonsController } from '../lessons.controller';
import { moduleMetadata } from '../lessons.module';
import { getModuleMetadata } from '@/common/moduleMetadata';

describe('LessonsController', () => {
  let controller: LessonsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata),
    ).compile();

    controller = module.get<LessonsController>(LessonsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
