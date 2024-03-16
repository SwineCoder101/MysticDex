// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { inEuint32, euint32, inEbool } from "@fhenixprotocol/contracts/FHE.sol";

interface IEncryptedDEX {
    function swap(inEbool calldata zeroForOne, inEuint32 calldata amountIn) external returns (euint32 amountOut);
    function addLiquidity(inEuint32 calldata maxAmount0, inEuint32 calldata maxAmount1) external returns(euint32 poolShares);
    function withdrawLiquidity(inEuint32 calldata poolShares) external returns(euint32 amount0, euint32 amount1);
}