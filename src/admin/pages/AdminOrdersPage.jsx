import React, { useMemo, useState } from 'react';
import Modal from '../../components/ui/Modal';
import { formatCurrency } from '../../utils/formatCurrency';
import { orderStatuses, orders } from '../data/adminMockData';
import AdminDataTable from '../components/AdminDataTable';

const normalizeStatusClass = (status) => {
  const value = status.toLowerCase();
  if (value.includes('out')) return 'delivery';
  return value;
};

const AdminOrdersPage = () => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [rows, setRows] = useState(orders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return rows.filter((row) => {
      const matchesQuery = [row.id, row.customer, row.channel].join(' ').toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'All' || row.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [rows, query, statusFilter]);

  const updateStatus = (id, status) => {
    setRows((previous) => previous.map((row) => (row.id === id ? { ...row, status } : row)));
  };

  return (
    <section className="admin-panel">
      <h2 className="admin-page-title">Order Management</h2>
      <div className="admin-control-row">
        <input
          className="admin-input"
          placeholder="Search orders, customers, channel"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select className="admin-select" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option>All</option>
          {orderStatuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </div>

      <AdminDataTable
        columns={[
          { key: 'id', label: 'Order ID' },
          { key: 'customer', label: 'Customer' },
          {
            key: 'status',
            label: 'Status',
            render: (value) => <span className={`admin-status ${normalizeStatusClass(value)}`}>{value}</span>,
          },
          { key: 'channel', label: 'Channel' },
          { key: 'amount', label: 'Amount', render: (value) => formatCurrency(value) },
        ]}
        rows={filteredOrders}
        renderActions={(row) => (
          <div className="admin-actions">
            <select
              className="admin-select"
              value={row.status}
              onChange={(event) => updateStatus(row.id, event.target.value)}
            >
              {orderStatuses.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
            <button type="button" className="admin-btn secondary" onClick={() => setSelectedOrder(row)}>
              Details
            </button>
          </div>
        )}
      />

      <Modal isOpen={Boolean(selectedOrder)} onClose={() => setSelectedOrder(null)} title={`Order ${selectedOrder?.id || ''}`}>
        {selectedOrder ? (
          <div>
            <p><strong>Customer:</strong> {selectedOrder.customer}</p>
            <p><strong>Status:</strong> {selectedOrder.status}</p>
            <p><strong>Amount:</strong> {formatCurrency(selectedOrder.amount)}</p>
            <p><strong>Channel:</strong> {selectedOrder.channel}</p>
            <div style={{ marginTop: 12 }}>
              <button type="button" className="admin-btn">Print Receipt</button>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
};

export default AdminOrdersPage;
