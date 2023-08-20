import { ethers } from "hardhat";
import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";

async function main() {
    const contractAddress = "0x36568e371Ab51Fa70FF8A3Ac524cAe0B8bBD9BA7";
    const voterAdderess = "0x3D5C413fCf77269D306c55e71978F5a882984467";
    const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    const ballotFactory = new TokenizedBallot__factory(wallet);
    const ballotContract = ballotFactory.attach(contractAddress) as TokenizedBallot;
    console.log(`Attached to the contract at address ${await ballotContract.getAddress()}`);

    const votingPower = ethers.formatUnits((await ballotContract.votingPower(voterAdderess)).toString());
    console.log(`The voter ${voterAdderess} has ${votingPower} voting power`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});