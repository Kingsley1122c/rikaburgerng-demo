import React from 'react';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import Button from '../components/ui/Button';
import { useNotifications } from '../hooks/useNotifications';
import './NotificationsPage.css';

const NotificationsPage = () => {
  const { notifications, unreadCount, markAsRead, removeNotification, markAllRead } = useNotifications();

  return (
    <div className="notifications-page">
      <PageHeader title="Notification Center" subtitle="Order updates, promotions, reward alerts, and announcements." />
      <section className="notifications-section">
        <Container>
          <div className="notifications-panel">
            <div className="notifications-header">
              <h2>{unreadCount} unread notifications</h2>
              <Button type="button" variant="ghost" onClick={markAllRead}>Mark all as read</Button>
            </div>

            <div className="notifications-list" role="list" aria-label="Notifications list">
              {notifications.map((item) => (
                <article key={item.id} className={`notification-card ${item.read ? '' : 'unread'}`} role="listitem">
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.message}</p>
                    <small>{item.type.toUpperCase()}</small>
                  </div>
                  <div className="notification-actions">
                    {!item.read ? (
                      <button type="button" onClick={() => markAsRead(item.id)}>Mark read</button>
                    ) : null}
                    <button type="button" onClick={() => removeNotification(item.id)}>Delete</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default NotificationsPage;
