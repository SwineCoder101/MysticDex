#!/bin/bash

# Set the destination address
# cast send $DESTINATION_ADDRESS --private-key $DEPLOYER_PRIVATE_KEY --value $(cast tw 1)


# Deploy the contract
hyperlane deploy core \
    --targets basesepolia \
    --chains ./configs/chains.yaml \
    --ism ./configs/ism.yaml \
    --key $DEPLOYER_PRIVATE_KEY