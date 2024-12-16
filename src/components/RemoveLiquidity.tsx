import React from 'react';
import { Minus } from 'lucide-react';
import { TokenInput } from './TokenInput';

interface RemoveLiquidityProps {
  lpAmount: string;
  setLpAmount: (value: string) => void;
  onRemoveLiquidity: () => Promise<void>;
  loading: boolean;
}

export function RemoveLiquidity({
  lpAmount,
  setLpAmount,
  onRemoveLiquidity,
  loading
}: RemoveLiquidityProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Remove Liquidity</h2>
      <div className="space-y-4">
        <TokenInput
          value={lpAmount}
          onChange={setLpAmount}
          placeholder="LP Token Amount"
        />
        <button
          onClick={onRemoveLiquidity}
          disabled={loading || !lpAmount}
          className="w-full bg-red-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-red-600 disabled:opacity-50"
        >
          <Minus size={20} /> Remove Liquidity
        </button>
      </div>
    </div>
  );
}