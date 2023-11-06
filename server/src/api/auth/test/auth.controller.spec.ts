import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { moduleMetadata } from '../auth.module';
import { getModuleMetadata } from '@/common/moduleMetadata';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      getModuleMetadata(moduleMetadata),
    ).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
