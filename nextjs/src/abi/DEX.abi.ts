export default [
	{
		inputs: [
			{
				"internalType": "address",
				"name": "tokenAddress0",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "tokenAddress1",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "MysticDex__AmountCannotBeZero",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MysticDex__DepositError",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MysticDex__InsufficientLiquidity",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MysticDex__InsufficientSharePosition",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "MysticDex__WithdrawalError",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "euint32",
				"name": "maxAmount0",
				"type": "uint256"
			},
			{
				"internalType": "euint32",
				"name": "maxAmount1",
				"type": "uint256"
			}
		],
		"name": "addLiquidity",
		"outputs": [
			{
				"internalType": "euint32",
				"name": "poolShares",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "i_token0",
		"outputs": [
			{
				"internalType": "contract IFHERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "i_token1",
		"outputs": [
			{
				"internalType": "contract IFHERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_liquidity0",
		"outputs": [
			{
				"internalType": "euint32",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_liquidity1",
		"outputs": [
			{
				"internalType": "euint32",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "s_totalShares",
		"outputs": [
			{
				"internalType": "euint32",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "s_userLiquidityShares",
		"outputs": [
			{
				"internalType": "euint32",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "ebool",
				"name": "zeroForOne",
				"type": "uint256"
			},
			{
				"internalType": "euint32",
				"name": "sellAmount",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "userPublicKey",
				"type": "bytes32"
			}
		],
		"name": "swap",
		"outputs": [
			{
				"internalType": "euint32",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "euint32",
				"name": "poolShares",
				"type": "uint256"
			}
		],
		"name": "withdrawLiquidity",
		"outputs": [
			{
				"internalType": "euint32",
				"name": "amount0",
				"type": "uint256"
			},
			{
				"internalType": "euint32",
				"name": "amount1",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
] as const