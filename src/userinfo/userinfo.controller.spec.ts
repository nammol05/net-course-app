/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UserinfoController } from './userinfo.controller';
import { UserinfoService } from './userinfo.service';

describe('UserinfoController', () => {
  let controller: UserinfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserinfoController],
      providers: [UserinfoService],
    }).compile();

    controller = module.get<UserinfoController>(UserinfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
