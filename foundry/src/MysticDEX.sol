// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { IEncryptedDEX } from "./IEncryptedDEX.sol";
import { IFHERC20 } from "@fhenixprotocol/contracts/experimental/token/FHERC20/IFHERC20.sol";
import { inEuint32, euint32, inEbool } from "@fhenixprotocol/contracts/FHE.sol";

contract MysticDEX is IEncryptedDEX {
    
    error MysticDex__DepositError();
    error MysticDex__WithdrawalError();
    error MysticDex__AmountCannotBeZero();
    error MysticDex__InsufficientLiquidity();
    error MysticDex__InsufficientSharePosition();

    IFHERC20 public immutable i_token0;
    IFHERC20 public immutable i_token1;

    euint32 public s_totalShares;
    mapping(address => euint32) public s_userLiquidityShares;

    euint32 public s_liquidity0;
    euint32 public s_liquidity1;

    constructor(address tokenAddress0, address tokenAddress1) {
        i_token0 = IFHERC20(tokenAddress0);
        i_token1 = IFHERC20(tokenAddress1);
    }

    function swap(
        inEbool calldata zeroForOne,
        inEuint32 calldata amountIn
    ) external override returns (euint32 amountOut) {}

    function addLiquidity(
        inEuint32 calldata maxAmount0,
        inEuint32 calldata maxAmount1
    ) external override returns (euint32 poolShares) {}

    function withdrawLiquidity(
        inEuint32 calldata poolShares
    ) external override returns (euint32 amount0, euint32 amount1) {}
}