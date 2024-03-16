// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import { inEuint32, euint32, inEbool, ebool } from "@fhenixprotocol/contracts/FHE.sol";

//removed inEuint / inEbool values to simplify middleman contract
interface IEncryptedDEX {
    function swap(ebool zeroForOne, euint32 amountIn, bytes32 userPublicKey) external returns (euint32);
    function addLiquidity(euint32 maxInAmount0, euint32 maxInAmount1) external returns(euint32 poolShares);
    function withdrawLiquidity(euint32 poolShares) external returns(euint32 amount0, euint32 amount1);
}