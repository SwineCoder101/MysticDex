// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

interface IDEX {
    function swap(bool zeroForOne, uint256 amountIn) external returns (uint256 amountOut);
    function addLiquidity(uint256 amount0, uint256 amount1) external returns(uint256 poolShares);
}