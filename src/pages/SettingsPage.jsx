import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import Container from '../components/common/Container';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import './SettingsPage.css';

const SettingsPage = () => {
  const [saved, setSaved] = useState(false);
  const { changePassword, isAuthLoading } = useAuth();

  const savePreferences = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  const submitPassword = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await changePassword({
      currentPassword: String(formData.get('currentPassword')),
      nextPassword: String(formData.get('newPassword')),
    });
    setSaved(true);
  };

  return (
    <div className="settings-page">
      <PageHeader title="Settings" subtitle="Manage app preferences, privacy controls, and account security options." />
      <section className="settings-section">
        <Container>
          <div className="settings-panel">
            {saved ? <p className="settings-success" style={{ marginBottom: '12px' }}>Settings saved successfully.</p> : null}
            <div className="settings-grid">
              <form className="settings-card" onSubmit={savePreferences}>
                <h3>Preferences</h3>
                <label>
                  Theme
                  <select defaultValue="light">
                    <option value="light">Light</option>
                    <option value="dark">Dark (placeholder)</option>
                  </select>
                </label>
                <label>
                  Language
                  <select defaultValue="en">
                    <option value="en">English</option>
                    <option value="pidgin">Pidgin (placeholder)</option>
                  </select>
                </label>
                <label><input type="checkbox" defaultChecked /> Product updates</label>
                <label><input type="checkbox" defaultChecked /> Reward notifications</label>
                <Button type="submit">Save Preferences</Button>
              </form>

              <form className="settings-card" onSubmit={submitPassword}>
                <h3>Password Change</h3>
                <input name="currentPassword" type="password" aria-label="Current password" placeholder="Current password" required />
                <input name="newPassword" type="password" aria-label="New password" placeholder="New password" required />
                <Button type="submit" disabled={isAuthLoading}>{isAuthLoading ? 'Updating...' : 'Update Password'}</Button>
              </form>

              <form className="settings-card" onSubmit={savePreferences}>
                <h3>Privacy</h3>
                <label><input type="checkbox" defaultChecked /> Share order analytics for improvements</label>
                <label><input type="checkbox" /> Save payment method details (placeholder)</label>
                <label><input type="checkbox" defaultChecked /> Two-factor authentication alerts</label>
                <Button type="submit" variant="ghost">Save Privacy</Button>
              </form>

              <form className="settings-card" onSubmit={savePreferences}>
                <h3>Notification Settings</h3>
                <label><input type="checkbox" defaultChecked /> Order status updates</label>
                <label><input type="checkbox" defaultChecked /> Promotions and offers</label>
                <label><input type="checkbox" /> Weekly newsletters</label>
                <Button type="submit" variant="ghost">Save Notifications</Button>
              </form>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default SettingsPage;
