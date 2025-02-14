import {
    time,
    loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";
import { keccak256 } from "ethereum-cryptography/keccak";

describe("Airdrop", function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployAirdrop() {

        // Contracts are deployed using the first signer/account by default
        const [owner, account1, account2, account3, account4] = await hre.ethers.getSigners();

        const Token = await hre.ethers.getContractFactory("Token");
        const token = await Token.deploy();

        const allocation = [{ amount: 100, user: account1.address }, { amount: 200, user: account2.address }, { amount: 300, user: account3.address }, { amount: 400, user: account4.address }];

        const Airdrop = await hre.ethers.getContractFactory("Airdrop");
        const airdrop = await Airdrop.deploy(allocation, token);

        return { airdrop, token, owner, account1, account2, account3, account4 };
    }


    describe("Deployment", function () {

        it("Should transfer token to caller if request is valids", async function () {
          const { airdrop, token, owner, account1, account2 } = await loadFixture(deployAirdrop);
          await token.transfer(airdrop, 1000);
          await airdrop.connect(account1).claim(100);
          expect(await airdrop.claimed(account1.address)).to.equal(true);
        });

    });
});



// SPDX-License-Identifier: UNLICENSED
/*pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Airdrop {
    address public tokenAddress;
    bytes32 public merkleRoot;  
    mapping(address => bool) public claimed; 

    struct Proof {
        bool isLeft;
        bytes32 amount;
    }

    constructor(bytes32 _merkleRoot, address _tokenAddress) {  
        merkleRoot = _merkleRoot;
        tokenAddress = _tokenAddress;
    }

    function claim(uint256 _amount, Proof[] memory proofs) public {
        require(!claimed[msg.sender], "You have already claimed");
        
        bytes32 hashedAllocation = keccak256(abi.encodePacked(_amount, msg.sender));  
        
        for (uint i = 0; i < proofs.length; i++) {
            if (proofs[i].isLeft) {
                hashedAllocation = keccak256(abi.encodePacked(proofs[i].amount, hashedAllocation));
            } else {
                hashedAllocation = keccak256(abi.encodePacked(hashedAllocation, proofs[i].amount));
            }
        }

        require(hashedAllocation == merkleRoot, "Invalid proof");
        claimed[msg.sender] = true;

        // Transfer tokens
        require(IERC20(tokenAddress).transfer(msg.sender, _amount), "Transfer failed");  
    }
}*/
