#!/bin/bash

hyperlane send message --key $DEPLOYER_PRIVATE_KEY --chains ./configs/chains.yaml --origin fhenix --destination basesepolia --core ./artifacts/core-deployment-fhenix-basesepolia.json