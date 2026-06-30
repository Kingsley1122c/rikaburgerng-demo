import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import Reveal from '../components/common/Reveal';
import Button from '../components/ui/Button';
import { ROUTES } from '../constants/routes';
import { useAuth } from '../hooks/useAuth';
import { useWishlist } from '../hooks/useWishlist';
import { useNotifications } from '../hooks/useNotifications';
import { formatCurrency } from '../utils/formatCurrency';
import './AccountPage.css';

const TABS = [
  'Dashboard Home',
  'Profile',
  'Saved Addresses',
  'Order History',
  'Wishlist',
  'Reward Points',
  'Notifications',
  'Settings',
  'Account Security',
  'Recent Orders',
  'Favorite Meals',
];

const mockOrders = [
  { id: 'RB-573810', date: '2026-06-26', status: 'Delivered', total: 12800 },
  { id: 'RB-421903', date: '2026-06-19', status: 'Delivered', total: 9400 },
  { id: 'RB-339201', date: '2026-06-11', status: 'Delivered', total: 7600 },
];

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [message, setMessage] = useState('');
  const { user, logout, updateProfile, changePassword, isAuthLoading } = useAuth();
  const { items } = useWishlist();
  const { notifications, unreadCount } = useNotifications();

  const favoriteMeals = useMemo(() => items.slice(0, 4), [items]);

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await updateProfile({
      fullName: String(formData.get('fullName')),
      phone: String(formData.get('phone')),
    });
    setMessage('Profile updated successfully.');
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await changePassword({
      currentPassword: String(formData.get('currentPassword')),
      nextPassword: String(formData.get('nextPassword')),
    });
    setMessage('Password changed successfully.');
  };

  const renderTab = () => {
    if (activeTab === 'Dashboard Home') {
      return (
        <div className="account-grid">
          <article className="account-card">
            <h3>Welcome back, {user?.fullName || 'Guest'}</h3>
            <p>You currently have {user?.rewardPoints || 0} points and {unreadCount} unread notifications.</p>
          </article>
          <article className="account-card">
            <h3>Quick Actions</h3>
            <p>Track your latest order, update profile details, or continue shopping.</p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <Button as={Link} to={ROUTES.ORDER_TRACKING}>Track Order</Button>
              <Button as={Link} to={ROUTES.MENU} variant="ghost">Browse Menu</Button>
            </div>
          </article>
        </div>
      );
    }

    if (activeTab === 'Profile') {
      return (
        <form className="account-form" onSubmit={handleProfileSubmit}>
          <input name="fullName" defaultValue={user?.fullName || ''} placeholder="Full name" required />
          <input name="email" defaultValue={user?.email || ''} disabled />
          <input name="phone" defaultValue={user?.phone || ''} placeholder="Phone" />
          <Button type="submit" disabled={isAuthLoading}>{isAuthLoading ? 'Saving...' : 'Save Profile'}</Button>
        </form>
      );
    }

    if (activeTab === 'Saved Addresses') {
      return (
        <ul className="account-list">
          <li><span>Home - Lekki Phase 1</span><span>Default</span></li>
          <li><span>Office - Victoria Island</span><span>Business</span></li>
        </ul>
      );
    }

    if (activeTab === 'Order History' || activeTab === 'Recent Orders') {
      return (
        <ul className="account-list">
          {mockOrders.map((order) => (
            <li key={order.id}>
              <span>{order.id} - {order.date} ({order.status})</span>
              <strong>{formatCurrency(order.total)}</strong>
            </li>
          ))}
        </ul>
      );
    }

    if (activeTab === 'Wishlist' || activeTab === 'Favorite Meals') {
      if (!favoriteMeals.length) {
        return <p>No favorites yet. Add meals from menu or cards to build your list.</p>;
      }

      return (
        <ul className="account-list">
          {favoriteMeals.map((meal) => (
            <li key={meal.id}>
              <span>{meal.name}</span>
              <strong>{formatCurrency(meal.price)}</strong>
            </li>
          ))}
        </ul>
      );
    }

    if (activeTab === 'Reward Points') {
      return (
        <div className="account-grid">
          <article className="account-card">
            <h3>Current Points</h3>
            <p style={{ fontSize: '34px', color: 'var(--primary-color)', fontWeight: 700 }}>
              {user?.rewardPoints || 0}
            </p>
            <p>Membership Level: {user?.membershipLevel || 'Bronze'}</p>
          </article>
          <article className="account-card">
            <h3>Progress to Platinum</h3>
            <div className="rewards-progress"><span /></div>
            <p style={{ marginTop: '10px' }}>550 points to next level.</p>
            <p>Referral Code: <strong>{user?.referralCode || 'RIKA-WELCOME'}</strong></p>
          </article>
        </div>
      );
    }

    if (activeTab === 'Notifications') {
      return (
        <ul className="account-list">
          {notifications.map((notification) => (
            <li key={notification.id}>
              <span>{notification.title}</span>
              <span>{notification.read ? 'Read' : 'Unread'}</span>
            </li>
          ))}
        </ul>
      );
    }

    if (activeTab === 'Settings') {
      return (
        <form className="account-form" onSubmit={(event) => event.preventDefault()}>
          <label>
            Theme
            <select defaultValue="light">
              <option value="light">Light</option>
              <option value="dark">Dark (placeholder)</option>
            </select>
          </label>
          <label>
            Language
            <select defaultValue="english">
              <option value="english">English</option>
              <option value="pidgin">Pidgin (placeholder)</option>
            </select>
          </label>
          <label>
            <input type="checkbox" defaultChecked /> Enable push notifications
          </label>
          <label>
            <input type="checkbox" defaultChecked /> Marketing updates
          </label>
          <Button type="submit">Save Preferences</Button>
        </form>
      );
    }

    return (
      <form className="account-form" onSubmit={handlePasswordSubmit}>
        <input name="currentPassword" type="password" placeholder="Current password" required />
        <input name="nextPassword" type="password" placeholder="New password" required />
        <Button type="submit" disabled={isAuthLoading}>{isAuthLoading ? 'Updating...' : 'Change Password'}</Button>
      </form>
    );
  };

  return (
    <div className="account-page">
      <PageHeader title="Customer Dashboard" subtitle="Manage your profile, orders, rewards, and preferences." />
      <Container>
        <div className="account-layout">
          <Reveal>
            <aside className="account-nav">
              {TABS.map((tab) => (
                <button
                  type="button"
                  key={tab}
                  className={activeTab === tab ? 'active' : ''}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
              <Button type="button" variant="ghost" onClick={logout}>Logout</Button>
            </aside>
          </Reveal>

          <Reveal>
            <section className="account-content">
              <div className="account-panel">
                <h2>{activeTab}</h2>
                {message ? <p className="account-success" style={{ marginBottom: '12px' }}>{message}</p> : null}
                {renderTab()}
              </div>
            </section>
          </Reveal>
        </div>
      </Container>
    </div>
  );
};

export default AccountPage;
