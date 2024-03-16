const { FhenixClient, EncryptionTypes } = require('fhenixjs');
const ethers = require('ethers');
require('dotenv').config();

const MysticDEX = require('./out/MysticDEX.sol/MysticDEX.json');
const Token = require('./out/EncryptedToken.sol/EncryptedToken.json');

//deployed addresses
//
// Token0     - 0x210dD4B75a71f2b8F565ce814877A7749BEaA38av
// Token1     - 0x1002A26f4404fa1BDAC9c6AdE24D4B053d960390
// Mystic DEX - 0xD0559eDB1b35661c207C52AA572d78eEc7677f96

const PRIVATE_KEY = process.env.PRIVATE_KEY;



async function main() {
    // initialize your web3 provider
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:42069");

    // initialize Fhenix Client
    const client = new FhenixClient({provider});

    // to encrypt data for a Fhenix contract
    let token0Spend = await client.encrypt(50, EncryptionTypes.uint32);
    //console.log(token0Spend);

    let signer = new ethers.Wallet(PRIVATE_KEY, provider);

    const token0Contract = new ethers.Contract(
        "0x210dD4B75a71f2b8F565ce814877A7749BEaA38av",
        Token.abi,
        signer
    );

    const sealedOutput = await token0Contract.transfer('0x3e62Dff1cb16F2902BC7E7400d611cCfc1368981', 50);


    const cleartext = client.unseal('0x210dD4B75a71f2b8F565ce814877A7749BEaA38av', sealedOutput);
    console.log(cleartext);
}

main().catch(console.error);
