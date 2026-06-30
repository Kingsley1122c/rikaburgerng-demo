import React from 'react';
import { FaStar } from 'react-icons/fa';

const RatingStars = ({ rating }) => {
  return (
    <span aria-label={`Rated ${rating} out of 5`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <FaStar color="#ffb703" aria-hidden="true" />
      <strong>{rating}</strong>
    </span>
  );
};

export default RatingStars;
