import { ethers } from "ethers";
import { MyToken, MyToken__factory } from "../typechain-types";

async function main() {
    const tokenContractAddress = "0x10a91764a9d6376c545d9be403c47a458a9c9e03";
    const voterAddress = "0x3D5C413fCf77269D306c55e71978F5a882984467";

    const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`)
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
