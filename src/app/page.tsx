'use client';

// pages/landing-page.tsx
import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { 
  useConnect,
  useDisconnect
} from 'wagmi';
import Button from '@/components/shared/Button';
import '@/types/three-types';

// Components imports
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import InfoCards from '@/components/InfoCards';
import CarbonModel from '@/components/3d/CarbonModel';
import WalletOverlay from '@/components/WalletOverlay';

// Styles
import styles from '@/styles/LandingPage.module.css';

// 3D Model Component
const CarbonCreditsModel: React.FC = () => {
  const { scene } = useGLTF('/models/carbon_credits.glb') as { scene: Object3D };
  return <primitive object={scene} />;
};

useGLTF.preload('/models/carbon_credits.glb');

const LandingPage = () => {
  const [isWalletOverlayOpen, setWalletOverlayOpen] = useState(false);
  const [connectedWallet, setConnectedWallet] = useState(null);
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

      <HeroSection>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.heroContent}
        >
          <h1>Carbon Credit Interoperability Platform</h1>
          <p>Advancing global sustainability through blockchain innovation</p>
          
          <div className={styles.hero3DContainer}>
            <Canvas>
              <Suspense fallback={null}>
                <Environment preset="sunset" />
                <OrbitControls enableZoom={false} />
                <CarbonCreditsModel />
              </Suspense>
            </Canvas>
          </div>
        </motion.div>
      </HeroSection>

      <AboutSection>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={styles.aboutContent}
        >
          <h2>About Our Platform</h2>
          <p>A decentralized infrastructure for tokenizing, trading, and transferring carbon credits across Avalanche blockchain subnets.</p>
          
          <div className={styles.features3DContainer}>
            <Canvas>
              <Suspense fallback={null}>
                <CarbonModel />
                <OrbitControls enableZoom={false} />
              </Suspense>
            </Canvas>
          </div>
        </motion.div>
      </AboutSection>

      <InfoCards>
        {[
          {
            title: "Carbon Credit Tokenization",
            description: "ERC20 tokens enabling standardized trading and tracking",
            icon: "tokenization.glb"
          },
          {
            title: "Decentralized Marketplace",
            description: "Robust platform for listing, buying, and selling carbon credits",
            icon: "marketplace.glb"
          },
          {
            title: "Cross-Chain Transfers",
            description: "Transfer carbon credits between Avalanche subnets",
            icon: "transfer.glb"
          }
        ].map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={styles.infoCard}
          >
            <div className={styles.cardModel}>
              <Canvas>
                <Suspense fallback={null}>
                  <Environment preset="sunset" />
                  <OrbitControls enableZoom={false} />
                  {/* Load respective 3D model based on card */}
                </Suspense>
              </Canvas>
            </div>
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