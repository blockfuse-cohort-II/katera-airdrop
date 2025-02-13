const { connect } = require("@wagmi/core");
const {ethers} =require("ethers");


const contractABI=[
    {
        "inputs":[],
        "name":[],
        "outputs":[],
        "stateMutability":"nonpayable",
        "type":"function"
    }
]

const contractAddress="0xYourAirdropContractAddress";

async function main(){
    if (typeof window.ethereum !== "undefined"){
        await window.ethereum.request({method:"eth_requestAccounts"});
   

        // Create a provider and signer
        const provider=new ethers.provider.Web3providers(window.ethereum);
        const signer=provider.getSigner();

         // Get the user's address
        const userAddress=await signer.getAddress();
        
        // Connect to the smart contract
        const contract=new ethers.Contract(contractAddress,contractABI,signer)


        // Call the ClaimAirdrop function

        try{
            const tx=await contract.claimAirdrop();

            await tx.wait();
        }catch(error){
            console.error("Error claiming airdrop:", error);
        }
    }else{
        console.error("MetaMask not detected. Please install MetaMask.");
    }
}