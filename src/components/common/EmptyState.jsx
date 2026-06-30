import React from 'react';

const EmptyState = ({ title, description, action }) => {
  return (
    <div className="empty-state" role="status" aria-live="polite">
      <h2>{title}</h2>
      <p>{description}</p>
      {action ? <div className="empty-state-action">{action}</div> : null}
    </div>
  );
};

export default EmptyState;
