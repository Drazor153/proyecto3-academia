import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { moduleMetadata } from '../auth.module';
import { getModuleMetadata } from '@/common/moduleMetadata';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata),
    ).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
