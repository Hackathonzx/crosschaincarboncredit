'use client';

import Navbar from '@/components/Navbar';
import styles from '@/styles/AboutPage.module.css';

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h1>About Us</h1>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Our Vision</h2>
            <p>To facilitate a seamless, transparent, and scalable marketplace for carbon credits by leveraging blockchain interoperability, thereby advancing global sustainability efforts.</p>
          </div>
          <div className={styles.card}>
            <h2>Key Features</h2>
            <ul>
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
