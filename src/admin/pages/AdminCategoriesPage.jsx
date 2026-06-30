import React, { useState } from 'react';
import { categories } from '../data/adminMockData';

const AdminCategoriesPage = () => {
  const [rows, setRows] = useState(categories.map((name, index) => ({ id: index + 1, name })));
  const [name, setName] = useState('');

  const addCategory = () => {
    if (!name.trim()) return;
    setRows((previous) => [...previous, { id: previous.length + 1, name }]);
    setName('');
  };

  const removeCategory = (id) => setRows((previous) => previous.filter((item) => item.id !== id));

  return (
    <section className="admin-panel">
      <h2 className="admin-page-title">Category Management</h2>
      <div className="admin-control-row">
        <input className="admin-input" placeholder="Add category" value={name} onChange={(event) => setName(event.target.value)} />
        <button type="button" className="admin-btn" onClick={addCategory}>Add Category</button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>
                  <button type="button" className="admin-btn danger" onClick={() => removeCategory(row.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminCategoriesPage;
