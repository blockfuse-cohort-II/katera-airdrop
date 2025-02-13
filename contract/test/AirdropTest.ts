import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("Airdrop Tests", function () {
  const AIRDROP_AMOUNT = hre.ethers.parseEther("10");

  async function deployContracts() {
    const [owner, addr1, addr2] = await hre.ethers.getSigners();
    const Token = await hre.ethers.getContractFactory("KateraToken");
    const token = await Token.deploy(owner);

    // Create merkle root for testing
    const hashedAllocation = hre.ethers.solidityPackedKeccak256(
      ["uint256", "address"],
      [AIRDROP_AMOUNT, addr1.address]
    );
    const merkleRoot = hashedAllocation;

    const Airdrop = await hre.ethers.getContractFactory("Airdrop");
    const airdrop = await Airdrop.deploy(merkleRoot, await token.getAddress());

    // owner.sendTransaction({
    //   to: await airdrop.getAddress(),
    //   value: AIRDROP_AMOUNT,
    // });

    await token.transfer(await airdrop.getAddress(), AIRDROP_AMOUNT); //another way to transfer token to airdrop contract

    return { token, airdrop, owner, addr1, addr2, merkleRoot };
  }

  describe("Deployment", function () {
    it("Should deploy the contracts correctly", async function () {
      const { token, airdrop, merkleRoot } = await loadFixture(deployContracts);

      expect(await airdrop.tokenAddress()).to.equal(await token.getAddress());
      expect(await airdrop.merkleRoot()).to.equal(merkleRoot);
    });
    it("Should have the correct katera token balance in airdrop contract", async function () {
      const { token, airdrop } = await loadFixture(deployContracts);

      expect(await token.balanceOf(await airdrop.getAddress())).to.equal(
        AIRDROP_AMOUNT
      );
    });

    describe("Claiming", function () {
      describe("Transfers", function () {
        // it("Should transfer tokens upon successful claim", async function () {});
      });
    });
  });
});
