import { FC, useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const HeroContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
  background: linear-gradient(
    135deg,
    rgba(10, 25, 47, 0.95) 0%,
    rgba(17, 34, 64, 0.95) 100%
  );
`;

const ContentContainer = styled.div`
  max-width: 800px;
  text-align: center;
  z-index: 2;
`;

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #8892b0;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CTAButton = styled(motion.button)`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

interface HeroSectionProps {
  onExploreClick?: () => void;
  children?: React.ReactNode;
}

const HeroSection: FC<HeroSectionProps> = ({ onExploreClick, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <HeroContainer ref={containerRef}>
      {children}
      <ContentContainer>
        <Title
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          Carbon Credit
          <br />
          Interoperability Platform
        </Title>
        
        <Subtitle
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          transition={{ delay: 0.2 }}
        >
          Revolutionizing sustainability through blockchain technology.
          Seamlessly trade and transfer carbon credits across multiple chains.
        </Subtitle>

        <CTAButton
          initial="hidden"
          animate="visible"
          variants={contentVariants}
          transition={{ delay: 0.4 }}
          onClick={onExploreClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Platform
        </CTAButton>
      </ContentContainer>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at center, transparent 0%, rgba(10, 25, 47, 0.5) 100%)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />
    </HeroContainer>
  );
};

export default HeroSection;