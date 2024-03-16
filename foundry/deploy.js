const ethers = require('ethers');
const MysticDEX = require('./out/MysticDEX.sol/MysticDEX.json');
require('dotenv').config();

async function main(){
    const pkey = process.env.PRIVATE_KEY
    const provider = new ethers.providers.JsonRpcProvider("https://api.testnet.fhenix.zone:7747/");

    let signer = new ethers.Wallet(pkey,provider);
    //const account = wallet.connect(provider);

    const factory = new ethers.ContractFactory(MysticDEX.abi, MysticDEX.bytecode, signer);

                                              // Token 0 , Token 1 contract addresses
    const baseContract = await factory.deploy("0x210dD4B75a71f2b8F565ce814877A7749BEaA38a", "0x1002A26f4404fa1BDAC9c6AdE24D4B053d960390");

    const deployedContract = await baseContract.deployed();

    console.log(deployedContract.address);
}

main().catch(console.error);