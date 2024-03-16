// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { FHE, inEuint32, euint32, inEbool } from "@fhenixprotocol/contracts/FHE.sol";
import { IEncryptedDEX } from "./IEncryptedDEX.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DexMiddleman {

    IEncryptedDEX public dex;

    constructor(address dexTarget){
        dex = IEncryptedDEX(dexTarget);
    }

    function updateDexTarget(address newDexTarget) external {
        dex = IEncryptedDEX(newDexTarget);
    }

    function swap(bool zeroForOne, uint32 amountIn, bytes32 userPublicKey) external returns (uint32){
        euint32 amountOut = dex.swap(FHE.asEbool(zeroForOne), FHE.asEuint32(amountIn), userPublicKey);
        return FHE.decrypt(amountOut);
    }

    function addLiquidity(uint32 maxInAmount0, uint32 maxInAmount1) external returns(uint32){
        euint32 shares = dex.addLiquidity(FHE.asEuint32(maxInAmount0), FHE.asEuint32(maxInAmount1));
        return FHE.decrypt(shares);
    }

    function withdrawLiquidity(uint32 poolShares) external returns(uint32, uint32){
        (euint32 amount0, euint32 amount1) = dex.withdrawLiquidity(FHE.asEuint32(poolShares));
        return (FHE.decrypt(amount0), FHE.decrypt(amount1));
    }

    function approveTokens(address tokenAddress, uint256 amount) external {
        IERC20(tokenAddress).approve(address(dex), amount); //we just want to call approve on encrypted token
    }
}