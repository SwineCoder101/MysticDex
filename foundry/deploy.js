const ethers = require('ethers');
const MysticDEX = require('./out/MysticDEX.sol/MysticDEX.json');
const Token = require('./out/EncryptedToken.sol/EncryptedToken.json');
require('dotenv').config();

const testnet = 'https://api.testnet.fhenix.zone:7747/';
const local = 'http://localhost:42069';

async function main(){
    const pkey = process.env.PRIVATE_KEY
    const provider = new ethers.providers.JsonRpcProvider(local);

    let signer = new ethers.Wallet(pkey,provider);

    const tokenFactory = new ethers.ContractFactory(Token.abi, Token.bytecode, signer);

    //const dexFactory = new ethers.ContractFactory(MysticDEX.abi, MysticDEX.bytecode, signer);

    const token0BaseContract = await tokenFactory.deploy("Token0", "TKN0");
    const deployedToken0 = await token0BaseContract.deployed();
    const token0Address = deployedToken0.address;

    console.log(token0Address);
}

main().catch(console.error);