# Katera Token & Airdrop Platform

A decentralized application (dApp) featuring a custom ERC20 token (KateraToken/KTT) with an airdrop distribution system built on the Ethereum blockchain.

## Features

- Custom ERC20 Token Implementation (KateraToken - KTT)
- Merkle Tree-based Airdrop Distribution System
- Modern React Frontend with Framer Motion Animations
- Responsive Design with Tailwind CSS
- Secure Token Claiming Mechanism

## Tech Stack

### Smart Contracts
- Solidity ^0.8.22
- OpenZeppelin Contracts ^5.0.0
  - ERC20
  - Ownable

### Frontend
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- React Router DOM


## Smart Contract Features

### KateraToken (KTT)
- Initial supply: 100,000 tokens
- Decimal places: 18
- Mint functionality (owner only)
- Built on OpenZeppelin's ERC20 standard

### Airdrop Contract
- Merkle tree-based verification system
- Secure proof validation
- One-time claim mechanism
- Automatic token distribution

## Getting Started

### Prerequisites
- Node.js
- npm or yarn
- Web3 wallet (e.g., MetaMask)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd katera-token-platform
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

### Smart Contract Deployment

1. Configure your environment variables:
```bash
cp .env.example .env
# Add your private key and network details
```

2. Deploy the token contract:
```bash
npx hardhat run scripts/deploy.js --network <your-network>
```

## Usage

1. Connect your Web3 wallet to the application
2. Navigate to the airdrop claim page
3. Verify your eligibility
4. Claim your tokens

## Security Considerations

- Merkle tree verification ensures secure token distribution
- One-time claim prevention
- Owner-only minting capabilities
- Standard OpenZeppelin security practices

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenZeppelin for secure smart contract implementations
- Framer Motion for smooth animations
- Tailwind CSS for styling
