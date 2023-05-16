import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ethers } from 'ethers';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("last-block")
  getLastBlock(): Promise<ethers.providers.Block> {
    return this.appService.getLastBlock();
  }
}
