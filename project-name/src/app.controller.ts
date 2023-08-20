import { Controller, Get, Param, Query, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('other-thing')
  getOtherThing(): string {
    return this.appService.getAnotherThing();
  }

  @Get('get-address')
  getTokenAddress(): string {
    return this.appService.getTokenAddress();
  }

  @Get('get-total-supply')
  getTotalSupply(): Promise<bigint> {
    return this.appService.getTotalSupply();
  }

  @Get('get-total-balance/:address')
  getTotalBalance(@Param('address') address: string): Promise<bigint> {
    return this.appService.getBalance(address);
  }

  @Post('mint-tokens')
  mintTokens(@Body() body: MintTokensDto): Promise<any> {
    console.log({ body });
    return this.appService.mintTokens(body.address);
  }

  // @Get('get-test-param/:value')
  // getTestParameter(@Param('value') value: string) {
  //   return value;
  // }

  // @Get('get-test-query')
  // getTestQuery(@Query('value') value: string, @Query('other') other: string) {
  //   return value;
  // }
}
