import React, { useState } from 'react';
import { coupons as initialCoupons } from '../data/adminMockData';

const AdminCouponsPage = () => {
  const [rows, setRows] = useState(initialCoupons);
  const [form, setForm] = useState({ code: '', type: 'Percent', value: 0, expires: '' });

  const addCoupon = () => {
    if (!form.code.trim()) return;
    setRows((previous) => [
      ...previous,
      { id: form.code.toUpperCase(), code: form.code.toUpperCase(), type: form.type, value: Number(form.value), enabled: true, expires: form.expires || '2026-12-31', usage: 0 },
    ]);
    setForm({ code: '', type: 'Percent', value: 0, expires: '' });
  };

  const updateCoupon = (id, updates) => {
    setRows((previous) => previous.map((coupon) => (coupon.id === id ? { ...coupon, ...updates } : coupon)));
  };

  const deleteCoupon = (id) => setRows((previous) => previous.filter((coupon) => coupon.id !== id));

  return (
    <section className="admin-panel">
      <h2 className="admin-page-title">Coupons Management</h2>
      <div className="admin-control-row">
        <input className="admin-input" placeholder="Coupon code" value={form.code} onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))} />
        <select className="admin-select" value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}>
          <option>Percent</option>
          <option>Delivery</option>
          <option>Fixed</option>
        </select>
        <input className="admin-input" type="number" placeholder="Discount value" value={form.value} onChange={(e) => setForm((p) => ({ ...p, value: e.target.value }))} />
        <input className="admin-input" type="date" value={form.expires} onChange={(e) => setForm((p) => ({ ...p, expires: e.target.value }))} />
        <button type="button" className="admin-btn" onClick={addCoupon}>Create Coupon</button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Type</th>
              <th>Value</th>
              <th>Enabled</th>
              <th>Expiration</th>
              <th>Usage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((coupon) => (
              <tr key={coupon.id}>
                <td>{coupon.code}</td>
                <td>{coupon.type}</td>
                <td>{coupon.value}</td>
                <td>{coupon.enabled ? 'Yes' : 'No'}</td>
                <td>{coupon.expires}</td>
                <td>{coupon.usage}</td>
                <td>
                  <div className="admin-actions">
                    <button type="button" className="admin-btn secondary" onClick={() => updateCoupon(coupon.id, { enabled: !coupon.enabled })}>
                      {coupon.enabled ? 'Disable' : 'Enable'}
                    </button>
                    <button type="button" className="admin-btn secondary" onClick={() => updateCoupon(coupon.id, { value: coupon.value + 1 })}>
                      Edit
                    </button>
                    <button type="button" className="admin-btn danger" onClick={() => deleteCoupon(coupon.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminCouponsPage;
