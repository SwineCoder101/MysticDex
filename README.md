## Mystic DEX

Allow verified humans to perform encrypted trades and retain privacy from any source chain.

This was made possible with the integration of Fhenix, Hyperlane and WorldCoin into a single all-encompassing, privacy-preserving solution.

### Features
- [x] Verified Proof of personhood using WorldID on the Mytic DEX UI
- [x] Cross-Chain transfers using custom Hyperlane Warp Routes
- [x] End-to-End encrypted swaps using Fully Homomorphic Encryption (FHE) from Fhenix

In the end-to-end flow in Mystic DEX, the amounts swapped by the user is fully encrypted. This has a number of benefits such as MEV mitigation, on-chain privacy and user sovereignty.

![E2EFlow](/assets/E2EFlow.png)

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
  - todo
- Fhenix
  - [DEX Contract](https://explorer.testnet.fhenix.zone/address/0x8F1682410E2B5187D28b92280F38eff74868741d?tab=contract)
  - [Encrypted Token 0](https://explorer.testnet.fhenix.zone/address/0xF6463C63DE5aA98B004E8625adfEC06c662955E1?tab=contract)
  - [Encrypted Token 1](https://explorer.testnet.fhenix.zone/address/0xDF17B9821dBA7ce2cAdA171F70ad52526246B6c8?tab=contract)
  