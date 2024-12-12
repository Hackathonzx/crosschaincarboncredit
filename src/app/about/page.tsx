'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

const AboutPage = () => {
  const [isWalletOverlayOpen, setWalletOverlayOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navbar onConnect={() => setWalletOverlayOpen(true)} />
      
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          About Us
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="group rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Our Vision</h2>
            <p className="text-gray-300">To facilitate a seamless, transparent, and scalable marketplace for carbon credits by leveraging blockchain interoperability, thereby advancing global sustainability efforts.</p>
          </div>

          <div className="group rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Key Features</h2>
            <ul className="space-y-2 text-gray-300">
              {[
                'Carbon Credit Tokenization',
                'Decentralized Marketplace',
                'Cross-Chain Transfers',
                'Oracle Integration',
                'Modular and Scalable Architecture'
              ].map((feature) => (
                <li key={feature} className="flex items-center">
                  <span className="h-2 w-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
