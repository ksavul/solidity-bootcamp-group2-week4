import { ethers } from "ethers";
import { MyToken, MyToken__factory } from "../typechain-types";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const tokenContractAddress = "0x22482542fFE728d2B5E800cEb79E8DE61cC29c70";
  const voterAddress = "0xb537DCfba91cEf9E9d6d77F16CF60F7780aA3a69";

  const provider = new ethers.JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  const contractFactory = new MyToken__factory(wallet);
  const contract = contractFactory.attach(tokenContractAddress) as MyToken;
  console.log(`Attached to the contract at address ${contract.getAddress()}`);

  console.log(`Delegating to ${voterAddress}`);
  const delegate = await contract.delegate(voterAddress);
  const delegateTxReceipt = await delegate.wait();
  console.log(
    `The transaction hash is ${delegateTxReceipt?.hash} included in the block ${delegateTxReceipt?.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
