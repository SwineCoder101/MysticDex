"use client";
import { Input } from "../components/ui/input";
import { IDKitWidget } from '@worldcoin/idkit';
import { useState } from 'react';
import { BigNumber } from 'ethers';
import { decode }from '../lib/wld';
import DexAbi from '../abi/DEX.abi';
import ContractAbi from '../abi/Contract.abi';
import { Account } from '../utils/account';
import { WalletOptions } from '../utils/wallet-options';
import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { ConnectKitButton } from 'connectkit';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
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
  const { address } = useAccount();
  const [proof, setProof] = useState(null);
  const { writeContract } = useWriteContract()
  const [verified, setVerified] = useState(true);
  const [displayModal, setDisplayModal] = useState(false);
  const [balance, setBalance] = useState(null);

  const onSuccess = () => {
    setVerified(true);
  };

  const { data, isError, isLoading } = useReadContract({
    DexAbi,
    functionName: 's_liquidity0',
    args: [''],
  });

  // Example function to handle reading balance
  function handleReadContract() {
    console.log('reading...')
    console.log(data)
    if (data) {
      console.log(data);
      setBalance(data); // Assuming `data` contains the balance you're interested in
    }
  }
    
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

  return (
    <div
      className="h-screen bg-[#0f181f]"
      style={{ fontFamily: "var(--font-roboto-mono), monospace" }}
    >
      {address ? (
				proof ? (<></>) : ( <div className="hidden md:flex border-b border-[#232d3c]">
        <div className="container text-white flex flex-row items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16 ">
          <div className="flex flex-row space-x-2">
            <h2 className="text-3xl text-gray-200 tracking-wide">mysticDEX</h2>
            
          </div>
          <div>
          <ConnectKitButton />
          </div>
        </div>
      </div>) ):  <div className="hidden md:flex border-b border-[#232d3c]">
        <div className="container text-white flex flex-row items-start justify-center space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16 ">
          <div className="flex flex-row space-x-2">
            <h2 className="text-3xl text-gray-200 tracking-wide">mysticDEX</h2>
            
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
  />
  <select
    className={`focus:outline-none border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-2 tracking-tight font-medium absolute right-0 top-0 h-full ${verified ? 'hover:bg-[#1e2831]' : ''}`}
    disabled={!verified}
    onChange={handleReadContract}
  >
    <option value="ETH">ETH</option>
    <option value="USDC">USDC</option>
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
        />
          <select
            className={`focus:outline-none border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-2 tracking-tight font-medium absolute right-0 top-0 h-full ${verified ? 'hover:bg-[#1e2831]' : ''}`}
            disabled={!verified}
          >
            <option value="BTC">BTC</option>
            <option value="USDC">USDC</option>
            <option value="SOL">SOL</option>
          </select>
        </div>
      </div>
      <div className="container text-white text-center pt-12 w-[500px]">
        
       {address != null && verified === true && (<p className="text-sm">Slippage: <i>Please input a token value.</i></p>) }
       {address != null ? verified === true ?
        (<motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border text-md border-[#1c2836] text-[21px] bg-[#77f6b5] text-[#0c1c28] py-2 px-14 mt-8 tracking-tight font-medium">
          SWAP
        </motion.button>) : (<button disabled className="border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-14 mt-8 tracking-tight font-medium">
          Please verify with world id to swap.
        </button>)
        : (<button disabled className="border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-14 mt-8 tracking-tight font-medium">
        Please connect wallet to start.
      </button>) }
      </div>
    </div>
  );
}
