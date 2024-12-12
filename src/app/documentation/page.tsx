'use client';

import Navbar from '@/components/Navbar';
import styles from '@/styles/DocumentationPage.module.css';

const DocumentationPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.sidebar}>
        <ul>
          <li>Introduction</li>
          <li>Getting Started</li>
          <li>API Reference</li>
          <li>Examples</li>
          <li>FAQ</li>
        </ul>
      </div>
      <div className={styles.content}>
        <h1>Documentation</h1>
        <p>Welcome to the Carbon Credit Interoperability Platform documentation. Here you will find all the information you need to get started and use our platform.</p>
        <a href="https://github.com/your-repo" className={styles.githubButton}>View on GitHub</a>
      </div>
    </div>
  );
};

export default DocumentationPage;
