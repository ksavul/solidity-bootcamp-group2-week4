import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getOtherThing(): string;
    getTokenAddress(): string;
    getTotalSupply(): Promise<bigint>;
    getTotalBalance(address: string): Promise<bigint>;
    getTestParameter(value: string): string;
}
