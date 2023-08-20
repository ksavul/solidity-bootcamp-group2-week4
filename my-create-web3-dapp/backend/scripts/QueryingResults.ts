import { ethers } from "hardhat";
import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const contractAddress = "0x3B7feebA7375bAE54e3620c37e26AbE3F9862907";
  const provider = new ethers.JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  const ballotFactory = new TokenizedBallot__factory(wallet);
  const ballotContract = ballotFactory.attach(
    contractAddress
  ) as TokenizedBallot;
  console.log(
    `Attached to the contract at address ${await ballotContract.getAddress()}`
  );

  const winnerName = ethers.decodeBytes32String(
    await ballotContract.winnerName()
  );
  console.log(`The winner name: ${winnerName}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
