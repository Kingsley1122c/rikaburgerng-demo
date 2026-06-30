import React, { useState } from 'react';

const AdminSettingsPage = () => {
  const [saved, setSaved] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <section className="admin-panel">
      <h2 className="admin-page-title">Restaurant Settings</h2>
      {saved ? <p className="admin-chip" style={{ marginBottom: 10 }}>Settings saved successfully.</p> : null}
      <form onSubmit={submit} className="admin-grid">
        <article className="admin-card" style={{ gridColumn: 'span 2' }}>
          <h3>Business Profile</h3>
          <div className="admin-control-row">
            <input className="admin-input" aria-label="Restaurant name" defaultValue="RikaburgerNG" placeholder="Restaurant Name" />
            <input className="admin-input" aria-label="Restaurant location" defaultValue="Lagos, Nigeria" placeholder="Location" />
            <label className="admin-chip">Restaurant Logo <input type="file" style={{ display: 'none' }} /></label>
          </div>
        </article>

        <article className="admin-card">
          <h3>Operations</h3>
          <div className="admin-control-row" style={{ display: 'grid' }}>
            <input className="admin-input" aria-label="Business hours" defaultValue="10:00 AM - 11:00 PM" placeholder="Business Hours" />
            <input className="admin-input" aria-label="Delivery radius" defaultValue="15 km" placeholder="Delivery Radius" />
            <input className="admin-input" aria-label="Delivery fee" defaultValue="1200" placeholder="Delivery Fee" />
            <input className="admin-input" aria-label="Tax percent" defaultValue="7.5" placeholder="Tax (%)" />
          </div>
        </article>

        <article className="admin-card">
          <h3>Branding & Channels</h3>
          <div className="admin-control-row" style={{ display: 'grid' }}>
            <input className="admin-input" aria-label="Theme" defaultValue="Light" placeholder="Theme" />
            <input className="admin-input" aria-label="Instagram link" defaultValue="instagram.com/rikaburgerng" placeholder="Instagram" />
            <input className="admin-input" aria-label="X twitter link" defaultValue="x.com/rikaburgerng" placeholder="X / Twitter" />
            <label className="admin-chip"><input type="checkbox" defaultChecked /> Send system alerts</label>
          </div>
        </article>

        <div style={{ gridColumn: '1 / -1' }}>
          <button type="submit" className="admin-btn">Save Settings</button>
        </div>
      </form>
    </section>
  );
};

export default AdminSettingsPage;
