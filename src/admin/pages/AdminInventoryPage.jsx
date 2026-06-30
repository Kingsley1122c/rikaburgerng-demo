import React, { useState } from 'react';
import { inventory as initialInventory } from '../data/adminMockData';

const AdminInventoryPage = () => {
  const [rows, setRows] = useState(initialInventory);

  const updateStock = (id, stock) => {
    setRows((previous) => previous.map((row) => (row.id === id ? { ...row, stock } : row)));
  };

  return (
    <section className="admin-panel">
      <h2 className="admin-page-title">Inventory Management</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Current Stock</th>
              <th>Minimum Stock</th>
              <th>Supplier</th>
              <th>Alert</th>
              <th>Inventory History</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const low = row.stock < row.minimum;
              return (
                <tr key={row.id}>
                  <td>{row.ingredient}</td>
                  <td>
                    <input
                      className="admin-input"
                      type="number"
                      value={row.stock}
                      onChange={(event) => updateStock(row.id, Number(event.target.value))}
                    />
                  </td>
                  <td>{row.minimum}</td>
                  <td>{row.supplier}</td>
                  <td><span className={`admin-status ${low ? 'cancelled' : 'ready'}`}>{low ? 'Low Stock' : 'Healthy'}</span></td>
                  <td>
                    <button type="button" className="admin-btn secondary">View History</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminInventoryPage;
