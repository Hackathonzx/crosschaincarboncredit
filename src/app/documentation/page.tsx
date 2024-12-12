'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import styles from '@/styles/LandingPage.module.css';

const DocumentationPage = () => {
  const [isWalletOverlayOpen, setWalletOverlayOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Navbar onConnect={() => setWalletOverlayOpen(true)} />
      <div className={styles.content}>
        <h1 className={styles.title}>Documentation</h1>
        <div className={styles.sidebar}>
          <ul className={styles.list}>
            <li>Introduction</li>
            <li>Getting Started</li>
            <li>API Reference</li>
            <li>Examples</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className={styles.text}>
          <p>Welcome to the Carbon Credit Interoperability Platform documentation. Here you will find all the information you need to get started and use our platform.</p>
          <a href="https://github.com/your-repo" className={styles.githubButton}>View on GitHub</a>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;
