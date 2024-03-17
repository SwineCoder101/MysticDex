// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Script, console} from "forge-std/Script.sol";
import {HypERC20CollateralVaultDeposit} from "../src/hyperlane/HypERC20CollateralVaultDeposit.sol";
import {EncryptedToken} from "../src/EncryptedToken.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC4626} from "@openzeppelin/contracts/interfaces/IERC4626.sol";
import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";

contract HypERC20CollateralVaultDepositScript is Script {

    address immutable public MAILBOX_ADDRESS = 0xfC334E17466710f0e2f1ab106779863f32ff3B7F;
    address immutable public VAULT_ADDRESS = 0x0654a01d6845e2A157CeAc89F16beD32aF4b9638;
    
    function run() public {
        vm.startBroadcast();

        ERC4626 vault = ERC4626(VAULT_ADDRESS);
        HypERC20CollateralVaultDeposit hyperlaneVault = new HypERC20CollateralVaultDeposit(vault, MAILBOX_ADDRESS);
        
        vm.stopBroadcast();
    }

}