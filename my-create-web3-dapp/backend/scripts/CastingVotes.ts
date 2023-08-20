import { TokenizedBallot, TokenizedBallot__factory } from "../typechain-types";
import { ethers } from "hardhat";

async function main() {
    const contractAddress = "0x36568e371Ab51Fa70FF8A3Ac524cAe0B8bBD9BA7";
    let proposalNumber = Number("1");
    const amount = ethers.parseUnits("1");
    const provider = new ethers.JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`)
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

    const ballotFactory = new TokenizedBallot__factory(wallet);
    const ballotContract = ballotFactory.attach(contractAddress) as TokenizedBallot;
    const proposals = (await ballotContract.listProposal()).map((element) =>
        ethers.decodeBytes32String(element)
    );

    if (proposalNumber >= proposals.length || proposalNumber < 0) {
        throw new Error("Invalid vote");
    }

    console.log(`Attached to the contract at address ${await ballotContract.getAddress()}`);

    console.log(
        `Casting vote to proposal "${proposals[proposalNumber]
        }"`
    );
    const vote = await ballotContract.vote(proposalNumber, amount);
    const voteTxReceipt = await vote.wait();

    console.log(
        `The transaction hash is ${voteTxReceipt?.hash} included in the block ${voteTxReceipt?.blockNumber}`
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});