// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {IDEX} from "./IDEX.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MysticDex is IDEX {

    error MysticDex__DepositError();
    error MysticDex__WithdrawalError();
    error MysticDex__AmountCannotBeZero();

    IERC20 public immutable i_token0;
    IERC20 public immutable i_token1;

    uint256 public s_liquidity0;
    uint256 public s_liquidity1;

    constructor(address tokenAddress0, address tokenAddress1){
        i_token0 = IERC20(tokenAddress0);
        i_token1 = IERC20(tokenAddress1);
    }

    function swap(
        bool zeroForOne,
        uint256 sellAmount
    ) external override returns (uint256 amountOut) {
        if(sellAmount == 0) {
            revert MysticDex__AmountCannotBeZero();
        }

        (IERC20 sellToken, IERC20 buyToken, uint256 sellReserve, uint256 buyReserve) = zeroForOne ? (i_token0, i_token1, s_liquidity0, s_liquidity1) : (i_token1, i_token0, s_liquidity1, s_liquidity0);

        bool deposit = sellToken.transferFrom(msg.sender, address(this), sellAmount);
        if(!deposit){
            revert MysticDex__DepositError();
        }

        amountOut = (buyReserve * sellAmount) / (sellReserve + sellAmount);

        //settle balances before transfer tokens (re-entrancy)
        //TODO : add re-entrancy lock
        settleLiquidity(zeroForOne, sellAmount, amountOut);

        bool withdrawal = buyToken.transfer(msg.sender, amountOut);
        if(!withdrawal){
            revert MysticDex__WithdrawalError();
        }
    }

    function addLiquidity(uint256 amount0, uint256 amount1) external override {}

    function settleLiquidity(bool zeroForOne, uint256 sellAmount, uint256 buyAmount) private {
        if(zeroForOne){
            s_liquidity0 += sellAmount;
            s_liquidity1 -= buyAmount;
        }else{
            s_liquidity0 -= buyAmount;
            s_liquidity1 += sellAmount;
        }
    }
}