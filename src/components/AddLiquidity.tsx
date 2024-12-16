import React from 'react';
import { Plus } from 'lucide-react';
import { TokenInput } from './TokenInput';

interface AddLiquidityProps {
  tokenAAmount: string;
  tokenBAmount: string;
  setTokenAAmount: (value: string) => void;
  setTokenBAmount: (value: string) => void;
  onAddLiquidity: () => Promise<void>;
  loading: boolean;
}

export function AddLiquidity({
  tokenAAmount,
  tokenBAmount,
  setTokenAAmount,
  setTokenBAmount,
  onAddLiquidity,
  loading
}: AddLiquidityProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Add Liquidity</h2>
      <div className="space-y-4">
        <TokenInput
          value={tokenAAmount}
          onChange={setTokenAAmount}
          placeholder="Token A Amount"
        />
        <TokenInput
          value={tokenBAmount}
          onChange={setTokenBAmount}
          placeholder="Token B Amount"
        />
        <button
          onClick={onAddLiquidity}
          disabled={loading || !tokenAAmount || !tokenBAmount}
          className="w-full bg-blue-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-blue-600 disabled:opacity-50"
        >
          <Plus size={20} /> Add Liquidity
        </button>
      </div>
    </div>
  );
}