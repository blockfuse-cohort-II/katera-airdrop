// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

struct Proof {
    bool isLeft;
    bytes32 value;
}

contract Token is ERC20("Token", "TKN") {
    address public owner;

    constructor() {
        owner = msg.sender;
        _mint(msg.sender, 1000000 * 10 ** 18);
    }

    function mint(uint256 _amount) public {
        require(msg.sender == owner, "Only owner can mint");
        _mint(msg.sender, _amount * 1e18);
    }
}

contract Airdrop {
    address public tokenAddress;
    MerkleTree public merkleTree;
    bytes32 public merkleRoot;
    mapping(address => bool) public claimed;
    //AirdropData[] public airdropData;
    mapping(address => mapping(uint => Proof)) public proof;
    mapping(address => uint) public proofCount;

    struct Allocation {
        address user;
        uint256 amount;
    }

    struct AirdropData {
        address user;
        Proof[] proof;
    }

    constructor(Allocation[] memory _allocation, address _tokenAddress) {
        tokenAddress = _tokenAddress;
        // Calculate merkle root and return proof for each user
        bytes32[] memory transactions = new bytes32[](_allocation.length);
        for (uint i = 0; i < _allocation.length; i++) {
            transactions[i] = keccak256(
                abi.encodePacked(_allocation[i].amount, _allocation[i].user)
            );
        }
        merkleTree = new MerkleTree(transactions);
        merkleRoot = merkleTree.getMerkleRoot();
    }

    function claim(uint _amount) public {
        require(!claimed[msg.sender], "You have already claimed");

        bytes32 currentHash = keccak256(
            abi.encodePacked(_amount, msg.sender)
        );

        Proof[] memory proofs = merkleTree.getProof(currentHash);

        for (uint256 i = 0; i < proofs.length; i++) {
            if (!proofs[i].isLeft) {
                currentHash = keccak256(abi.encodePacked(currentHash, proofs[i].value));
            } else {
                currentHash = keccak256(abi.encodePacked(proofs[i].value, currentHash));
            }
        }

        require(
            currentHash == merkleRoot,
            "Invalid proof"
        );
        claimed[msg.sender] = true;

        // Transfer tokens
        IERC20(tokenAddress).transfer(msg.sender, uint(_amount));
    }
}

contract MerkleTree {
    bytes32[] public leaves;
    bytes32[][] public levels;

    constructor(bytes32[] memory transactions) {
        leaves = transactions;
        levels.push(leaves);
        _buildTree();
    }

    function _hash(bytes memory data) internal pure returns (bytes32) {
        return keccak256(data);
    }

    function _buildTree() internal {
        uint256 currentLevelLength = leaves.length;
        while (currentLevelLength > 1) {
            bytes32[] memory currentLevel = levels[levels.length - 1];
            bytes32[] memory parentLevel = new bytes32[](
                (currentLevelLength + 1) / 2
            );
            for (uint256 i = 0; i < currentLevelLength; i += 2) {
                bytes32 left = currentLevel[i];
                bytes32 right = i + 1 < currentLevelLength
                    ? currentLevel[i + 1]
                    : left;
                parentLevel[i / 2] = _hash(abi.encodePacked(left, right));
            }
            levels.push(parentLevel);
            currentLevelLength = parentLevel.length;
        }
    }

    function getMerkleRoot() public view returns (bytes32) {
        return levels[levels.length - 1][0];
    }

    function getProof(bytes32 transaction) public view returns (Proof[] memory) {
        uint256 index;
        bool found = false;
        for (uint256 i = 0; i < leaves.length; i++) {
            if (leaves[i] == transaction) {
                index = i;
                found = true;
                break;
            }
        }

        if (!found) {
            return new Proof[](0);
        }

        Proof[] memory proofs = new Proof[](levels.length - 1);
        for (uint256 i = 0; i < levels.length - 1; i++) {
            uint256 siblingIndex = index ^ 1;
            if (siblingIndex < levels[i].length) {
                if (index > siblingIndex) {
                    proofs[i] = Proof(true, levels[i][siblingIndex]);
                } else {
                    proofs[i] = Proof(false, levels[i][siblingIndex]);
                }
            }
            index = index / 2;
        }
        return proofs;
    }
}