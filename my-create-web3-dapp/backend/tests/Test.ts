import { expect } from "chai";
import { ethers } from "hardhat";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { TokenSale, ERC20, MyERC20 } from "../typechain-types";

const RATIO = 10;

describe("NFT Shop", async () => {
  let deployer: HardhatEthersSigner;
  let acc1: HardhatEthersSigner;
  let acc2: HardhatEthersSigner;
  let tokenSaleContract: TokenSale;
  let paymentTokenContract: MyERC20;

  async function deployContracts() {
    // Deploy an ERC 20 token
    const paymentTokenContractFactory = await ethers.getContractFactory(
      "MyERC20"
    );
    const paymentTokenContract_ = await paymentTokenContractFactory.deploy();
    await paymentTokenContract_.waitForDeployment();
    const paymentTokenContractAddress =
      await paymentTokenContract_.getAddress();

    // Deploying the Token Sale contract
    const tokenSaleContractFactory = await ethers.getContractFactory(
      "TokenSale"
    );
    const tokenSaleContract_ = await tokenSaleContractFactory.deploy(
      RATIO,
      paymentTokenContractAddress
    );
    await tokenSaleContract_.waitForDeployment();
    return { tokenSaleContract_, paymentTokenContract_ };
  }

  beforeEach(async () => {
    [deployer, acc1, acc2] = await ethers.getSigners();
    const { tokenSaleContract_, paymentTokenContract_ } = await loadFixture(
      deployContracts
    );
    tokenSaleContract = tokenSaleContract_;
    paymentTokenContract = paymentTokenContract_;
  });

  describe("When the Shop contract is deployed", async () => {
    it("defines the ratio as provided in parameters", async () => {
      const ratio = await tokenSaleContract.ratio();
      expect(ratio).to.equal(RATIO);
    });

    it("uses a valid ERC20 as payment token", async () => {
      const paymentTokenAddress = await tokenSaleContract.paymentToken();
      const tokenContractFactory = await ethers.getContractFactory("ERC20");
      const paymentToken = tokenContractFactory.attach(
        paymentTokenAddress
      ) as ERC20;
      await expect(paymentToken.balanceOf(deployer.address)).not.to.be.reverted;
      await expect(paymentToken.totalSupply()).not.to.be.reverted;
    });
  });

  describe("When a user buys an ERC20 from the Token contract", async () => {
    beforeEach(async () => {});

    it("charges the correct amount of ETH", async () => {
      throw new Error("Not implemented");
    });

    it("gives the correct amount of tokens", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When a user burns an ERC20 at the Shop contract", async () => {
    it("gives the correct amount of ETH", async () => {
      throw new Error("Not implemented");
    });

    it("burns the correct amount of tokens", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When a user buys an NFT from the Shop contract", async () => {
    it("charges the correct amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });

    it("gives the correct NFT", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When a user burns their NFT at the Shop contract", async () => {
    it("gives the correct amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });
  });

  describe("When the owner withdraws from the Shop contract", async () => {
    it("recovers the right amount of ERC20 tokens", async () => {
      throw new Error("Not implemented");
    });

    it("updates the owner pool account correctly", async () => {
      throw new Error("Not implemented");
    });
  });
});
