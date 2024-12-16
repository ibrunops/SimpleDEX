import React from 'react';
import { Wallet } from 'lucide-react';

interface WalletConnectionProps {
  connectWallet: () => Promise<void>;
}

export function WalletConnection({ connectWallet }: WalletConnectionProps) {
  return (
    <div className="text-center p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Welcome to SimpleDEX</h2>
      <p className="text-gray-600 mb-6">Connect your wallet to start trading</p>
      <button
        onClick={connectWallet}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 mx-auto"
      >
        <Wallet size={20} />
        Connect Wallet
      </button>
    </div>
  );
}