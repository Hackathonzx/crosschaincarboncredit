// components/Navbar.tsx
import { useState } from 'react';
import styles from '@/styles/Navbar.module.css';
import { motion } from 'framer-motion';

interface NavbarProps {
  onConnectWallet: () => void;
  connectedWallet: string | null;
}

const Navbar = ({ onConnectWallet, connectedWallet }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.logo}>
        <img src="/logo.svg" alt="Carbon Credits Logo" />
        <span>Carbon Credits</span>
      </div>

      <div className={`${styles.navLinks} ${isMenuOpen ? styles.active : ''}`}>
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#marketplace">Marketplace</a>
        <a href="#docs">Documentation</a>
      </div>

      <div className={styles.authButtons}>
        {connectedWallet ? (
          <div className={styles.walletInfo}>
            <span>{`${connectedWallet.slice(0, 6)}...${connectedWallet.slice(-4)}`}</span>
          </div>
        ) : (
          <>
            <button 
              className={styles.connectWalletButton}
              onClick={onConnectWallet}
            >
              Connect 
            </button>
          </>
        )}
      </div>

      <button 
        className={styles.menuButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </motion.nav>
  );
};

export default Navbar;