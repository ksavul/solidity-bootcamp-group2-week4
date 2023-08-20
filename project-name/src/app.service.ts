import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/MyToken.json';

const TOKEN_ADDRESS = '0x9Dac2d0392916169ECd104059769Cf4b89ab2282';

@Injectable()
export class AppService {
  provider: ethers.Provider;
  wallet: ethers.Wallet;
  contract: ethers.Contract;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(
      process.env.RPC_ENDPOINT_URL ?? '',
    );
    this.wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY ?? '',
      this.provider,
    );
    this.contract = new ethers.Contract(
      TOKEN_ADDRESS,
      tokenJson.abi,
      this.wallet,
    );
  }

  getHello(): string {
    return 'Hello Worldz!';
  }

  getAnotherThing(): string {
    return 'Other Thing';
  }

  getTokenAddress(): string {
    return TOKEN_ADDRESS;
  }

  getTotalSupply(): Promise<bigint> {
    return this.contract.totalSupply();
  }

  getBalance(address: string): Promise<bigint> {
    return this.contract.balanceOf(address);
  }
}

async mintTokens(address: string): any {
  const tx = await this.contract.mint(address, 1000000n);
  const receipt = await tx.wait();
  return {success: true, txHash: receipt.tx}
}