import React from 'react';
import { ArrowRightLeft } from 'lucide-react';

interface SwapInterfaceProps {
  onSwapAForB: () => Promise<void>;
  onSwapBForA: () => Promise<void>;
  loading: boolean;
  hasTokenAmount: boolean;
}

export function SwapInterface({
  onSwapAForB,
  onSwapBForA,
  loading,
  hasTokenAmount
}: SwapInterfaceProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Swap Tokens</h2>
      <div className="space-y-4">
        <button
          onClick={onSwapAForB}
          disabled={loading || !hasTokenAmount}
          className="w-full bg-green-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-green-600 disabled:opacity-50"
        >
          <ArrowRightLeft size={20} /> Swap A for B
        </button>
        <button
          onClick={onSwapBForA}
          disabled={loading || !hasTokenAmount}
          className="w-full bg-green-500 text-white p-2 rounded flex items-center justify-center gap-2 hover:bg-green-600 disabled:opacity-50"
        >
          <ArrowRightLeft size={20} /> Swap B for A
        </button>
      </div>
    </div>
  );
}