import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHamburger } from 'react-icons/fa';
import './Hero.css';
import Container from './common/Container';
import Button from './ui/Button';
import { ROUTES } from '../constants/routes';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const iconVariants = {
    hidden: { scale: 0.5, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  return (
    <motion.section
      className="hero-section"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Container className="hero-shell">
        <div className="hero-content">
          <motion.h1 variants={itemVariants}>The Ultimate Burger Experience</motion.h1>
          <motion.p variants={itemVariants}>
            Crafted with 100% pure beef, fresh ingredients, and a touch of magic.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button as={Link} to={ROUTES.MENU} className="cta-button" aria-label="Explore our menu">
              ORDER NOW
            </Button>
          </motion.div>
        </div>
        <div className="hero-image-container" aria-hidden="true">
          <motion.div variants={iconVariants}>
            <FaHamburger className="hero-image-placeholder" />
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
};

export default Hero;
