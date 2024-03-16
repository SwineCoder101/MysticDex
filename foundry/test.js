const { FhenixClient, EncryptionTypes } = require('fhenixjs');
const { JsonRpcProvider } = require('ethers');
require('dotenv').config();

//deployed addresses
//
// Token0     - 0x210dD4B75a71f2b8F565ce814877A7749BEaA38av
// Token1     - 0x1002A26f4404fa1BDAC9c6AdE24D4B053d960390
// Mystic DEX - 0xD0559eDB1b35661c207C52AA572d78eEc7677f96

//const PRIVATE_KEY = process.env.PRIVATE_KEY;

async function main() {
    // initialize your web3 provider
    const provider = new JsonRpcProvider("https://api.testnet.fhenix.zone:7747/");

    // initialize Fhenix Client
    const client = new FhenixClient({provider});

    // to encrypt data for a Fhenix contract
    let encrypted = await client.encrypt(5, EncryptionTypes.uint32);
    console.log(encrypted);

    // ...
    // contract logic goes here
    // ...

    // to unseal data returned from a Fhenix contract
    // const cleartext = client.unseal(contractAddress, sealed);
    // console.log(cleartext);
}

main().catch(console.error);
