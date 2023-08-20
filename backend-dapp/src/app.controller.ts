import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MintTokensDto } from './dto/mintTokens.dto';
import { VotesDto } from './dto/votes.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('get-token-balance/:address')
  getTokenBalance(@Param('address')address: string): Promise<bigint> {
    return this.appService.getTokenBalance(address);
  }

  @Post('mint-tokens')
  mintTokens(@Body() body: MintTokensDto): Promise<any> {
  return this.appService.mint(body.address, body.amount);
  }

  @Post('save-vote')
  saveVote(@Body() body: VotesDto) {
    return this.appService.saveVote(body.address, body.proposal, body.amount);
  }

  @Get('get-all-votes')
  getAllVotes(): Promise<any> {
    return this.appService.getAllVotes();
  }

}
