import React, { useState } from 'react';
import { messages as initialMessages } from '../data/adminMockData';

const AdminMessagesPage = () => {
  const [rows, setRows] = useState(initialMessages);

  const markRead = (id) => {
    setRows((previous) => previous.map((message) => (message.id === id ? { ...message, read: true } : message)));
  };

  const archive = (id) => {
    setRows((previous) => previous.filter((message) => message.id !== id));
  };

  return (
    <section className="admin-panel">
      <h2 className="admin-page-title">Restaurant Inbox</h2>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>From</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((message) => (
              <tr key={message.id}>
                <td>{message.source}</td>
                <td>{message.from}</td>
                <td>{message.subject}</td>
                <td>{message.read ? 'Read' : 'Unread'}</td>
                <td>
                  <div className="admin-actions">
                    <button type="button" className="admin-btn secondary" onClick={() => markRead(message.id)}>Mark Read</button>
                    <button type="button" className="admin-btn secondary">Reply</button>
                    <button type="button" className="admin-btn danger" onClick={() => archive(message.id)}>Archive</button>
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

export default AdminMessagesPage;
