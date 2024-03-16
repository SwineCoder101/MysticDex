#!/bin/bash

# This script deploys the vault contract to the blockchain.
source .env

forge script ./script/HypERC20CollateralVaultDeposit.s.sol:HypERC20CollateralVaultDepositScript --chain-id $CHAIN_ID --rpc-url $BASE_SEPOLIA_RPC_URL \
    --etherscan-api-key $BASESCAN_API_KEY --verifier-url $BASE_SEPOLIA_API_URL \
    --sender $DEPLOYER_ADDRESS --private-key $PRIVATE_KEY --broadcast --verify -vvvv