// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { FHE, euint32, inEuint32 } from "@fhenixprotocol/contracts/FHE.sol";
import { IFHERC20 } from "@fhenixprotocol/contracts/experimental/token/FHERC20/IFHERC20.sol";
import { FHERC20 } from "@fhenixprotocol/contracts/experimental/token/FHERC20/FHERC20.sol";

contract EncryptedToken is FHERC20 {
    constructor(
        string memory name,
        string memory symbol
    ) FHERC20(name, symbol) {}
}