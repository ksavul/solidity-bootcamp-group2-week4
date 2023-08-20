import { ethers } from 'ethers';
export declare class AppService {
    provider: ethers.Provider;
    wallet: ethers.Wallet;
    contract: ethers.Contract;
    constructor();
    getHello(): string;
    getAnotherThing(): string;
    getTokenAddress(): string;
    getTotalSupply(): Promise<bigint>;
    getBalance(address: string): Promise<bigint>;
}
