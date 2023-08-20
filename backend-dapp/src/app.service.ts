import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import * as tokenJson from './assets/artifacts.json'
import { Votes as VotesEntity } from "./entity/votes.entity"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VotesDto } from './dto/votes.dto';

const TOKEN_ADDRESS = "0x10a91764a9d6376c545d9be403c47a458a9c9e03";
//const TOKEN_ADDRESS = "0xaDE10B93E0219eAed765De809c68EA2418DdB1d1";

@Injectable()
export class AppService {
  provider: ethers.Provider;
  wallet: ethers.Wallet;
  contract: ethers.Contract;

  constructor(
    @InjectRepository(VotesEntity)
  private votesRepository: Repository<VotesEntity>) {    
    this.provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`)
    this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", this.provider);
    this.contract = new ethers.Contract(TOKEN_ADDRESS, tokenJson.abi, this.wallet );
  }

  getTokenAddress(): any {
    return {address: TOKEN_ADDRESS};
  }

  getTotalSupply(): Promise<bigint> {
    return this.contract.totalSupply();

  }

  getTokenBalance(address: string): Promise<bigint> {
    return this.contract.balanceOf(address);
  }

  async mint(address: string, amount: bigint): Promise<any> {
    const tx = await this.contract.mint(address, amount);
    const receipt = await tx.wait();
    return {success: true, txHash: receipt.hash }
  }

  saveVote(address: string, proposal: string, amount: string) {
   const newVote = this.votesRepository.create({address, proposal, amount});
   return this.votesRepository.save(newVote);
  }

  getAllVotes(): Promise<VotesEntity[]> {
    return this.votesRepository.find();
  }
}
