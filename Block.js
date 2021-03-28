import SHA256 from 'crypto-js/sha256.js';

class Block{
    constructor (index, timestamp, data ,previousHash = '')
    {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();

    }
    calculateHash()
    {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor()
    {
        this.chain = [this.GenesisBlock()];
    }

    GenesisBlock()
    {
        return new Block(0, "10/01/2020", "Genesis Block", "0");
    }

    NewestBlock()
    {
        return this.chain[this.chain.length-1];
    }

    AddBlock(newBlock)
    {
        newBlock.previousHash = this.NewestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}
let DemoChain = new Blockchain();
DemoChain.AddBlock(new Block(1 , "20/02/2020",{E_Prescription: "Doctor:Ahmed Mustafa , Clinic:Badran , Date:20th December 2020 , Medication: Crocin 200mg , Panadol Tablets Adult"} ));
DemoChain.AddBlock(new Block(2 , "30/03/2020",{E_Prescription: "Doctor:Ahmed Mustafa ,Clinic:Sha'alaan  , Date:20th December 2020 , Medication: Rhinopro 30mg ,Catalaflam 50 Tablets"} ));

console.log(JSON.stringify(DemoChain, null , 4));

