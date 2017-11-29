const SHA256 = require('crypto-js/sha256');

class block {
  constructor(index, timestamp, data, previousHash = '' ) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    }

    calculateHash(){
      return SHA256(this.index + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class blockchain {
  constructor(){
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock(){
    return new block(0, "01/01/2018", "Amresh Giri");
  }

  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock){
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

}

let amreshCoin = new blockchain();
amreshCoin.addBlock(new block(1, "01/11/2017", {amount : 1}));
amreshCoin.addBlock(new block(2, "23/11/2017", {amount : 4}));
amreshCoin.addBlock(new block(3, "01/12/2017", {amount : 8}));

console.log(JSON.stringify(amreshCoin, null, 4));
