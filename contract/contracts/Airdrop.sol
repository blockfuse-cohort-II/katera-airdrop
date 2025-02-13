// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

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
}