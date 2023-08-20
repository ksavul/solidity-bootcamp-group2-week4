import { ethers } from "hardhat";
import { MyToken, MyToken__factory } from "../typechain-types";


async function main() {
  const tokenContractAddress = "0x22482542fFE728d2B5E800cEb79E8DE61cC29c70";
  const voterAddress = "0xb537DCfba91cEf9E9d6d77F16CF60F7780aA3a69";
  const mintAmount = ethers.parseUnits("10");

  const provider = new ethers.JsonRpcProvider(
    `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
  );
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  const contractFactory = new MyToken__factory(wallet);
  const contract = contractFactory.attach(tokenContractAddress) as MyToken;
  console.log(
    `Attached to the contract at address ${await contract.getAddress()}`
  );

  console.log(
    `Minting ${ethers.formatUnits(
      mintAmount
    )} tokens to the address ${voterAddress}`
  );
  const mintTx = await contract.mint(voterAddress, mintAmount);
  const mintTxReceipt = await mintTx.wait();
  console.log(
    `The transaction hash is ${mintTxReceipt?.hash} included in the block ${mintTxReceipt?.blockNumber}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
