import React, { useState } from 'react';
import { useEthereum } from '../hooks/useEthereum';
import { useDexContract } from '../hooks/useDexContract';
import { WalletConnection } from './WalletConnection';
import { NetworkWarning } from './NetworkWarning';
import { AddLiquidity } from './AddLiquidity';
import { RemoveLiquidity } from './RemoveLiquidity';
import { SwapInterface } from './SwapInterface';
import { ethers } from 'ethers';
import { RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export function DexInterface() {
  const { account, provider, signer, connectWallet, isCorrectNetwork } = useEthereum();
  const { getContract, handleTransaction } = useDexContract(provider, signer);
  
  const [tokenAAmount, setTokenAAmount] = useState('');
  const [tokenBAmount, setTokenBAmount] = useState('');
  const [lpAmount, setLpAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const executeTransaction = async (operation: () => Promise<any>) => {
    if (!isCorrectNetwork) {
      toast.error('Please switch to Sepolia network');
      return;
    }
    
    if (!signer) {
      toast.error('Please connect your wallet');
      return;
    }
    
    setLoading(true);
    try {
      await handleTransaction(operation);
    } finally {
      setLoading(false);
    }
  };

  const addLiquidity = async () => {
    const contract = await getContract();
    if (!contract) return;
    
    await executeTransaction(async () => 
      contract.addLiquidity(
        ethers.parseEther(tokenAAmount || '0'),
        ethers.parseEther(tokenBAmount || '0')
      )
    );
  };

  const removeLiquidity = async () => {
    const contract = await getContract();
    if (!contract) return;
    
    await executeTransaction(async () => 
      contract.removeLiquidity(ethers.parseEther(lpAmount || '0'))
    );
  };

  const swapAForB = async () => {
    const contract = await getContract();
    if (!contract) return;
    
    await executeTransaction(async () => 
      contract.swapAForB(ethers.parseEther(tokenAAmount || '0'))
    );
  };

  const swapBForA = async () => {
    const contract = await getContract();
    if (!contract) return;
    
    await executeTransaction(async () => 
      contract.swapBForA(ethers.parseEther(tokenBAmount || '0'))
    );
  };

  const getPrice = async () => {
    const contract = await getContract();
    if (!contract) return;
    
    try {
      const tokenAAddress = await contract.tokenA();
      const price = await contract.getPrice(tokenAAddress);
      toast.success(`Price: ${ethers.formatEther(price)} ETH`);
    } catch (error: any) {
      toast.error(error.reason || error.message || 'Failed to get price');
    }
  };

  if (!account) {
    return <WalletConnection connectWallet={connectWallet} />;
  }

  if (!isCorrectNetwork) {
    return <NetworkWarning />;
  }

  return (
    <div className="max-w-lg mx-auto p-6 space-y-6">
      <AddLiquidity
        tokenAAmount={tokenAAmount}
        tokenBAmount={tokenBAmount}
        setTokenAAmount={setTokenAAmount}
        setTokenBAmount={setTokenBAmount}
        onAddLiquidity={addLiquidity}
        loading={loading}
      />

      <RemoveLiquidity
        lpAmount={lpAmount}
        setLpAmount={setLpAmount}
        onRemoveLiquidity={removeLiquidity}
        loading={loading}
      />

      <SwapInterface
        onSwapAForB={swapAForB}
        onSwapBForA={swapBForA}
        loading={loading}
        hasTokenAmount={!!tokenAAmount || !!tokenBAmount}
      />

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Get Price</h2>
        <div className="space-y-4">
          <button
            onClick={getPrice}
            disabled={loading}
            className="w-full bg-purple-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-purple-600 disabled:opacity-50"
          >
            <RefreshCw size={20} /> Get Token Price
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-500 text-center">
        Connected Account: {account.slice(0, 6)}...{account.slice(-4)}
      </div>
    </div>
  );
}