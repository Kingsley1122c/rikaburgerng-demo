import React from 'react';
import { motion } from 'framer-motion';

const Reveal = ({ children, className = '', delay = 0, y = 24, as: Component = motion.div }) => {
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: 'easeOut' }}
    >
      {children}
    </Component>
  );
};

export default Reveal;
