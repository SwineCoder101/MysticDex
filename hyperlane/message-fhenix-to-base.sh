#!/bin/bash

hyperlane send message --key $DEPLOYER_PRIVATE_KEY --chains ./configs/chains.yaml --origin basesepolia --destination fhenix --core ./artifacts/core-deployment-fhenix-basesepolia.json