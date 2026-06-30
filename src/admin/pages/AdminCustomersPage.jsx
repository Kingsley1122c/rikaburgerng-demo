import React, { useMemo, useState } from 'react';
import Modal from '../../components/ui/Modal';
import { formatCurrency } from '../../utils/formatCurrency';
import { customers } from '../data/adminMockData';
import AdminDataTable from '../components/AdminDataTable';

const PAGE_SIZE = 3;

const AdminCustomersPage = () => {
  const [query, setQuery] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const segments = ['All', ...new Set(customers.map((item) => item.segment))];
  const statuses = ['All', ...new Set(customers.map((item) => item.status))];

  const filtered = useMemo(() => {
    return customers.filter((item) => {
      const text = [item.name, item.id, item.email, item.phone].join(' ').toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      const matchesSegment = segmentFilter === 'All' || item.segment === segmentFilter;
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      return matchesQuery && matchesSegment && matchesStatus;
    });
  }, [query, segmentFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="admin-panel">
      <h2 className="admin-page-title">Customer Management</h2>
      <div className="admin-control-row">
        <input
          className="admin-input"
          placeholder="Search customers"
          aria-label="Search customers"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
        />
        <select
          className="admin-select"
          value={segmentFilter}
          aria-label="Filter customer segment"
          onChange={(event) => {
            setSegmentFilter(event.target.value);
            setPage(1);
          }}
        >
          {segments.map((segment) => (
            <option key={segment} value={segment}>{segment}</option>
          ))}
        </select>
        <select
          className="admin-select"
          value={statusFilter}
          aria-label="Filter customer status"
          onChange={(event) => {
            setStatusFilter(event.target.value);
            setPage(1);
          }}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      <AdminDataTable
        caption="Customer management table"
        columns={[
          { key: 'id', label: 'Customer ID' },
          { key: 'name', label: 'Name' },
          { key: 'segment', label: 'Segment' },
          { key: 'status', label: 'Status', render: (value) => <span className={`admin-status ${value === 'Active' ? 'ready' : 'pending'}`}>{value}</span> },
          { key: 'orders', label: 'Order History' },
          { key: 'rewardPoints', label: 'Reward Points' },
          { key: 'totalSpending', label: 'Total Spending', render: (value) => formatCurrency(value) },
        ]}
        rows={paginated}
        renderActions={(row) => (
          <button type="button" className="admin-btn secondary" onClick={() => setSelectedCustomer(row)}>
            View Profile
          </button>
        )}
      />
      <div className="admin-actions" style={{ marginTop: 12 }}>
        <button type="button" className="admin-btn secondary" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
          Previous
        </button>
        <span className="admin-chip">Page {page} of {totalPages}</span>
        <button type="button" className="admin-btn secondary" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>

      <Modal
        isOpen={Boolean(selectedCustomer)}
        onClose={() => setSelectedCustomer(null)}
        title={`Customer ${selectedCustomer?.id || ''}`}
      >
        {selectedCustomer ? (
          <article style={{ display: 'grid', gap: 10 }}>
            <p><strong>Name:</strong> {selectedCustomer.name}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
            <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
            <p><strong>Reward Points:</strong> {selectedCustomer.rewardPoints}</p>
            <p><strong>Total Spending:</strong> {formatCurrency(selectedCustomer.totalSpending)}</p>
            <div>
              <strong>Order History</strong>
              <ul style={{ marginTop: 6, display: 'grid', gap: 6 }}>
                {selectedCustomer.orderHistory.map((order) => (
                  <li key={order} className="admin-chip">{order}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Recent Activity</strong>
              <ul style={{ marginTop: 6, display: 'grid', gap: 6 }}>
                {selectedCustomer.recentActivity.map((activity) => (
                  <li key={activity} className="admin-chip">{activity}</li>
                ))}
              </ul>
            </div>
          </article>
        ) : null}
      </Modal>
    </section>
  );
};

export default AdminCustomersPage;
