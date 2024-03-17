// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {HypERC20} from "../src/hyperlane/HypERC20.sol";
import {EncryptedToken} from "../src/EncryptedToken.sol";

contract HypERC20Script is Script {
    
    function run() public {
        vm.startBroadcast();
        //(uint8 __decimals, address _mailbox, address __destinationToken, uint256 __scale)
        HypERC20 router = new HypERC20("Token0", "T0");
        // EncryptedToken token1 = new EncryptedToken("Token1", "T1");

        // MysticDEX mysticDEX = new MysticDEX(address(token0), address(token1));

        vm.stopBroadcast();

        //return address(mysticDEX);
    }

}