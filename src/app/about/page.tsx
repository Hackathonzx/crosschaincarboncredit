'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import styles from '@/styles/LandingPage.module.css';

const AboutPage = () => {
  const [isWalletOverlayOpen, setWalletOverlayOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Navbar onConnect={() => setWalletOverlayOpen(true)} />
      <div className={styles.content}>
        <h1 className={styles.title}>About Us</h1>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2 className={styles.subtitle}>Our Vision</h2>
            <p className={styles.text}>To facilitate a seamless, transparent, and scalable marketplace for carbon credits by leveraging blockchain interoperability, thereby advancing global sustainability efforts.</p>
          </div>
          <div className={styles.card}>
            <h2 className={styles.subtitle}>Key Features</h2>
            <ul className={styles.list}>
              <li>Carbon Credit Tokenization</li>
              <li>Decentralized Marketplace</li>
              <li>Cross-Chain Transfers</li>
              <li>Oracle Integration</li>
              <li>Modular and Scalable Architecture</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
