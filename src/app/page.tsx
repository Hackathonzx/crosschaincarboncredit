'use client';

import { useState } from 'react';
import { useConnect } from 'wagmi';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import WalletOverlay from '@/components/WalletOverlay';

// Styles
import styles from '@/styles/LandingPage.module.css';

const LandingPage = () => {
  const [isWalletOverlayOpen, setWalletOverlayOpen] = useState(false);
  const { connect, connectors } = useConnect();

  const handleWalletConnect = async () => {
    try {
      const connector = connectors[0]; // Simplified to use the first connector
      await connect({ connector });
      setWalletOverlayOpen(false);
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar onConnect={() => setWalletOverlayOpen(true)} />

      <HeroSection>
        <div className={styles.heroContent}>
          <h1>Carbon Credit Interoperability Platform</h1>
          <p>Advancing global sustainability through blockchain innovation</p>
        </div>
      </HeroSection>

      {isWalletOverlayOpen && (
        <WalletOverlay
          onClose={() => setWalletOverlayOpen(false)}
          onConnect={handleWalletConnect}
        />
      )}
    </div>
  );
};

export default LandingPage;