'use client';

import Navbar from '@/components/Navbar';
import styles from '@/styles/MarketplacePage.module.css';

const MarketplacePage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        <h1>Marketplace</h1>
        <div className={styles.cards}>
          <div className={styles.card}>
            <h2>Carbon Credit 1</h2>
            <p>Details about Carbon Credit 1</p>
          </div>
          <div className={styles.card}>
            <h2>Carbon Credit 2</h2>
            <p>Details about Carbon Credit 2</p>
          </div>
          <div className={styles.card}>
            <h2>Carbon Credit 3</h2>
            <p>Details about Carbon Credit 3</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;