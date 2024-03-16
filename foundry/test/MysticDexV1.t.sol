// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {Test, console} from "forge-std/Test.sol";
import {MysticDexV1} from "../src/MysticDexV1.sol";
import {MockERC20} from "./mock/MockERC20.sol";

contract MysticDexV1Test is Test {

    MysticDexV1 public amm;
    MockERC20 public token0;
    MockERC20 public token1;

    function setUp() public {
        token0 = new MockERC20("Token0", "T0");
        token1 = new MockERC20("Token1", "T1");

        amm = new MysticDexV1(address(token0), address(token1));

        token0.approve(address(amm), 1_000_000);
        token1.approve(address(amm), 1_000_000);
        amm.addLiquidity(1_000_000, 1_000_000);
    }

    // 1000 * 1M / (1M + 1000) = 999
    function testSuccessfulSwapZeroForOne() public {
        token0.approve(address(amm), 1000);

        uint256 amountOut = amm.swap(true, 1000);

        assertEq(amountOut, 999);
    }

    function testSuccessfulSwapOneForZero() public {
        token1.approve(address(amm), 1000);

        uint256 amountOut = amm.swap(false, 1000);

        assertEq(amountOut, 999);
    }

    function testAddLiquidity0GreaterThan1() public {
        uint256 startingLiq0 = amm.s_liquidity0();
        uint256 startingLiq1 = amm.s_liquidity1();

        uint256 maxAmount0 = 100_000;
        uint256 maxAmount1 = 50_000;

        token0.approve(address(amm), 50_000);
        token1.approve(address(amm), 50_000);

        amm.addLiquidity(maxAmount0, maxAmount1);

        assertEq(amm.s_liquidity0(), startingLiq0 + maxAmount1);
        assertEq(amm.s_liquidity0(), token0.balanceOf(address(amm)));

        assertEq(amm.s_liquidity1(), startingLiq1 + maxAmount1);
        assertEq(amm.s_liquidity1(), token1.balanceOf(address(amm)));
    }

    function testAddLiquidity1GreaterThan0() public {
        uint256 startingLiq0 = amm.s_liquidity0();
        uint256 startingLiq1 = amm.s_liquidity1();

        uint256 maxAmount0 = 50_000;
        uint256 maxAmount1 = 100_000;

        token0.approve(address(amm), 50_000);
        token1.approve(address(amm), 50_000);

        amm.addLiquidity(maxAmount0, maxAmount1);

        assertEq(amm.s_liquidity0(), startingLiq0 + maxAmount0);
        assertEq(amm.s_liquidity0(), token0.balanceOf(address(amm)));

        assertEq(amm.s_liquidity1(), startingLiq1 + maxAmount0);
        assertEq(amm.s_liquidity1(), token1.balanceOf(address(amm)));
    }

    function testAddEqualLiquidity() public {
        uint256 startingLiq0 = amm.s_liquidity0();
        uint256 startingLiq1 = amm.s_liquidity1();

        uint256 maxAmount0 = 100_000;
        uint256 maxAmount1 = 100_000;

        token0.approve(address(amm), 100_000);
        token1.approve(address(amm), 100_000);

        amm.addLiquidity(maxAmount0, maxAmount1);

        assertEq(amm.s_liquidity0(), startingLiq0 + maxAmount0);
        assertEq(amm.s_liquidity0(), token0.balanceOf(address(amm)));

        assertEq(amm.s_liquidity1(), startingLiq1 + maxAmount1);
        assertEq(amm.s_liquidity1(), token1.balanceOf(address(amm)));
    }

    function testAddMultipleLiquidity() public {
        uint256 startingLiq0 = amm.s_liquidity0();
        uint256 startingLiq1 = amm.s_liquidity1();

        uint256 maxAmount = 100_000;

        token0.approve(address(amm), maxAmount);
        token1.approve(address(amm), maxAmount);

        amm.addLiquidity(maxAmount, maxAmount);

        assertEq(amm.s_liquidity0(), startingLiq0 + maxAmount);
        assertEq(amm.s_liquidity0(), token0.balanceOf(address(amm)));

        assertEq(amm.s_liquidity1(), startingLiq1 + maxAmount);
        assertEq(amm.s_liquidity1(), token1.balanceOf(address(amm)));

        uint256 interimLiquidity0 = amm.s_liquidity0();
        uint256 interimLiquidity1 = amm.s_liquidity1();

        token0.approve(address(amm), maxAmount);
        token1.approve(address(amm), maxAmount);

        amm.addLiquidity(maxAmount, maxAmount);

        assertEq(amm.s_liquidity0(), interimLiquidity0 + maxAmount);
        assertEq(amm.s_liquidity0(), token0.balanceOf(address(amm)));

        assertEq(amm.s_liquidity1(), interimLiquidity1 + maxAmount);
        assertEq(amm.s_liquidity1(), token1.balanceOf(address(amm)));
    }

    function testWithdrawLiquidity() public {
        uint256 startingLiq0 = amm.s_liquidity0();
        uint256 startingLiq1 = amm.s_liquidity1();

        uint256 maxAmount = 100_000;

        token0.approve(address(amm), maxAmount);
        token1.approve(address(amm), maxAmount);

        uint256 shares = amm.addLiquidity(maxAmount, maxAmount);

        assertEq(amm.s_liquidity0(), startingLiq0 + maxAmount);
        assertEq(amm.s_liquidity0(), token0.balanceOf(address(amm)));

        assertEq(amm.s_liquidity1(), startingLiq1 + maxAmount);
        assertEq(amm.s_liquidity1(), token1.balanceOf(address(amm)));

        amm.withdrawLiquidity(shares);
    }

    function testWithdrawTooMuchLiquidity() public {
        uint256 startingLiq0 = amm.s_liquidity0();
        uint256 startingLiq1 = amm.s_liquidity1();

        uint256 maxAmount = 100_000;

        token0.approve(address(amm), maxAmount);
        token1.approve(address(amm), maxAmount);

        uint256 shares = amm.addLiquidity(maxAmount, maxAmount);

        assertEq(amm.s_liquidity0(), startingLiq0 + maxAmount);
        assertEq(amm.s_liquidity0(), token0.balanceOf(address(amm)));

        assertEq(amm.s_liquidity1(), startingLiq1 + maxAmount);
        assertEq(amm.s_liquidity1(), token1.balanceOf(address(amm)));

        amm.withdrawLiquidity(shares+1);
    }
}