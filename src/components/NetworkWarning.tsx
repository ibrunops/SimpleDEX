import React from 'react';

export function NetworkWarning() {
  return (
    <div className="text-center p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Wrong Network</h2>
      <p className="text-red-500 mb-4">Please switch to Sepolia testnet to continue</p>
    </div>
  );
}