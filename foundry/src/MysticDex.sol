// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {IDEX} from "./IDEX.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MysticDex is IDEX {

    error MysticDex__DepositError();
    error MysticDex__WithdrawalError();
    error MysticDex__AmountCannotBeZero();
    error MysticDex__InsufficientLiquidity();

    IERC20 public immutable i_token0;
    IERC20 public immutable i_token1;

    uint256 public s_totalShares;
    mapping(address => uint256) public s_userLiquidityShares;

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

    function addLiquidity(uint256 maxAmount0, uint256 maxAmount1) external override returns(uint256 poolShares) {
        if(maxAmount0 == 0 || maxAmount1 == 0) {
            revert MysticDex__AmountCannotBeZero();
        }

        uint256 optAmount0; 
        uint256 optAmount1;

        if(s_liquidity0 == 0 || s_liquidity1 == 0){
            optAmount0 = maxAmount0;
            optAmount1 = maxAmount1;
        }
        else{
            (optAmount0, optAmount1) = calculateCPLiquidityReq(maxAmount0, maxAmount1);
        }

        i_token0.transferFrom(msg.sender, address(this), optAmount0);
        i_token1.transferFrom(msg.sender, address(this), optAmount1);

        if (s_totalShares == 0) {
            poolShares = _sqrt(optAmount0 * optAmount1);
        } else {
            uint256 shares0 = (optAmount0 * s_totalShares) / s_liquidity0;
            uint256 shares1 = (optAmount1 * s_totalShares) / s_liquidity1;
            
            if(shares0 == 0 && shares1 == 0){
                revert MysticDex__InsufficientLiquidity();
            }
            
            if(shares0 < shares1){
                poolShares = shares0;
            }else{
                poolShares = shares1;
            }
        }

        s_liquidity0 += optAmount0;
        s_liquidity1 += optAmount1;

        s_totalShares += poolShares;
        s_userLiquidityShares[msg.sender] += poolShares;
    }

    function settleLiquidity(bool zeroForOne, uint256 sellAmount, uint256 buyAmount) private {
        if(zeroForOne){
            s_liquidity0 += sellAmount;
            s_liquidity1 -= buyAmount;
        }else{
            s_liquidity0 -= buyAmount;
            s_liquidity1 += sellAmount;
        }
    }

    function calculateCPLiquidityReq(uint256 maxAmount0, uint256 maxAmount1) private view returns (uint256 optAmount0, uint256 optAmount1) {
        uint256 cp0 = maxAmount0 * s_liquidity1;
        uint256 cp1 = maxAmount1 * s_liquidity0;

        if(cp0 == cp1){
            optAmount0 = maxAmount0;
            optAmount1 = maxAmount1;
        }else if(cp0 < cp1){
            optAmount0 = maxAmount0;
            optAmount1 = cp0 / s_liquidity0;
        }else{
            optAmount1 = maxAmount1;
            optAmount0 = cp1 / s_liquidity1;
        }
    }

    function _sqrt(uint256 y) private pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }
}