// components/WalletOverlay.tsx
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../styles/WalletOverlay.module.css';

interface WalletOverlayProps {
  onClose: () => void;
  onConnect: (walletType: string) => void;
}

const WalletOverlay = ({ onClose, onConnect }: WalletOverlayProps) => {
  const wallets = [
    {
      name: 'MetaMask',
      icon: '/icons/metamask.svg',
      type: 'metamask'
    },
    {
      name: 'Trust Wallet',
      icon: '/icons/trustwallet.svg',
      type: 'trustwallet'
    },
    {
      name: 'Coinbase',
      icon: '/icons/coinbase.svg',
      type: 'coinbase'
    }
  ];

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.modal}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
        >
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
          <h2>Connect Wallet</h2>
          <div className={styles.walletOptions}>
            {wallets.map((wallet) => (
              <button
                key={wallet.type}
                className={styles.walletButton}
                onClick={() => onConnect(wallet.type)}
              >
                <img src={wallet.icon} alt={wallet.name} />
                <span>{wallet.name}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default WalletOverlay;