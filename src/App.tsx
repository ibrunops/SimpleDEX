import React from 'react';
import { DexInterface } from './components/DexInterface';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">SimpleDEX Interface</h1>
        <DexInterface />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;