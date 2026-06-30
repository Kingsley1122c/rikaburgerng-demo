import React, { useMemo, useState } from 'react';
import Modal from '../../components/ui/Modal';
import { formatCurrency } from '../../utils/formatCurrency';
import { categories, meals } from '../data/adminMockData';
import AdminDataTable from '../components/AdminDataTable';

const AdminMenuPage = () => {
  const [rows, setRows] = useState(meals);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [editingMeal, setEditingMeal] = useState(null);
  const [newMeal, setNewMeal] = useState({ name: '', category: 'Burger', price: 0 });

  const filteredMeals = useMemo(() => {
    return rows.filter((row) => {
      const q = `${row.name} ${row.category}`.toLowerCase();
      const matchesQuery = q.includes(query.toLowerCase());
      const matchesCategory = category === 'All' || row.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [rows, query, category]);

  const addMeal = () => {
    if (!newMeal.name.trim()) return;
    setRows((previous) => [
      ...previous,
      {
        id: previous.length + 1,
        ...newMeal,
        available: true,
        featured: false,
        discount: 0,
      },
    ]);
    setNewMeal({ name: '', category: 'Burger', price: 0 });
  };

  const deleteMeal = (id) => setRows((previous) => previous.filter((row) => row.id !== id));

  const toggleAvailability = (id) => {
    setRows((previous) => previous.map((row) => (row.id === id ? { ...row, available: !row.available } : row)));
  };

  const saveMeal = () => {
    setRows((previous) => previous.map((row) => (row.id === editingMeal.id ? editingMeal : row)));
    setEditingMeal(null);
  };

  return (
    <section className="admin-panel">
      <h2 className="admin-page-title">Menu Management</h2>
      <div className="admin-control-row">
        <input className="admin-input" placeholder="Search meals" value={query} onChange={(e) => setQuery(e.target.value)} />
        <select className="admin-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="admin-control-row" style={{ marginBottom: 16 }}>
        <input className="admin-input" placeholder="New meal name" value={newMeal.name} onChange={(e) => setNewMeal((p) => ({ ...p, name: e.target.value }))} />
        <select className="admin-select" value={newMeal.category} onChange={(e) => setNewMeal((p) => ({ ...p, category: e.target.value }))}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <input className="admin-input" type="number" placeholder="Price" value={newMeal.price} onChange={(e) => setNewMeal((p) => ({ ...p, price: Number(e.target.value) }))} />
        <button type="button" className="admin-btn" onClick={addMeal}>Add Meal</button>
      </div>

      <AdminDataTable
        columns={[
          { key: 'name', label: 'Meal' },
          { key: 'category', label: 'Category' },
          { key: 'price', label: 'Price', render: (value) => formatCurrency(value) },
          { key: 'discount', label: 'Discount (%)' },
          {
            key: 'available',
            label: 'Availability',
            render: (value) => <span className={`admin-status ${value ? 'ready' : 'cancelled'}`}>{value ? 'Available' : 'Unavailable'}</span>,
          },
          {
            key: 'featured',
            label: 'Featured',
            render: (value) => <span className={`admin-status ${value ? 'ready' : 'pending'}`}>{value ? 'Yes' : 'No'}</span>,
          },
        ]}
        rows={filteredMeals}
        renderActions={(row) => (
          <div className="admin-actions">
            <button type="button" className="admin-btn secondary" onClick={() => toggleAvailability(row.id)}>
              Toggle Availability
            </button>
            <button type="button" className="admin-btn secondary" onClick={() => setEditingMeal(row)}>
              Edit
            </button>
            <button type="button" className="admin-btn danger" onClick={() => deleteMeal(row.id)}>
              Delete
            </button>
          </div>
        )}
      />

      <Modal isOpen={Boolean(editingMeal)} onClose={() => setEditingMeal(null)} title={`Edit ${editingMeal?.name || ''}`}>
        {editingMeal ? (
          <div className="admin-control-row" style={{ display: 'grid' }}>
            <input className="admin-input" value={editingMeal.name} onChange={(e) => setEditingMeal((p) => ({ ...p, name: e.target.value }))} />
            <select className="admin-select" value={editingMeal.category} onChange={(e) => setEditingMeal((p) => ({ ...p, category: e.target.value }))}>
              {categories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
            <input className="admin-input" type="number" value={editingMeal.price} onChange={(e) => setEditingMeal((p) => ({ ...p, price: Number(e.target.value) }))} />
            <input className="admin-input" type="number" value={editingMeal.discount} onChange={(e) => setEditingMeal((p) => ({ ...p, discount: Number(e.target.value) }))} placeholder="Discount %" />
            <label className="admin-chip"><input type="checkbox" checked={editingMeal.featured} onChange={(e) => setEditingMeal((p) => ({ ...p, featured: e.target.checked }))} /> Featured Meal</label>
            <label className="admin-chip"><input type="checkbox" checked={editingMeal.available} onChange={(e) => setEditingMeal((p) => ({ ...p, available: e.target.checked }))} /> Available</label>
            <label className="admin-chip">Mock Image Upload <input type="file" style={{ display: 'none' }} /></label>
            <button type="button" className="admin-btn" onClick={saveMeal}>Save Changes</button>
          </div>
        ) : null}
      </Modal>
    </section>
  );
};

export default AdminMenuPage;
