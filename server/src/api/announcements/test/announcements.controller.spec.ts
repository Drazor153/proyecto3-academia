import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementsController } from '../announcements.controller';
import { moduleMetadata } from '../announcements.module';
import { getModuleMetadata } from '@/common/moduleMetadata';

describe('AnnouncementsController', () => {
  let controller: AnnouncementsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata),
    ).compile();

    controller = module.get<AnnouncementsController>(AnnouncementsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
