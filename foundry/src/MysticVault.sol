// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";

contract MysticVault is ERC4626 {

    IERC20 private immutable _asset;

    constructor(IERC20 asset, string memory name, string memory symbol) ERC4626(asset) ERC20(name, symbol){
        _asset = asset;
    }
}