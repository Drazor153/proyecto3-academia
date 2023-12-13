import { Test, TestingModule } from '@nestjs/testing';
import { AnnouncementsService } from '../announcements.service';
import { moduleMetadata } from '../announcements.module';
import { getModuleMetadata } from '@/common/moduleMetadata';

describe('AnnouncementsService', () => {
  let service: AnnouncementsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata)
    ).compile();

    service = module.get<AnnouncementsService>(AnnouncementsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
