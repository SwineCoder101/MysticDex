// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.8.0;

import {TokenRouter} from "./libs/TokenRouter.sol";

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol"; 
import {ERC20Upgradeable} from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

/**
 * @title Hyperlane ERC20 Token Router that extends ERC20 with remote transfer functionality.
 * @author Abacus Works
 * @dev Supply on each chain is not constant but the aggregate supply across all chains is.
 */
contract HypERC20 is ERC20Upgradeable, TokenRouter {
    uint8 private immutable _decimals;
    IERC20 private immutable _destinationToken;

    uint256 private _scale = 1;

    constructor(uint8 __decimals, address _mailbox, address __destinationToken, uint256 __scale) TokenRouter(_mailbox) {
        _decimals = __decimals;
        _destinationToken = IERC20(__destinationToken);
        _scale = __scale;
    }

    /**
     * @notice Initializes the Hyperlane router, ERC20 metadata, and mints initial supply to deployer.
     * @param _totalSupply The initial supply of the token.
     * @param _name The name of the token.
     * @param _symbol The symbol of the token.
     */
    function initialize(
        uint256 _totalSupply,
        string memory _name,
        string memory _symbol
    ) external initializer {
        // Initialize ERC20 metadata
        __ERC20_init(_name, _symbol);
        _mint(msg.sender, _totalSupply);
    }

    function decimals() public view override returns (uint8) {
        return _decimals;
    }

    function balanceOf(
        address _account
    )
        public
        view
        virtual
        override(TokenRouter, ERC20Upgradeable)
        returns (uint256)
    {
        return ERC20Upgradeable.balanceOf(_account);
    }

    /**
     * @dev Burns `_amount` of token from `msg.sender` balance.
     * @inheritdoc TokenRouter
     */
    function _transferFromSender(
        uint256 _amount
    ) internal override returns (bytes memory) {
        _burn(msg.sender, _amount);
        return bytes(""); // no metadata
    }

    function setScale (uint256 __scale) public {
        _scale = __scale;
    }

    /**
     * @dev Mints `_amount` of token to `_recipient` balance.
     * @inheritdoc TokenRouter
     */
    function _transferTo(
        address _recipient,
        uint256 _amount,
        bytes calldata // no metadata
    ) internal virtual override {
        uint256 _amountToMint = _amount * _scale;
        _mint(_recipient, _amountToMint);                         //mint balance to user
        _destinationToken.transfer(_recipient, _amountToMint);    //transfer other token to user
        _burn(_recipient, _amountToMint);                         //burn balance from user
    }
}
