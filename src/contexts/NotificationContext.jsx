import React, { createContext, useMemo, useState } from 'react';

const NotificationContext = createContext(null);

const initialNotifications = [
  {
    id: 'n1',
    type: 'order',
    title: 'Order RB-318291 is now Cooking',
    message: 'Your order has moved to the kitchen and is being prepared.',
    read: false,
  },
  {
    id: 'n2',
    type: 'promotion',
    title: 'Weekend Combo Deal',
    message: 'Get 10% off any combo with code RIKA10 this weekend.',
    read: false,
  },
  {
    id: 'n3',
    type: 'rewards',
    title: 'You earned reward points',
    message: 'You just earned 150 points from your last order.',
    read: true,
  },
];

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const removeNotification = (id) => {
    setNotifications((previous) => previous.filter((item) => item.id !== id));
  };

  const markAllRead = () => {
    setNotifications((previous) => previous.map((item) => ({ ...item, read: true })));
  };

  const addNotification = (notification) => {
    setNotifications((previous) => [notification, ...previous]);
  };

  const unreadCount = notifications.filter((item) => !item.read).length;

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      markAsRead,
      removeNotification,
      markAllRead,
      addNotification,
    }),
    [notifications, unreadCount]
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export default NotificationContext;
