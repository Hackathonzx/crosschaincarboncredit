'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

const MarketplacePage = () => {
  const [isWalletOverlayOpen, setWalletOverlayOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navbar onConnect={() => setWalletOverlayOpen(true)} />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Carbon Credit Marketplace
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((item) => (
            <div key={item} 
                 className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <h2 className="text-2xl font-bold mb-4 text-yellow-400">Carbon Credit {item}</h2>
              <p className="text-gray-300 mb-4">Premium carbon credit package with verified impact metrics</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-orange-400">10.5 CC</span>
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300">
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MarketplacePage;
