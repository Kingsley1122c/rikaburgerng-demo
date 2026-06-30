import React from 'react';

const Loader = ({ label = 'Loading...' }) => {
  return (
    <div className="loader" role="status" aria-live="polite" aria-label={label}>
      <div className="loader-spinner" aria-hidden="true" />
      <span className="visually-hidden">{label}</span>
    </div>
  );
};

export default Loader;
