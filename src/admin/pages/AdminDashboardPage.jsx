import React from 'react';
import AdminStatGrid from '../components/AdminStatGrid';
import AdminBarChart from '../components/AdminBarChart';
import {
  activities,
  dashboardStats,
  monthlyRevenue,
  weeklyOrders,
} from '../data/adminMockData';

const AdminDashboardPage = () => {
  return (
    <section className="admin-panel">
      <h2 className="admin-page-title">Dashboard Overview</h2>
      <AdminStatGrid stats={dashboardStats} />

      <div className="admin-grid" style={{ marginTop: 12 }}>
        <AdminBarChart
          title="Revenue Chart"
          values={monthlyRevenue}
          labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
        />
        <AdminBarChart title="Weekly Orders Chart" values={weeklyOrders} labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']} />
        <article className="admin-card">
          <h3>Recent Activity</h3>
          <ul style={{ display: 'grid', gap: 8 }}>
            {activities.map((activity) => (
              <li key={activity} className="admin-chip">{activity}</li>
            ))}
          </ul>
        </article>
        <article className="admin-card">
          <h3>Quick Actions</h3>
          <div className="admin-actions">
            <button type="button" className="admin-btn">Create Coupon</button>
            <button type="button" className="admin-btn secondary">Add Meal</button>
            <button type="button" className="admin-btn secondary">Invite Staff</button>
            <button type="button" className="admin-btn secondary">Export Report</button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
