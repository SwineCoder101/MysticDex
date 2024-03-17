"use client";
import { Input } from "../components/ui/input";
import { IDKitWidget } from '@worldcoin/idkit';
import { useState } from 'react';
import { BigNumber, ethers } from 'ethers';
import { decode }from '../lib/wld';
import DexAbi from '../abi/DEX.abi';
import ContractAbi from '../abi/Contract.abi';
import { Account } from '../utils/account';
import { writeContract } from '@wagmi/core';
import ercAbi from '../abi/ERC20.abi';
import { WalletOptions } from '../utils/wallet-options';
import { parseEther } from 'viem'
import { useAccount, useWriteContract, useReadContract, usePrepareContractWrite } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import { motion } from 'framer-motion';
import { parseAbi } from 'viem'
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { useSendTransaction } from 'wagmi' 
import { parseUnits } from 'viem'
import { config } from "../utils/config";

// From IDEX contract
// function swap(bool zeroForOne, uint256 amountIn) external returns (uint256 amountOut);
// function addLiquidity(uint256 maxAmount0, uint256 maxAmount1) external returns(uint256 poolShares);
// function withdrawLiquidity(uint256 poolShares) external returns(uint256 amount0, uint256 amount1);

//deployed addresses
// Middleman  - 0x2AA9Ea1513b5B3428674AF84BCe8927b73378193
// Token0     - 0x210dD4B75a71f2b8F565ce814877A7749BEaA38av
// Token1     - 0x1002A26f4404fa1BDAC9c6AdE24D4B053d960390
// Mystic DEX - 0xD0559eDB1b35661c207C52AA572d78eEc7677f96

// const wagmiContractConfig = {
//   addressOrName: '0xD0559eDB1b35661c207C52AA572d78eEc7677f96',
//   contractInterface: ContractAbi,
// };

const bounceAnimation = {
  y: ["0%", "-10%", "0%",  "-10%", "0%"], // Bounce movement pattern
  transition: {
    y: {
      duration: 0.6, // Duration of one bounce cycle
      ease: "easeOut", // Easing function for the bounce
      repeat: 2, // Repeat the animation indefinitely
      repeatType: "reverse", // Reverse the animation on each iteration for a bounce effect
      repeatDelay: 2, // 2-second pause between each bounce cycle
    }
  }
};

export default function Home() {
  // const { hash, sendTransaction } = useSendTransaction() 
  const { address } = useAccount();
  const [proof, setProof] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [isTransactionSuccessModalVisible, setIsTransactionSuccessModalVisible] = useState(false);
  const [verified, setVerified] = useState(false);
  const [balance, setBalance] = useState(null);
  const [inputAmount, setInputAmount] = useState(0);
  const [outputAmount, setOutputAmount] = useState(0);

  const onSuccess = () => {
    setVerified(true);
  };

  // const { data, isError, isLoading } = useReadContract({
  //   DexAbi,
  //   functionName: 's_liquidity0',
  //   args: [''],
  // });

  // const ercAbi = parseAbi(['function transfer(address,uint256)']);

  // const { config } = usePrepareContractWrite({
  //   addressOrName: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  //   contractInterface: ercAbi,
  //   functionName: 'transfer',
  //   args: [process.env.NEXT_PUBLIC_VAULT_ADDR, parseEther(inputAmount, 18)],
  // });

  // Use the contract write hook
  // const { write: sendToken, isLoading, isSuccess, error } = useContractWrite(config);
  
  // async function submit(e) {
  //   e.preventDefault();
  //   const to = '0x5A80307Eb58Ab20530be96bB882146A327ec7251';
  //   const value = inputAmount;
  //   console.log(to);
  //   console.log(inputAmount);

  // }

  async function submit(e) {
    e.preventDefault();

    const amount = inputAmount;

    // console.log(amount)
    // console.log(parseEther(amount))
    // console.log(writeContract)
    // console.log(process.env.NEXT_PUBLIC_VAULT_ADDR)

    const tokenAbi = ["function transfer(address recipient, uint256 amount) returns (bool)"];
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract("0x036CbD53842c5426634e7929541eC2318f3dCF7e", tokenAbi, signer);

    console.log("Amount:", amount); // Debugging - check the value of amount

    const parsedAmount = ethers.utils.parseUnits(amount, 6); // Ensure correct formatting
    
    const receipt = await contract.transfer(process.env.NEXT_PUBLIC_VAULT_ADDR, parsedAmount.toString());
    
    setIsTransactionSuccessModalVisible(true);
    // const result = await writeContract(config, {
    //   ercAbi,
    //   address: '0x036CbD53842c5426634e7929541eC2318f3dCF7e',
    //   functionName: 'transfer',
    //   args: [process.env.NEXT_PUBLIC_VAULT_ADDR, 123n,],
    // })

    console.log(result)
  }
   

  // Example function to handle reading balance
  function handleReadContract() {
    console.log('reading...')
    console.log(data)
    if (data) {
      console.log(data);
      setBalance(data); // Assuming `data` contains the balance you're interested in
    }
  }
    
  // function deposit() {
  //   writeContract({ 
  //     address: process.env.NEXT_PUBLIC_VAULT_ADDR,
  //     abi:,
  //     functionName: 'verifyAndExecute',
  //     args: [],
  //   })
  // }

  const handleInputChange = (event) => {
    setInputAmount(event.target.value);
    setOutputAmount(event.target.value*123)
  };

  const handleOutputChange = (event) => {
    setOutputAmount(event.target.value);
  };

  function write() {




    writeContract({ 
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDR,
    abi: ContractAbi,
    enabled: proof != null && address != null,
    functionName: 'verifyAndExecute',
    args: [
      address,
      proof?.merkle_root ? decode('uint256', proof?.merkle_root ?? '') : BigNumber.from(0),
      proof?.nullifier_hash ? decode('uint256', proof?.nullifier_hash ?? '') : BigNumber.from(0),
      proof?.proof
        ? decode(['uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256', 'uint256'],
          proof?.proof ?? ''
        )
        : [
            BigNumber.from(0),
            BigNumber.from(0),
            BigNumber.from(0),
            BigNumber.from(0),
            BigNumber.from(0),
            BigNumber.from(0),
            BigNumber.from(0),
            BigNumber.from(0),
        ],
    ],
  })
  }

   const handleOpenDialog = () => {
     setDisplayModal(true);
   };
 
   const handleCloseDialog = () => {
     setDisplayModal(false);
   };

   function TransactionSuccessModal({ onClose }) {
    return (
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold">Transaction Succeeded</h3>
          <p>Your transaction has been processed successfully.</p>
          <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen bg-[#0f181f]"
      style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
    >
      {address ? (
				proof ? (<></>) : ( <div className="hidden md:flex border-b border-[#232d3c]">
        <div className="container text-white flex flex-row items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16 ">
          <div className="flex flex-row space-x-2">
            <h2 className="text-3xl text-gray-200 tracking-tighter font-medium">mysticDEX</h2>
            
          </div>
          <div>
          <ConnectKitButton />
          </div>
        </div>
      </div>) ):  <div className="hidden md:flex border-b border-[#232d3c]">
        <div className="container text-white flex flex-row items-start justify-center space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16 ">
          <div className="flex flex-row space-x-2">
            <h2 className="text-3xl text-gray-200 tracking-tighter font-medium">mysticDEX</h2>
            
          </div>
        </div>
      </div>}
  

      <div className="container text-white text-center pt-20 w-[500px]">
        <div className="flex">
        {verified === true ? <button 
            disabled className="mx-auto mb-10 border border-[#1c2836] bg-[#0c1c28] p-2 tracking-tight font-medium">you are verified with world id</button> : (
        address ? (
				proof ? (
					<button onClick={write}>submit tx</button>
				) : (
					<IDKitWidget
            app_id="app_staging_7b0776cc7b74fd86dc87adac4792a7d6"
            action="swap"
            signal={address}            
            onSuccess={onSuccess}
					>
						{({ open }) => <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={open}
              animate={bounceAnimation}
              className="mx-auto mb-10 bg-[#77f6b5] tracking-tight text-[#0c1c28] font-medium text-lg py-2 px-14"
            >
              verify with world id
            </motion.button>}
					</IDKitWidget>
				)
			) : (
        <div className="flex mx-auto mb-6">
				   <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animation={bounceAnimation}><ConnectKitButton /></motion.div>
        </div>
			) )
    }
        </div>
        <p className="mb-2" style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>
          Input Token:
        </p>
        <div className="flex flex-row space-x-2 relative">
  <input
    className={`border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-6 tracking-tight font-medium appearance-none w-full focus:outline-none ${verified ? 'hover:bg-[#1e2831]' : ''}`}
    placeholder="Your value here"
    type="number"
    disabled={!verified}
    value={inputAmount}
    onChange={handleInputChange}
  />
  <select
    className={`focus:outline-none border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-2 tracking-tight font-medium absolute right-0 top-0 h-full ${verified ? 'hover:bg-[#1e2831]' : ''}`}
    disabled={!verified}
    onChange={handleReadContract}
    // style={{WebkitAppearance: 'none'}}
  >
    <option value="USDC">USDC</option>
    <option value="ETH">ETH</option>
    <option value="BTC">BTC</option>
  </select>
</div>

      </div>

      <div className="container text-white text-center pt-12 w-[500px]">
        <p className="mb-2" style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>
          Output Token:
        </p>
        <div className="flex flex-row space-x-2 relative">
        <input
          className={`border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-6 tracking-tight font-medium appearance-none w-full focus:outline-none ${verified ? '' : ''}`}
          placeholder="Output value"
          type="number"
          disabled={true}
          value={outputAmount}
        />
          <select
            className={`focus:outline-none border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-2 tracking-tight font-medium absolute right-0 top-0 h-full ${verified ? 'hover:bg-[#1e2831]' : ''}`}
            disabled={!verified}
            // style={{WebkitAppearance: 'none'}}
          >
            <option value="Secret Token">Secret Token</option>
            <option value="USDC">USDC</option>
            <option value="Mistique">Mistique</option>
          </select>
        </div>
      </div>
      <div className="container text-white text-center pt-12 w-[500px]">
        
       {address != null && verified === true && outputAmount === 0 && (<p className="text-sm">Slippage: <i>Please input a token value.</i></p>) }
       {address != null && verified === true && outputAmount !== 0 && (<p className="text-sm">Slippage: 3%</p>) }
       {address != null ? verified === true ?
        (<motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border text-md border-[#1c2836] text-[21px] bg-[#77f6b5] text-[#0c1c28] py-2 px-14 mt-8 tracking-tight font-medium"
          onClick={submit}>
          SWAP
        </motion.button>) : (<button disabled className="border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-14 mt-8 tracking-tight font-medium">
          Please verify with world id to swap.
        </button>)
        : (<button disabled className="border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-14 mt-8 tracking-tight font-medium">
        Please connect wallet to start.
      </button>) }
      </div>
      {isTransactionSuccessModalVisible &&
      (<div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center text-white">
      <div className="bg-[#0c1c28] p-4 rounded-lg shadow-lg">
        <h3 className="text-lg font-bold">Transaction Succeeded</h3>
        <p>Your transaction has been processed successfully.</p>
        <button onClick={() => setIsTransactionSuccessModalVisible(false)} className="mt-4 px-4 py-2 bg-[#77f6b5] text-[#0c1c28] rounded">
          Close
        </button>
      </div>
    </div>)}

    </div>
  );
}
