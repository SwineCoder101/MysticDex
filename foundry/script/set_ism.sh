#!/bin/bash


    # /**
    #  * @notice Sets the address of the application's custom interchain security module.
    #  * @param _module The address of the interchain security module contract.
    #  */
    # function setInterchainSecurityModule(
    #     address _module
    # ) public onlyContractOrNull(_module) onlyOwner {
    #     interchainSecurityModule = IInterchainSecurityModule(_module);
    # }

# 1. Set the ISMs in the routers 
source .env

cast send $BASE_SEPOLIA_ROUTER_ADDRESS "setInterchainSecurityModule(address)" $BASE_SEPOLIA_ISM_ADDRESS --rpc-url $BASE_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY
cast send $FHENIX_ROUTER_ADDRESS "setInterchainSecurityModule(address)" $FHENIX_ISM_ADDRESS --rpc-url $BASE_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY
