// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import {IEncryptedDEX} from "./IEncryptedDEX.sol";
import { inEuint32, euint32, inEbool } from "../node_modules/@fhenixprotocol/contracts/FHE.sol";

contract MysticDEX is IEncryptedDEX {
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