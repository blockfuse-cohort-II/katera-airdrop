import { ethers } from "hardhat";

async function main() {
    const [deployer, account1, account2, account3, account4] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const allocation = [{ amount: 100, user: account1.address }, { amount: 200, user: account2.address }, { amount: 300, user: account3.address }, { amount: 400, user: account4.address }];

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();
    console.log("Token address:", token.getAddress());

    const Airdrop = await ethers.getContractFactory("Airdrop");
    const airdrop = await Airdrop.deploy(allocation, token.getAddress());
    console.log("Airdrop address:", airdrop.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});