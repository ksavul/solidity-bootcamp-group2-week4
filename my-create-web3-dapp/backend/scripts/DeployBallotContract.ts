import { ethers } from "hardhat";
import * as dotenv from "dotenv";
import { TokenizedBallot__factory } from "../typechain-types";
dotenv.config();

async function main() {
  const PROPOSALS = ["Proposal1", "Proposal2", "Proposal3"];
  const ERC20ContractAddress = "0x22482542fFE728d2B5E800cEb79E8DE61cC29c70";
  const blocksQuantity = 10000;

  const provider = new ethers.JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);
  const contractFactory = new TokenizedBallot__factory(wallet);
  const contract = await contractFactory.deploy(
    PROPOSALS.map(ethers.encodeBytes32String),
    ERC20ContractAddress,
    blocksQuantity
  );
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();
  console.log(`Tokenized Ballot deployed at ${contractAddress}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
