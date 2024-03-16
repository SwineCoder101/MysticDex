"use client";
import { Input } from "@/components/ui/input";
import { IDKitWidget, VerificationLevel, ISuccessResult } from "@worldcoin/idkit";

// const { address } = useAddress()

const handleVerify = async (proof) => {
  console.log("Proof received from IDKit:\n", JSON.stringify(proof))
  const res = await fetch("/api/verify", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(proof),
  })
  if (!res.ok) {
      throw new Error("Verification failed.");
  }
};

const onSuccess = () => {
    window.location.href = "/success";
};

export default function Home() {
  // const [proof, setProof] = useState()
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
          <IDKitWidget
            app_id="app_staging_86db89ba718bfb4426194c6e88254a62"
            action="test"
            verification_level={VerificationLevel.Orb}
            handleVerify={handleVerify}
            onSuccess={onSuccess}
          >
            {({ open }) => <button className="mx-auto mb-10 hover:bg-[#1e2831] border border-[#1c2836] bg-[#0c1c28] p-2 tracking-tight font-medium" onClick={open}>Verify with World ID</button>}
          </IDKitWidget>
        </div>
        <p style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>
          Input Token:
        </p>
        <div className="flex flex-row space-x-2">
          <Input></Input>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
            <option value="ETH">ETH</option>
            <option value="USDC">USDC</option>
            <option value="ACHI">ACHI</option>
          </select>
        </div>
      </div>

      <div className="container text-white text-center pt-12 w-[500px]">
        <p style={{ fontFamily: "var(--font-roboto-mono), monospace" }}>
          Output Token:
        </p>
        <div className="flex flex-row space-x-2">
          <Input></Input>
          <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
            <option value="BTC">BTC</option>
            <option value="USDC">USDC</option>
            <option value="ACHI">ACHI</option>
          </select>
        </div>
      </div>
      <div className="container text-white text-center pt-12 w-[500px]">
        <p>Slippage: </p>

        <button className="border text-md border-[#1c2836] bg-[#0c1c28] py-2 px-14 mt-8 hover:bg-[#1e2831] tracking-tight font-medium">
          SWAP
        </button>
      </div>
    </div>
  );
}
