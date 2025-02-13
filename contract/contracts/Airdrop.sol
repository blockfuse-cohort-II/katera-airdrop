// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Airdrop {
    address public tokenAddress;
    bytes merkleRoot;
    mapping(address => bool) claimed;
    Struct Proof {
        bool isLeft;
        bytes32 amount;
    }

    constructor(bytes memory _merkleRoot, address _tokenAddress) {
        merkleRoot = _merkleRoot;
        tokenAddress = _tokenAddress;
    }

    function claim(uint _amount, Proof[] memory proofs) public {
        require(!claimed[msg.sender], "You have already claimed");
        bytes memory hashedAllocation = keccak256(abi.encodePacked(_amount, msg.sender));
        for (uint i = 0; i < proofs.length; i++) {
            if (proofs[i].isLeft) {
                hashedAllocation = abi.encodePacked(proofs[i].amount, hashedAllocation);
            } else {
                hashedAllocation = abi.encodePacked(hashedAllocation, proofs[i].amount);
            }
        }
        require(keccak256(hashedAllocation) == merkleRoot, "Invalid proof");
        claimed[msg.sender] = true;
    }
}
