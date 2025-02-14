import { ethers } from "hardhat";

async function main() {
    const [deployer, account1, account2, account3, account4] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const allocation = [{ amount: 1000, user: '0xa38062B76617585a6DB4AF9759ef3A850B35Ed9a' }, { amount: 1000, user: '0xDf6Eab507dfD58568C4C782D7669aC4bFC895D77' }, { amount: 1000, user: '0xe44326D3d3F85d5FC675b4e65055a0e9C575d5E0' }, { amount: 1000, user: '0xc23f538d15950f6982aA8e0e3a5bc1E1DcBB3177' }, { amount: 1000, user: '0xeb7CD716C5018AC5a0cF13Ee55F15EB9B4038B41' }, { amount: 1000, user: '0xd65944287EB2685c345057F6a4A48d619bA6f7cf'}];

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