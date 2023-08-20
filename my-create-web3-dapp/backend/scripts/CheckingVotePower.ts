import { ethers } from "hardhat";
import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const contractAddress = "0x3B7feebA7375bAE54e3620c37e26AbE3F9862907";
  const voterAddress = "0xb537DCfba91cEf9E9d6d77F16CF60F7780aA3a69";
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

  const votingPower = ethers.formatUnits(
    (await ballotContract.votingPower(voterAddress)).toString()
  );
  console.log(`The voter ${voterAddress} has ${votingPower} voting power`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
