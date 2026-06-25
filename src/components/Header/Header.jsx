import React from 'react';
import { Bell, ChevronDown, Menu } from 'lucide-react';

export default function Header({ onMenuClick }) {
  return (
    <header className="top-header">
      <div className="header-title-wrap">
        <button className="mobile-menu-button" type="button" aria-label="Open navigation" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        <h1>Dashboard</h1>
      </div>
      <div className="header-actions">
        <button className="notification-button" type="button" aria-label="Notifications">
          <Bell size={18} />
          <span className="notification-dot" />
        </button>
        <button className="profile-button" type="button" aria-label="User menu">
          <img
            alt="Dea Putri"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=96&q=80"
          />
          <span>
            <strong>Dea Putri</strong>
            <small>Manager</small>
          </span>
          <ChevronDown size={15} />
        </button>
      </div>
    </header>
  );
}
