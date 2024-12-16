import { ethers } from 'ethers';
import { SIMPLE_DEX_ADDRESS, SIMPLE_DEX_ABI } from '../contracts/SimpleDEX';
import toast from 'react-hot-toast';

export function useDexContract(
  provider: ethers.BrowserProvider | null,
  signer: ethers.JsonRpcSigner | null
) {
  const getContract = async () => {
    if (!provider || !signer) return null;
    try {
      return new ethers.Contract(SIMPLE_DEX_ADDRESS, SIMPLE_DEX_ABI, signer);
    } catch (error) {
      console.error('Error getting contract:', error);
      return null;
    }
  };

  const handleTransaction = async (operation: () => Promise<any>) => {
    if (!signer) {
      toast.error('Please connect your wallet');
      return false;
    }

    try {
      const loadingToast = toast.loading('Transaction pending...');
      const tx = await operation();
      toast.loading('Waiting for confirmation...', { id: loadingToast });
      await tx.wait();
      toast.dismiss(loadingToast);
      toast.success('Transaction successful!');
      return true;
    } catch (error: any) {
      console.error('Transaction error:', error);
      const errorMessage = error.reason || 
                          error.message || 
                          (error.data?.message || '').replace('execution reverted: ', '') || 
                          'Transaction failed';
      toast.error(errorMessage);
      return false;
    }
  };

  return {
    getContract,
    handleTransaction
  };
}