import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import toast from 'react-hot-toast';

const SEPOLIA_CHAIN_ID = '0xaa36a7';

export function useEthereum() {
  const [account, setAccount] = useState<string>('');
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false);

  const checkNetwork = async (provider: ethers.BrowserProvider) => {
    try {
      const network = await provider.getNetwork();
      const isCorrect = network.chainId === BigInt(parseInt(SEPOLIA_CHAIN_ID, 16));
      setIsCorrectNetwork(isCorrect);
      if (!isCorrect) {
        toast.error('Please switch to Sepolia testnet');
        await switchToSepolia();
      }
      return isCorrect;
    } catch (error) {
      console.error('Error checking network:', error);
      return false;
    }
  };

  const switchToSepolia = async () => {
    if (!window.ethereum) return;
    
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    } catch (error: any) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: SEPOLIA_CHAIN_ID,
              chainName: 'Sepolia Testnet',
              nativeCurrency: {
                name: 'Sepolia ETH',
                symbol: 'SEP',
                decimals: 18
              },
              rpcUrls: ['https://rpc.sepolia.org'],
              blockExplorerUrls: ['https://sepolia.etherscan.io']
            }]
          });
        } catch (addError) {
          console.error('Error adding Sepolia network:', addError);
        }
      }
    }
  };

  const initializeSigner = async (provider: ethers.BrowserProvider) => {
    try {
      const signer = await provider.getSigner();
      setSigner(signer);
      return signer;
    } catch (error) {
      console.error('Error getting signer:', error);
      return null;
    }
  };

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        try {
          const accounts = await provider.send("eth_requestAccounts", []);
          setAccount(accounts[0]);
          await checkNetwork(provider);
          await initializeSigner(provider);

          window.ethereum.on('accountsChanged', async (accounts: string[]) => {
            setAccount(accounts[0]);
            await initializeSigner(provider);
          });

          window.ethereum.on('chainChanged', () => {
            window.location.reload();
          });
        } catch (error) {
          console.error("User denied account access");
        }
      } else {
        toast.error("Please install MetaMask!");
      }
    };

    init();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  const connectWallet = async () => {
    if (provider) {
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
        await checkNetwork(provider);
        await initializeSigner(provider);
      } catch (error) {
        console.error("User denied account access");
        toast.error("Please connect your wallet");
      }
    }
  };

  return { 
    account, 
    provider,
    signer, 
    connectWallet,
    isCorrectNetwork 
  };
}