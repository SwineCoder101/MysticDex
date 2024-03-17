## Mystic DEX

Allow verified humans to perform encrypted trades and retain privacy from any source chain.

This was made possible with the integration of Fhenix, Hyperlane and WorldCoin into a single all-encompassing, privacy-preserving solution.

### Features
- [x] Verified Proof of personhood using WorldID on the Mytic DEX UI
- [x] Cross-Chain transfers using custom Hyperlane Warp Routes
- [x] End-to-End encrypted swaps using Fully Homomorphic Encryption (FHE) from Fhenix

In the end-to-end flow in Mystic DEX, the amounts swapped by the user is fully encrypted. This has a number of benefits such as MEV mitigation, on-chain privacy and user sovereignty.

![E2EFlow](/assets/E2EFlow.png)

### Repository Structure
This repo is comprised of three packages, foundry, hyperlane,nextjs
foundry - contains all smart contracts and deployment scripts for application logic residing on Base Sepolia and Fhenix. This includes AMM and Yield Bearing Vaults.
hyperlane - contains all the hyperlane configurations for the warp route and core contracts to interoporate between chains. This was generated from Hyperlane CLI
nextjs - Contains the front end code to run the application including world ID integration

### Improvements
- Add Account Abstraction to source chain interactions
- Slippage improvements / customisability on Fhenix AMM
- Deploy entrypoint contracts to more supported chains
- Increase number of relayers / verifiers on Hyperlane warp routes
- Add zk entrypoint to obfuscate user interactions (e.g. Railgun)
- Add user address sanction screening to prevent bad actors (e.g. Chainalysis / Elliptic)

#### Verified Contracts 
- WorldCoin
  - todo
- Hyperlane
  - [Custom 4626 Vault](https://sepolia.basescan.org/address/0x0654a01d6845e2a157ceac89f16bed32af4b9638 )
  - [HypERC20CollateralVaultDeposit](https://sepolia.basescan.org/address/0x2b3b6f41e68bccebea6530d9978afadea1c58567#code)
  - Core contract deployments can be found under ./hyperlane/artifacts/
- Fhenix
  - [DEX Contract](https://explorer.testnet.fhenix.zone/address/0x8F1682410E2B5187D28b92280F38eff74868741d?tab=contract)
  - [Encrypted Token 0](https://explorer.testnet.fhenix.zone/address/0xF6463C63DE5aA98B004E8625adfEC06c662955E1?tab=contract)
  - [Encrypted Token 1](https://explorer.testnet.fhenix.zone/address/0xDF17B9821dBA7ce2cAdA171F70ad52526246B6c8?tab=contract)

#### HOW TO NEXTJS
To build and run:
```
npm install && npm run dev
```

#### HOW TO FOUNDRY
install npm packages
```
npm install
```

re-map dependencies
```
forge remappings
```

re-build project
```
forge build
```

run all tests
```
forge test -v
```


deployment scripts can be found in ./script, shell scripts are used for changing state and deploying the custom vault contracts

#### HOW TO HYPERLANE

1) use hyperlane cli to generate and deploy hyperlane onto new chains.
2) create a warpe route after successful deployment

Test a hyperlane transfer of USDC from orign to src, result of this test are
- funds deposit into vault
- usdc synthetic token minted
- sends encrypted token to end user
- end user reccieved yield bearing vault token

make sure to use the private key used to deploy the core contracts ie relayer, mailbox, router

command:
```
hyperlane send transfer
```

Every new commit is deployed to vercel