import { Test, TestingModule } from '@nestjs/testing';
import { JustificationController } from '../justification.controller';
import { JustificationService } from '../justification.service';

describe('JustificationController', () => {
  let controller: JustificationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JustificationController],
      providers: [JustificationService],
    }).compile();

    controller = module.get<JustificationController>(JustificationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
