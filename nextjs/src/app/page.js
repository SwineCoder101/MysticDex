"use client";
import { Input } from "../components/ui/input";
import { IDKitWidget } from '@worldcoin/idkit';
import { useState } from 'react'
import { BigNumber } from 'ethers'
import { decode } from '../lib/wld'
import ContractAbi from '../abi/Contract.abi'
import { Account } from '../utils/account';
import { WalletOptions } from '../utils/wallet-options';
import { useAccount, useWriteContract } from 'wagmi';
import { ConnectKitButton } from 'connectkit';

// From IDEX contract
// function swap(bool zeroForOne, uint256 amountIn) external returns (uint256 amountOut);
// function addLiquidity(uint256 maxAmount0, uint256 maxAmount1) external returns(uint256 poolShares);
// function withdrawLiquidity(uint256 poolShares) external returns(uint256 amount0, uint256 amount1);


const onSuccess = () => {
    window.location.href = "/success";
};

export default function Home() {
  const { address } = useAccount();
  const [proof, setProof] = useState(null);
  const { writeContract } = useWriteContract()

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
      <div className="hidden md:flex border-b border-[#232d3c]">
        <div className="container text-white flex flex-row items-start justify-center space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16 ">
          <div className="flex flex-row space-x-2">
            <h2 className="text-3xl text-gray-200 tracking-wide">mysticDEX</h2>
          </div>
        </div>
      </div>

      <div className="container text-white text-center pt-20 w-[500px]">
        <div className="flex">
        <ConnectKitButton />
        {address ? (
				proof ? (
					<button onClick={write}>submit tx</button>
				) : (
					<IDKitWidget
            app_id="app_staging_7b0776cc7b74fd86dc87adac4792a7d6"
            action="swap"
            signal={address}            
            onSuccess={onSuccess}
					>
						{({ open }) => <button onClick={open} 
            className="mx-auto mb-10 hover:bg-[#1e2831] border border-[#1c2836] bg-[#0c1c28] p-2 tracking-tight font-medium">verify with world id</button>}
					</IDKitWidget>
				)
			) : (
				<ConnectKitButton />
			)}
        </div>
        <p className="mb-2" style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>
          Input Token:
        </p>
        <div className="flex flex-row space-x-2 relative">
  <input
    className="border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-6 hover:bg-[#1e2831] tracking-tight font-medium appearance-none w-full focus:outline-none"
    placeholder="Your value here"
    type="number"
  />
  <select
    className="border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-2 hover:bg-[#1e2831] tracking-tight font-medium absolute right-0 top-0 h-full"
  >
    <option value="ETH">ETH</option>
    <option value="USDC">USDC</option>
    <option value="ACHI">ACHI</option>
  </select>
</div>

      </div>

      <div className="container text-white text-center pt-12 w-[500px]">
        <p className="mb-2" style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>
          Output Token:
        </p>
        <div className="flex flex-row space-x-2 relative">
        <input
          className="border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-6 hover:bg-[#1e2831] tracking-tight font-medium appearance-none w-full focus:outline-none"
          placeholder="Your value here"
          type="number"
        />
        <select
          className="border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-2 hover:bg-[#1e2831] tracking-tight font-medium absolute right-0 top-0 h-full"
        >
            <option value="BTC">BTC</option>
            <option value="USDC">USDC</option>
            <option value="ACHI">ACHI</option>
          </select>
        </div>
      </div>
      <div className="container text-white text-center pt-12 w-[500px]">
        <p>Slippage: </p>
       {address != null && <p>Address: {address}</p>}
        <button className="border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-14 mt-8 hover:bg-[#1e2831] tracking-tight font-medium">
          SWAP
        </button>
      </div>
    </div>
  );
}
