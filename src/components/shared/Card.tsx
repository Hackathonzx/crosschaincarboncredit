import React from 'react';
import styles from '@/styles/Card.module.css';

interface CardProps {
  title: string;
  description: string;
  icon: string;
}

const Card: React.FC<CardProps> = ({ title, description, icon }) => {
  return (
    <div className={styles.card}>
      <div className={styles.icon}>
        <img src={`/icons/${icon}`} alt={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default Card;
