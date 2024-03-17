#!/bin/bash

    # /**
    #  * @notice Register the address of a Router contract for the same Application on a remote chain
    #  * @param _domain The domain of the remote Application Router
    #  * @param _router The address of the remote Application Router
    #  */
    # function enrollRemoteRouter(
    #     uint32 _domain,
    #     bytes32 _router
    # ) external virtual onlyOwner {
    #     _enrollRemoteRouter(_domain, _router);
    # }


source .env

# BASE_SEPOLIA_ROUTER_ADDRESS=0xe46a1B3DA2241f71c0E0bdb7E6b188A27fE8b78F
# FHENIX_ROUTER_ADDRESS=0x50BbE5aefC1B50AFf307417D58679fab9A65fb83

# cast send $BASE_SEPOLIA_ROUTER_ADDRESS "enrollRemoteRouter(uint32,bytes32)" $FHENIX_CHAIN_ID "0x00000000000000000000000050BbE5aefC1B50AFf307417D58679fab9A65fb83" --rpc-url $BASE_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY_TWO
# echo $BASE_SEPOLIA_CHAIN_ID
# echo cast send $FHENIX_ROUTER_ADDRESS "enrollRemoteRouter(uint32,bytes32)" $BASE_SEPOLIA_CHAIN_ID "0x0000000000000000000000002b3B6F41e68bccEBEA6530D9978AFAdEa1C58567" --rpc-url "https://api.testnet.fhenix.zone:7747" --private-key $PRIVATE_KEY
cast send $FHENIX_ROUTER_ADDRESS "enrollRemoteRouter(uint32,bytes32)" $BASE_SEPOLIA_CHAIN_ID "0x0000000000000000000000002b3B6F41e68bccEBEA6530D9978AFAdEa1C58567" --rpc-url "https://api.testnet.fhenix.zone:7747" --private-key $PRIVATE_KEY
cast send $FHENIX_ROUTER_ADDRESS "enrollRemoteRouter(address)" $FHENIX_ISM_ADDRESS --rpc-url $BASE_SEPOLIA_RPC_URL --private-key $PRIVATE_KEY
