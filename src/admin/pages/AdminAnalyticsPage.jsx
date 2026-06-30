import React from 'react';
import AdminBarChart from '../components/AdminBarChart';
import { monthlyRevenue, weeklyOrders } from '../data/adminMockData';

const categoryOrders = [220, 130, 180, 96, 75, 62, 55, 44];
const peakHours = [25, 32, 40, 60, 84, 98, 90, 70, 50, 34, 20, 12];

const AdminAnalyticsPage = () => {
  return (
    <section className="admin-panel">
      <h2 className="admin-page-title">Analytics</h2>
      <div className="admin-grid">
        <AdminBarChart title="Revenue" values={monthlyRevenue} labels={['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']} />
        <AdminBarChart title="Orders" values={weeklyOrders} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} />
        <AdminBarChart title="Most Ordered Categories" values={categoryOrders} labels={['Burger', 'Pizza', 'Chicken', 'Fries', 'Shawarma', 'Drinks', 'Desserts', 'Shakes']} />
        <AdminBarChart title="Peak Ordering Hours" values={peakHours} labels={['10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9']} />
      </div>
      <div className="admin-grid" style={{ marginTop: 12 }}>
        <article className="admin-card"><h3>Customer Growth</h3><strong>+18.4%</strong><p style={{ color: 'var(--admin-muted)' }}>Compared to last month</p></article>
        <article className="admin-card"><h3>Sales Trend</h3><strong>Upward</strong><p style={{ color: 'var(--admin-muted)' }}>Stable growth trajectory</p></article>
      </div>
    </section>
  );
};

export default AdminAnalyticsPage;
