// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {IDEX} from "./IDEX.sol";

contract MysticDex is IDEX {
    function swap(
        bool zeroForOne,
        uint256 amountIn
    ) external override returns (uint256 amountOut) {}

    function addLiquidity(uint256 amount0, uint256 amount1) external override {}
}