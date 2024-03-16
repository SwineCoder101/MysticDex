// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {MysticDEX} from "../src/MysticDEX.sol";
import {EncryptedToken} from "../src/EncryptedToken.sol";

contract MysticDEXScript is Script {
    
    function run() public {//returns(address) {
        vm.startBroadcast();
        EncryptedToken token0 = new EncryptedToken("Token0", "T0");
        // EncryptedToken token1 = new EncryptedToken("Token1", "T1");

        // MysticDEX mysticDEX = new MysticDEX(address(token0), address(token1));

        vm.stopBroadcast();

        //return address(mysticDEX);
    }

}