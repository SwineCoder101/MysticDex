const ethers = require('ethers');
const Token = require('./out/EncryptedToken.sol/EncryptedToken.json');
require('dotenv').config();

async function main(){
    const pkey = process.env.PRIVATE_KEY;
    const provider = new ethers.providers.JsonRpcProvider("https://api.testnet.fhenix.zone:7747/");

    let signer = new ethers.Wallet(pkey,provider);

    const factory = new ethers.ContractFactory(Token.abi, Token.bytecode, signer);

    const baseContract = await factory.deploy("Token1", "T1");

    const deployedContract = await baseContract.deployed();

    console.log(deployedContract.address);
}

//0x210dD4B75a71f2b8F565ce814877A7749BEaA38a - T0
//0x1002A26f4404fa1BDAC9c6AdE24D4B053d960390 - T1

main().catch(console.error);