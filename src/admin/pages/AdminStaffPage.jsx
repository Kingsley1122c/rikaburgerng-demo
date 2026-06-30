import React, { useState } from 'react';
import { staff as initialStaff } from '../data/adminMockData';

const AdminStaffPage = () => {
  const [rows, setRows] = useState(initialStaff);
  const [inviteEmail, setInviteEmail] = useState('');

  const updateRole = (id, role) => {
    setRows((previous) => previous.map((member) => (member.id === id ? { ...member, role } : member)));
  };

  const invite = () => {
    if (!inviteEmail.trim()) return;
    setRows((previous) => [
      ...previous,
      {
        id: `S${previous.length + 1}`,
        name: inviteEmail,
        role: 'Pending Invite',
        permission: 'TBD',
        activity: 'Invitation sent',
      },
    ]);
    setInviteEmail('');
  };

  return (
    <section className="admin-panel">
      <h2 className="admin-page-title">Staff Management</h2>
      <div className="admin-control-row">
        <input className="admin-input" placeholder="Invite staff email" value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} />
        <button type="button" className="admin-btn" onClick={invite}>Invite Staff (mock)</button>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Permissions</th>
              <th>Activity Log</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>
                  <select className="admin-select" value={member.role} onChange={(event) => updateRole(member.id, event.target.value)}>
                    <option>Manager</option>
                    <option>Kitchen Lead</option>
                    <option>Support</option>
                    <option>Finance</option>
                    <option>Pending Invite</option>
                  </select>
                </td>
                <td>{member.permission}</td>
                <td>{member.activity}</td>
                <td>
                  <button type="button" className="admin-btn secondary">View Activity</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminStaffPage;
