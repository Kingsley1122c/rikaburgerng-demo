import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import './QuantitySelector.css';

const QuantitySelector = ({ value, onChange, min = 1, max = 20, label = 'Quantity' }) => {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className="qty-selector" role="group" aria-label={label}>
      <button type="button" onClick={decrease} aria-label="Decrease quantity">
        <FiMinus />
      </button>
      <span aria-live="polite">{value}</span>
      <button type="button" onClick={increase} aria-label="Increase quantity">
        <FiPlus />
      </button>
    </div>
  );
};

export default QuantitySelector;
