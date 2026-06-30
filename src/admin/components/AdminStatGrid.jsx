import React from 'react';

const AdminStatGrid = ({ stats }) => {
  return (
    <section className="admin-grid" aria-label="Admin summary cards">
      {stats.map((item) => (
        <article key={item.label} className="admin-card">
          <h3>{item.label}</h3>
          <strong>{item.value}</strong>
        </article>
      ))}
    </section>
  );
};

export default AdminStatGrid;
