
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CarbonCredit from '@/contracts/CarbonCredit.json';
import Marketplace from '@/contracts/Marketplace.json';
import ICMHandler from '@/contracts/ICMHandler.json';
import PriceOracle from '@/contracts/PriceOracle.json';

interface CarbonCredit {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface Transaction {
  id: number;
  from: string;
  to: string;
  amount: number;
  timestamp: number;
}


export default function Dashboard() {
  const [carbonCredits, setCarbonCredits] = useState<CarbonCredit[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedCredit, setSelectedCredit] = useState<CarbonCredit | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const carbonCreditContract = new ethers.Contract(
      CarbonCredit.address,
      CarbonCredit.abi,
      signer
    );
    const marketplaceContract = new ethers.Contract(
      Marketplace.address,
      Marketplace.abi,
      signer
    );
    const icmHandlerContract = new ethers.Contract(
      ICMHandler.address,
      ICMHandler.abi,
      signer
    );
    const priceOracleContract = new ethers.Contract(
      PriceOracle.address,
      PriceOracle.abi,
      signer
    );

    const fetchCarbonCredits = async () => {
      const credits = await carbonCreditContract.getCredits();
      setCarbonCredits(credits);
    };

    const fetchTransactions = async () => {
      const txs = await marketplaceContract.getTransactions();
      setTransactions(txs);
    };

    const fetchBalance = async () => {
      const bal = await carbonCreditContract.balanceOf(signer.getAddress());
      setBalance(bal);
    };

    const fetchPrice = async () => {
      const price = await priceOracleContract.getPrice();
      setPrice(price);
    };

    fetchCarbonCredits();
    fetchTransactions();
    fetchBalance();
    fetchPrice();
  }, []);

  const handleBuyCredit = async (credit: CarbonCredit) => {
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
  };

  const handleTransferCredit = async (credit: CarbonCredit, to: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const icmHandlerContract = new ethers.Contract(
      ICMHandler.address,
      ICMHandler.abi,
      signer
    );

    const tx = await icmHandlerContract.transferCredit(credit.id, to);
    await tx.wait();
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
                  className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleBuyCredit(credit)}
                >
                  Buy
                </button>
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
      {selectedCredit && (
        <div className="flex justify-center p-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Transfer Credit</h2>
            <p className="text-gray-600">Credit: {selectedCredit.name}</p>
            <input
              type="text"
              placeholder="To"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <button
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleTransferCredit(selectedCredit, '0x...')}
            >
              Transfer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
