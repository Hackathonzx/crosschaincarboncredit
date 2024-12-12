'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

const DocumentationPage = () => {
  const [isWalletOverlayOpen, setWalletOverlayOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Navbar onConnect={() => setWalletOverlayOpen(true)} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {['Introduction', 'Getting Started', 'API Reference', 'Examples', 'FAQ'].map((item) => (
                <button key={item}
                  className="w-full text-left px-4 py-2 rounded-lg bg-gradient-to-r hover:from-yellow-400/20 hover:to-orange-500/20 transition-all duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-3 space-y-8">
            <h1 className="text-5xl font-bold mb-16 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Documentation
            </h1>
            
            <div className="grid gap-8">
              {['Introduction', 'Getting Started', 'API Reference'].map((section) => (
                <div key={section}
                     className="group rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-2xl font-bold mb-4 text-yellow-400">{section}</h2>
                  <p className="text-gray-300">Comprehensive guide for this section...</p>
                </div>
              ))}
            </div>

            <a href="https://github.com/Hackathonzx/crosschaincarboncredit" 
               className="block w-full max-w-md mx-auto text-center px-8 py-4 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:-translate-y-1">
              View on GitHub
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentationPage;
