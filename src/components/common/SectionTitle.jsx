import React from 'react';

const SectionTitle = ({ title, subtitle }) => {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
};

export default SectionTitle;
