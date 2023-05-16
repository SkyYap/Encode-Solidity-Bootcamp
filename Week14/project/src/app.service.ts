import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getLastBlock(): Promise<ethers.providers.Block> {
    const provider = ethers.getDefaultProvider('goerli')
    return provider.getBlock("latest")
  }
}
