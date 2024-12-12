'use client';

import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

interface CarbonCredit {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
}

interface Transaction {
  id: number;
  from: string;
  to: string;
  amount: string;
  timestamp: string;
}

const CarbonCredit = {
  address: '0x...',
  abi: [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "spender",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    // ... (rest of your CarbonCredit ABI)
  ],
};

const Marketplace = {
  address: '0x...',
  abi: [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "seller",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "MarketTransaction",
      "type": "event"
    },
    // ... (rest of your Marketplace ABI)
  ],
};

const ICMHandler = {
  address: '0x...',
  abi: [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        },
        {
          "internalType": "address",
          "name": "toAddress",
          "type": "address"
        }
      ],
      "name": "transferCredit",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    // ... (rest of your ICMHandler ABI)
  ],
};

const PriceOracle = {
  address: '0x...',
  abi: [
    // ... (Your PriceOracle ABI here)
  ],
};

const dummyCarbonCredits = [
  { id: 1, name: 'Credit A', description: 'Description A', price: '0.1', quantity: 100 },
  { id: 2, name: 'Credit B', description: 'Description B', price: '0.2', quantity: 200 },
];

const dummyTransactions = [
  { id: 1, from: '0x123', to: '0x456', amount: '0.1', timestamp: '2023-01-01' },
  { id: 2, from: '0x789', to: '0xabc', amount: '0.2', timestamp: '2023-01-02' },
];

export default function Dashboard() {
  const [carbonCredits, setCarbonCredits] = useState<CarbonCredit[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedCredit, setSelectedCredit] = useState<CarbonCredit | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const [transferTo, setTransferTo] = useState('');
  const [buyStatus, setBuyStatus] = useState('');
  const [transferStatus, setTransferStatus] = useState('');

  useEffect(() => {
    // Use dummy data instead of fetching from blockchain
    setCarbonCredits(dummyCarbonCredits);
    setTransactions(dummyTransactions);
    setBalance(1.0);
    setPrice(0.1);
  }, []);

  const handleBuyCredit = async (credit: CarbonCredit) => {
    setIsLoading(true);
    setBuyStatus('Buying...');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const marketplaceContract = new ethers.Contract(
      Marketplace.address,
      Marketplace.abi,
      signer
    );

    const tx = await marketplaceContract.buyCredit(credit.id, {
      value: ethers.utils.parseEther(credit.price.toString()),
    });

    await tx.wait();
    setIsLoading(false);
    setBuyStatus('Credit bought successfully!');
  };

  const handleTransferCredit = async (credit: CarbonCredit, to: string) => {
    setIsLoading(true);
    setTransferStatus('Transferring...');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const icmHandlerContract = new ethers.Contract(
      ICMHandler.address,
      ICMHandler.abi,
      signer
    );

    const tx = await icmHandlerContract.transferCredit(credit.id, to);
    await tx.wait();
    setIsLoading(false);
    setTransferStatus(`Credit transferred to ${to} successfully!`);
    setTransferTo('');
  };

  return (
    <div className="h-screen bg-gray-100">
      {/* Header */}
      <div className="py-4 bg-yellow-500 text-white text-center text-3xl font-bold">
        Carbon Credit Interoperability Platform
      </div>

      {/* Main Content */}
      <div className="flex justify-center p-4">
        {/* Carbon Credits */}
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Carbon Credits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {carbonCredits.map((credit) => (
              <div key={credit.id} className="bg-gray-200 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">{credit.name}</h3>
                <p className="text-gray-600">{credit.description}</p>
                <p className="text-gray-600">Price: {credit.price} ETH</p>
                <p className="text-gray-600">Quantity: {credit.quantity}</p>
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                  onClick={() => handleBuyCredit(credit)}
                  disabled={isLoading}
                >
                  {isLoading && buyStatus === 'Buying...' ? 'Buying...' : 'Buy'}
                </button>
                {buyStatus && <p className="text-green-500 mt-2">{buyStatus}</p>}
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Transactions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {transactions.map((tx) => (
              <div key={tx.id} className="bg-gray-200 p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">Transaction {tx.id}</h3>
                <p className="text-gray-600">From: {tx.from}</p>
                <p className="text-gray-600">To: {tx.to}</p>
                <p className="text-gray-600">Amount: {tx.amount} ETH</p>
                <p className="text-gray-600">Timestamp: {tx.timestamp}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Balance and Price */}
      <div className="flex justify-center p-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Balance and Price</h2>
          <p className="text-gray-600">Balance: {balance} ETH</p>
          <p className="text-gray-600">Price: {price} ETH</p>
        </div>
      </div>

      {/* Transfer Credit */}
      <div className="flex justify-center p-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Transfer Credit</h2>
          <input
            type="text"
            placeholder="Recipient Address"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            value={transferTo}
            onChange={(e) => setTransferTo(e.target.value)}
          />
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            onClick={() => handleTransferCredit(carbonCredits[0], transferTo)}
            disabled={isLoading || !transferTo}
          >
            {isLoading && transferStatus === 'Transferring...' ? 'Transferring...' : 'Transfer'}
          </button>
          {transferStatus && <p className="text-green-500 mt-2">{transferStatus}</p>}
        </div>
      </div>
    </div>
  );
}
