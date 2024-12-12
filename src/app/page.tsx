'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  useConnect,
  useDisconnect
} from 'wagmi';
import Button from '@/components/shared/Button';

// Components imports
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import InfoCards from '@/components/InfoCards';
import WalletOverlay from '@/components/WalletOverlay';

// Styles
import styles from '@/styles/LandingPage.module.css';

const LandingPage = () => {
  const [isWalletOverlayOpen, setWalletOverlayOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [isSignInOverlayOpen, setSignInOverlayOpen] = useState(false);
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleWalletConnect = async (walletType: string) => {
    try {
      const connector = connectors.find(c => c.id === walletType);
      if (!connector) {
        throw new Error('Wallet not found');
      }
      
      await connect({ connector });
      setConnectedWallet(walletType);
      setWalletOverlayOpen(false);
    } catch (error) {
      console.error('Wallet connection error:', error);
    }
  };

  const handleSignIn = (method: string) => {
    // Dummy sign-in logic
    console.log(`Signing in with ${method}`);
    setSignInOverlayOpen(false);
  };

  return (
    <div className={styles.container}>
      <Navbar 
        onConnectWallet={() => setWalletOverlayOpen(true)}
        connectedWallet={connectedWallet}
      />

      <Button onClick={() => setSignInOverlayOpen(true)}>Sign In</Button>

      {isSignInOverlayOpen && (
        <div className={styles.overlay}>
          <div className={styles.overlayContent}>
            <h2>Sign In</h2>
            <Button onClick={() => handleSignIn('GitHub')}>Sign in with GitHub</Button>
            <Button onClick={() => handleSignIn('Wallet')}>Sign in with Wallet</Button>
            <Button onClick={() => setSignInOverlayOpen(false)}>Close</Button>
          </div>
        </div>
      )}

      <HeroSection />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <h1>Carbon Credit Interoperability Platform</h1>
          <p>Advancing global sustainability through blockchain innovation</p>
        </motion.div>

      <AboutSection>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={styles.aboutContent}
        >
          <h2>About Our Platform</h2>
          <p>A decentralized infrastructure for tokenizing, trading, and transferring carbon credits across Avalanche blockchain subnets.</p>
        </motion.div>
      </AboutSection>

      <InfoCards>
        {[
          {
            title: "Carbon Credit Tokenization",
            description: "ERC20 tokens enabling standardized trading and tracking",
          },
          {
            title: "Decentralized Marketplace",
            description: "Robust platform for listing, buying, and selling carbon credits",
          },
          {
            title: "Cross-Chain Transfers",
            description: "Transfer carbon credits between Avalanche subnets",
          }
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={styles.infoCard}
          >
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </motion.div>
        ))}
      </InfoCards>

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