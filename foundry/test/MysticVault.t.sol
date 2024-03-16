// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {MysticVault} from "../src/MysticVault.sol";
import {MockERC20} from "./mock/MockERC20.sol";

contract MysticVaultTest is Test {
    
        MysticVault public vault;
        MockERC20 public asset;
        address public user = makeAddr("user");
    
        function setUp() public {
            asset = new MockERC20("Asset", "AS");
            vault = new MysticVault(asset, "Mystic Vault", "MV");
            asset.transfer(user,1000);
        }

        // test deposit of asset
        function testDepositWithdraw() public {
            vm.startPrank(user);

            // test deposit
            assertEq(asset.balanceOf(user), 1000);
            
            asset.approve(address(vault), 1000);
            vault.deposit(1000, user);
            assertEq(vault.balanceOf(user), 1000);
            assertEq(asset.balanceOf(user), 0);

            // test withdraw
            vault.withdraw(1000, user, user);

            assertEq(vault.balanceOf(user), 0);
            assertEq(asset.balanceOf(user), 1000);
            vm.stopPrank();
        }

}       