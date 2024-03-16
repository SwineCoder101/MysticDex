// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {MysticVault} from "../src/MysticVault.sol";
import {EncryptedToken} from "../src/EncryptedToken.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MysticVaultScript is Script {

    address immutable public USDC_ADDRESS = 0x036CbD53842c5426634e7929541eC2318f3dCF7e;
    
    function run() public {
        vm.startBroadcast();

        IERC20 usdc = IERC20(USDC_ADDRESS);
        MysticVault vault = new MysticVault(usdc, "USDC Vault", "mUSDC");

        address addressVault = address(vault);

        vm.stopBroadcast();
    }

}