// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract KateraToken is ERC20, Ownable {
    constructor(address initialOwner)
        ERC20("kateraToken", "KTT")
        Ownable(initialOwner)
    {
        _mint(msg.sender, 100000e18);
    }

    function mint(uint256 _amount) public onlyOwner {
        _mint(msg.sender, _amount * 1e18);
    }

    
}