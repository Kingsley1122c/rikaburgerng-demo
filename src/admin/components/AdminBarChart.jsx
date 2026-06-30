import React from 'react';

const AdminBarChart = ({ title, values, labels = [] }) => {
  const maxValue = Math.max(...values, 1);

  return (
    <article className="admin-card admin-chart" aria-label={title}>
      <h3>{title}</h3>
      <div className="admin-bars">
        {values.map((value, index) => (
          <div
            key={`${title}-${index}`}
            className="admin-bar"
            title={`${labels[index] || `Item ${index + 1}`}: ${value}`}
            style={{ height: `${(value / maxValue) * 100}%` }}
          />
        ))}
      </div>
      {labels.length ? (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', color: 'var(--admin-muted)', fontSize: 12 }}>
          {labels.map((label) => (
            <span key={label} className="admin-chip">{label}</span>
          ))}
        </div>
      ) : null}
    </article>
  );
};

export default AdminBarChart;
