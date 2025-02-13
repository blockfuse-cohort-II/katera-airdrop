const fs = require("fs");
const crypto = require("crypto");

class MerkleTree {
  constructor(transactions) {
    this.transactions = transactions;
    this.leaves = transactions.map((tx) =>
      crypto.createHash("sha256").update(JSON.stringify(tx)).digest()
    );
    this.levels = this._buildTree();
  }

  _hash(left, right) {
    const combined = Buffer.concat([left, right]);
    return crypto.createHash("sha256").update(combined).digest();
  }

  _buildTree() {
    let currentLevel = [...this.leaves];
    const levels = [currentLevel];

    while (currentLevel.length > 1) {
      const parentLevel = [];
      for (let i = 0; i < currentLevel.length; i += 2) {
        const left = currentLevel[i];
        const right = i + 1 < currentLevel.length ? currentLevel[i + 1] : left;
        const parent = this._hash(left, right);
        parentLevel.push(parent);
      }
      currentLevel = parentLevel;
      levels.push(currentLevel);
    }

    return levels;
  }

  getMerkleRoot() {
    return this.levels[this.levels.length - 1][0];
  }

  getProof(transaction) {
    const transactionHash = crypto.createHash("sha256").update(JSON.stringify(transaction)).digest();
    let index = this.leaves.findIndex(leaf => leaf.equals(transactionHash));
    const proof = [];

    for (let level of this.levels.slice(0, -1)) {
      const siblingIndex = index ^ 1;
      if (siblingIndex < level.length && index < siblingIndex) {
        proof.push({ position: 'right', value: level[siblingIndex].toString('hex') });
      } else if (siblingIndex < level.length && index > siblingIndex) {
        proof.push({ position: 'left', value: level[siblingIndex].toString('hex') });
      }
      index = Math.floor(index / 2);
    }

    return proof;
  }

  verifyProof(transaction, proof) {
    let currentHash = crypto.createHash('sha256').update(JSON.stringify(transaction)).digest();

    for (const sibling of proof) {
      if (sibling.position === 'right') {
        currentHash = this._hash(currentHash, Buffer.from(sibling.value, 'hex'));
      } else {
        currentHash = this._hash(Buffer.from(sibling.value, 'hex'), currentHash);
      }
    }

    return currentHash.equals(this.getMerkleRoot());
  }
}

// Main execution
function main() {
  const transactions = [
    { address: "0x123", amount: 100 },
    { address: "0x456", amount: 200 },
    { address: "0x789", amount: 300 },
    { address: "0xabc", amount: 400 },
    // Add more transactions as needed
  ];

  const merkleTree = new MerkleTree(transactions);
  const proofs = {};

  for (const transaction of transactions) {   
    proofs[transaction.address] = {
        amount: transaction.amount,
        proofs: merkleTree.getProof(transaction)
    }
  }

  const filePath = 'proofs.json';

  if (fs.existsSync(filePath)) {
    console.log(`${filePath} exists. Overwriting...`);
  } else {
    console.log(`${filePath} does not exist. Creating...`);
  }

  fs.writeFileSync(filePath, JSON.stringify(proofs, null, 2));
  console.log('Proofs written to proofs.json');
}

main();