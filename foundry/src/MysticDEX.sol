// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { IEncryptedDEX } from "./IEncryptedDEX.sol";
import { IFHERC20 } from "@fhenixprotocol/contracts/experimental/token/FHERC20/IFHERC20.sol";
import { FHE, inEuint32, euint32, inEbool, ebool } from "@fhenixprotocol/contracts/FHE.sol";

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

    //zeroForOne doesn't need to be encrypted,
    //will be obvious based on token contract calls which methods were called
    //therefore will be simple to deteremine trade direction regardless
    function swap(
        bool zeroForOne, 
        inEuint32 calldata amountIn,
        bytes32 userPublicKey
    ) external override returns (euint32) {

        euint32 sellAmount = FHE.asEuint32(amountIn);

        //ignore for now! ...
        // if (sellAmount.eq(0)) {
        //     revert MysticDex__AmountCannotBeZero();
        // }

        (
            IFHERC20 sellToken,
            IFHERC20 buyToken,
            euint32 sellReserve,
            euint32 buyReserve
        ) = zeroForOne
                ? (i_token0, i_token1, s_liquidity0, s_liquidity1)
                : (i_token1, i_token0, s_liquidity1, s_liquidity0);

        sellToken.transferFromEncrypted(
            msg.sender,
            address(this),
            sellAmount
        );

        euint32 amountOut = (buyReserve * sellAmount) / (sellReserve + sellAmount);

        //settle balances before transfer tokens (re-entrancy)
        //TODO : add re-entrancy lock
        settleLiquidity(zeroForOne, sellAmount, amountOut);

        buyToken.transferEncrypted(msg.sender, amountOut);

        //re encrypt return value with user pub key, so only user can decrypt with their private key
        return FHE.asEuint32(FHE.sealoutput(amountOut, userPublicKey));
    }

    function addLiquidity(
        inEuint32 calldata maxAmount0,
        inEuint32 calldata maxAmount1
    ) external override returns (euint32 poolShares) {}

    function withdrawLiquidity(
        inEuint32 calldata poolShares
    ) external override returns (euint32 amount0, euint32 amount1) {}

    function settleLiquidity(
        bool zeroForOne,
        euint32 sellAmount,
        euint32 buyAmount
    ) private {
        if (zeroForOne) {
            s_liquidity0 = s_liquidity0 + sellAmount;
            s_liquidity1 = s_liquidity1 - buyAmount;
        } else {
            s_liquidity0 = s_liquidity0 - buyAmount;
            s_liquidity1 = s_liquidity1 + sellAmount;
        }
    }
}